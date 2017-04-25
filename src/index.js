const defaultSettings = {
  injectScope: true,
  injectVariableName: true,
  injectFileName: false
};

const defaultMethods = ["debug", "error", "exception", "info", "log", "warn"];

export default function({ types: t }) {
  const buildScope = (path, scope = []) => {
    const functionParent = path.getFunctionParent();
    if (!functionParent) {
      return scope;
    }
    if (functionParent.isFunctionDeclaration()) {
      scope.push(functionParent.node.id.name);
    } else if (
      t.isClassProperty(functionParent) || t.isClassMethod(functionParent)
    ) {
      scope.push(functionParent.node.key.name);
      const classBody = functionParent.findParent(
        path => path.isClassDeclaration() || path.isClassExpression()
      );
      if (classBody) {
        scope.push(classBody.node.id.name);
        return buildScope(classBody, scope);
      }
    } else if (functionParent.isArrowFunctionExpression()) {
      const arrFuncParent = functionParent.findParent(path => path);
      if (t.isVariableDeclarator(arrFuncParent)) {
        scope.push(arrFuncParent.node.id.name);
      } else if (
        t.isClassProperty(arrFuncParent) || t.isClassMethod(arrFuncParent)
      ) {
        scope.push(arrFuncParent.node.key.name);
        const classBody = arrFuncParent.findParent(
          path => path.isClassDeclaration() || path.isClassExpression()
        );
        if (classBody) {
          scope.push(classBody.node.id.name);
          return buildScope(classBody, scope);
        }
      } else if (t.isCallExpression(arrFuncParent)) {
        const { callee } = arrFuncParent.node;
        scope.push(`[${callee.object.name}.${callee.property.name}]`);
      }
    }
    return buildScope(functionParent, scope);
  };

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
    // output speards the flags over each method
    // in the future this could be expanded to allow method level config
    return (methods || defaultMethods).reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: Object.values(flags).length ? flags : defaultSettings
      };
    }, {});
  };

  const isConsoleStatement = path => {
    return path.get("object").isIdentifier({ name: "console" });
  };

  const prependArguments = (args = [], value) => {
    args.unshift(t.stringLiteral(value));
  };

  return {
    name: "babel-plugin-captains-log", // not required
    visitor: {
      MemberExpression(path, { file, opts }) {
        if (!isConsoleStatement(path)) {
          return;
        }
        const settings = buildSettings(opts || {});
        if (!Object.keys(settings).includes(path.node.property.name)) {
          return;
        }
        const options = settings[path.node.property.name];
        // console.log(options);
        const parent = path.parent;
        if (
          t.isCallExpression(parent) &&
          parent.arguments &&
          Array.isArray(parent.arguments)
        ) {
          // add variable names
          if (options.injectVariableName) {
            parent.arguments = injectVariableNames(parent.arguments);
          }
          // prepend filename
          if (options.injectFileName) {
            prependArguments(parent.arguments, file.opts.filename);
          }

          // prepend console statement scope
          if (options.injectScope) {
            const scope = buildScope(path);
            prependArguments(parent.arguments, `${scope.reverse().join(".")}:`);
          }
        }
      }
    }
  };
}
