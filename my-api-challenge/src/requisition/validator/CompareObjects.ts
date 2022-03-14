class CompareObjects {
  check(object1: any, object2: any): boolean {
    for (var i in object1) {
      if (object1.hasOwnProperty(i)) {
        if (object1[i] !== object2[i]) {
          return false;
        }
      }
    }
    for (var i in object2) {
      if (object2.hasOwnProperty(i)) {
        if (object1[i] !== object2[i]) {
          return false;
        }
      }
    }
    return true;
  }
}

export default new CompareObjects();
