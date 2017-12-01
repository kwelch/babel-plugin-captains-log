import { buildOptions } from './utils/pluginOptions';
import { getFileName } from './utils/getFileName';

const idNameSelector = path => path.node.id.name;
const keyNameSelector = path => path.node.key.name;

const scopeHandlers = {
  FunctionDeclaration: idNameSelector,
  VariableDeclarator: idNameSelector,
  ObjectProperty: keyNameSelector,
  ObjectMethod: keyNameSelector,
  ClassMethod: keyNameSelector,
  ClassExpression: idNameSelector,
  ClassDeclaration: idNameSelector,

  AssignmentExpression: path => path.node.left.name,
};

export default function({ types: t }) {
  const name = 'babel-plugin-captains-log';
  const callExpressions = new Set();
  const evaluatedExpressions = new Set();
  return {
    name,
    visitor: {
      Identifier(path, { opts = {}, file }) {
        if (matchesIgnorePattern(opts.ignorePatterns, file)) {
          return;
        }
        if (!looksLike(path.node, { name: 'console' })) {
          return;
        }
        // find somewhere we can move this so that it only needs to be called once.
        const settings = buildOptions(opts || {});
        const parentCallExp = path.findParent(t.isCallExpression);
        if (isTrackingConsoleCallStatement(path, parentCallExp, settings)) {
          callExpressions.add(parentCallExp);
        }
      },
      Program: {
        exit(_, { file, opts }) {
          const settings = buildOptions(opts || {});
          callExpressions.forEach(callExp => {
            if (!callExp || evaluatedExpressions.has(callExp)) {
              return;
            }
            const options = settings[getConsoleCallMethodName(callExp)];
            let args = callExp.get('arguments');

            if (options.injectVariableName) {
              args = injectVariableNames(args);
            }

            if (options.injectScope) {
              const scope = findCallScope(callExp);
              args = prependArguments(args, scope);
            }

            if (options.injectFileName) {
              let filename = getFileName(file, options);

              const start = callExp.node.loc.start;
              const lineCol = `(${start.line}:${start.column})`;
              args = prependArguments(args, `${filename}${lineCol}`);
            }
            callExp.set('arguments', args);
          });
        },
      },
    },
  };

  function matchesIgnorePattern(ignorePatterns = ['node_modules'], file) {
    return ignorePatterns.some(pattern => file.opts.filename.includes(pattern));
  }

  function getConsoleCallMethodName(callExpression) {
    return callExpression.get('callee.property').node.name;
  }

  function isTrackingConsoleCallStatement(path, parentCallExp, settings) {
    return (
      parentCallExp &&
      parentCallExp.node.callee === path.parent &&
      Object.keys(settings).includes(getConsoleCallMethodName(parentCallExp))
    );
  }

  function injectVariableNames(args = []) {
    return args.reduce((acc, arg) => {
      if (!t.isLiteral(arg)) {
        return [...acc, t.stringLiteral(arg.getSource()), arg.node];
      }
      return [...acc, arg.node];
    }, []);
  }

  function findCallScope(path, scope = []) {
    const parentFunc = path.findParent(path =>
      Object.keys(scopeHandlers).includes(path.type)
    );
    if (parentFunc) {
      return findCallScope(parentFunc, [
        scopeHandlers[parentFunc.type](parentFunc),
        ...scope,
      ]);
    }
    return scope.length ? `${scope.join('.')}:` : '';
  }

  function prependArguments(args = [], value) {
    if (value) {
      return [t.stringLiteral(value), ...args];
    }
    return args;
  }
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
