console.log(a);
console.log(a.length);
console.log(a.map());

function add() {
  console.log("1");
}

const subtract = () => {
  console.log("2");
};

let multiply;
multiple = () => {
  console.log("3");
};

let divide;
divide = function() {
  console.log("4");
};

const power = function pow() {
  console.log(5);
};

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

const Component = () => {
  const privateMethod = () => {
    console.log(1);
  };
  return class {
    showList = () => {
      arr.map(i => {
        console.log(i);
      });
    };
    render() {
      console.log(2);
    }
  };
};
