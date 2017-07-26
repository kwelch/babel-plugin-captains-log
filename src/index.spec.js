import pluginTester from 'babel-plugin-tester';
import path from 'path';
import fs from 'fs';
import captainsLog from './index';

const loadFromFile = filePath =>
  fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');

pluginTester({
  plugin: captainsLog,
  snapshot: true,
  tests: [
    { code: `anything.log();`, snapshot: false },
    `console.log('sup dawg')`,
    `
    function add(a, b) {
      console.log(a, b);
      return a + b;
    }
    `,
    `
    const subtract = (a, b) => {
      console.info(a, b);
      return a - b;
    };
    `,
    `
    let multiply;
    multiple = () => {
      console.log("3");
    };
    `,
    `
    let divide;
    divide = function() {
      console.log("4");
    };
    `,
    `
    const power = function pow() {
      console.log(5);
    };
    `,
    `
    const obj = {
      method1: function() {
        console.log(6);
      },
      method2: () => {
        console.log(7);
      },
      method3() {
        console.log(8);
      },
    };
    `,
    `
    const Component = () => {
      const privateMethod = () => {
        console.log(1);
      };
      return class HighOrderComponent {
        showList() {
          arr.map(i => {
            console.log(i);
          });
        }
        render() {
          console.log(2);
        }
      };
    };
    `,
    `
    class ToDoComponent {
      render() {
        console.log(this.props);
      }
    }
    `,
    {
      title: 'Method options',
      code: loadFromFile('./__fixtures__/method-check/code.js'),
      pluginOptions: {
        methods: ['debug', 'log', 'info'],
      },
    },
    {
      title: 'Merge options - fix #12',
      code: `console.log(a);`,
      pluginOptions: { injectScope: false },
    },
  ],
});
