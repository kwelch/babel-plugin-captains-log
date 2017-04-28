const defaultSettings = {
  injectScope: true,
  injectVariableName: true,
  injectFileName: true,
};

const defaultMethods = ["debug", "error", "exception", "info", "log", "warn"];

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}

export default function({ types: t }) {
  const injectVariableNames = (args = []) => {
    return args.reduce((acc, arg) => {
      if (t.isIdentifier(arg)) {
        return [...acc, t.stringLiteral(arg.name), arg];
      }
      return [...acc, arg];
    }, []);
  };

  const buildSettings = opts => {
    const { methods, ...flags } = opts;
    // output spreads the flags over each method
    // in the future this could be expanded to allow method level config
    return (methods || defaultMethods).reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: Object.values(flags).length ? flags : defaultSettings,
      };
    }, {});
  };

  const findCallScope = (path, scope = "") => {
    const parentFunc = path.findParent(t.isFunction);
    if (parentFunc) {
      if (!scope) {
        scope = "scoped-console";
      }
      if (t.isFunctionDeclaration(parentFunc)) {
        return findCallScope(
          parentFunc,
          `${parentFunc.node.id.name}{${scope}}`
        );
      }
      if (
        t.isFunctionExpression(parentFunc) ||
        t.isArrowFunctionExpression(parentFunc)
      ) {
        if (looksLike(parentFunc.parent, { type: "VariableDeclarator" })) {
          return findCallScope(
            parentFunc.parentPath,
            `${parentFunc.parent.id.name}(${scope})`
          );
        }
        if (looksLike(parentFunc.parent, { type: "AssignmentExpression" })) {
          return findCallScope(
            parentFunc.parentPath,
            `${parentFunc.parent.left.name}(${scope})`
          );
        }
        if (looksLike(parentFunc.parent, { type: "ObjectProperty" })) {
          return findCallScope(
            parentFunc.parentPath,
            `${parentFunc.parent.key.name}(${scope})`
          );
        }
      }
      if (t.isObjectMethod(parentFunc) || parentFunc.isClassMethod()) {
        return findCallScope(
          parentFunc.parentPath,
          `${parentFunc.node.key.name}(${scope})`
        );
      }
    }
    return scope;
  };

  const prependArguments = (args = [], value) => {
    if (value) {
      return [t.stringLiteral(value), ...args];
    }
    return args;
  };

  return {
    name: "babel-plugin-captains-log", // not required
    visitor: {
      Identifier: (path, { file, opts }) => {
        if (!looksLike(path.node, { name: "console" })) {
          return;
        }
        const parentMemExp = path.parentPath;
        if (!parentMemExp.isMemberExpression()) {
          return;
        }
        const parentCallExp = parentMemExp.findParent(t.isCallExpression);
        if (parentCallExp) {
          if (
            !looksLike(parentCallExp.node.callee, {
              type: "MemberExpression",
              object: { name: "console" },
            })
          ) {
            return;
          }
          const settings = buildSettings(opts || {});
          if (
            !Object.keys(settings).includes(parentMemExp.node.property.name)
          ) {
            return;
          }
          const options = settings[parentMemExp.node.property.name];

          let args = parentCallExp.node.arguments;

          if (options.injectVariableName) {
            args = injectVariableNames(args);
          }

          if (options.injectScope) {
            const scope = findCallScope(parentCallExp);
            args = prependArguments(args, scope);
          }

          if (options.injectFileName) {
            let filename;
            if (file) {
              filename = file.opts.filename;
            }
            const start = path.node.loc.start;
            const lineCol = `(${start.line}:${start.column})`;
            args = prependArguments(args, `${filename}${lineCol}`);
          }
          parentCallExp.node.arguments = args;
        }
      },
    },
  };
}
