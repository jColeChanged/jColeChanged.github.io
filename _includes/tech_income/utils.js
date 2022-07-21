function * range(start, stop, step) {
  for (var i=start; i < stop; i+=step) {
    yield i;
  }
}

function compose(functionList) {
  return (arg) => functionList.reduce((acc, fn) => fn(acc), arg);
}
