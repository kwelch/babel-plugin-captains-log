function topLevel() {
  console.log("a");
  const level1 = () => {
    console.log("b");

    const level2 = () => {
      console.log("c");
    };
    const level2b = () => {
      console.log("d");

      const level3 = () => {
        console.log("e");
      };
    };
  };
}
