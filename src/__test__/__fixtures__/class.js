class WrapClass {
  constructor() {
    console.log("ctr");
  }

  render() {
    console.log("Component");
    items.map(i => {
      console.log(i);
      return i.name;
    });
    return null;
  }

  // todo: make it work with stage-2
  // namedArrow = () => {
  //   console.debug("test");
  // };
}
