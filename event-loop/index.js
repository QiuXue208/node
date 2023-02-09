function test1() {
  console.log(1);
  process.nextTick(
    (n1, n2) => {
      console.log(2);
      console.log(n1);
      console.log(n2);
    },
    4,
    5
  );
  console.log(3);
}
// test1(); // 1 3 2 4 5

function test2() {
  async function async1() {
    console.log(1);
    await async2();
    console.log(2);
  }
  async function async2() {
    console.log(3);
  }
  async1();
  new Promise(function (resolve) {
    console.log(4);
    resolve();
  }).then(function () {
    console.log(5); // => fn1
  });
}

// test2(); // 1 3 4 2 5

function test3() {
  // "script start"
  // "script end"

  console.log("script start");
  setTimeout(function () {
    console.log("setTimeout");
  }, 0);
  Promise.resolve()
    .then(function () {
      console.log("promise1");
    })
    .then(function () {
      console.log("promise2");
    });
  console.log("script end");
}

function test4() {
  // 1 6 3 4 5 2
  console.log(1);
  setTimeout(() => {
    console.log(2);
  });
  Promise.resolve()
    .then(() => {
      console.log(3);
      Promise.resolve().then(() => {
        console.log(4); // 插队
      });
    })
    .then(() => {
      console.log(5);
    });
  console.log(6);
}

function test5() {
  Promise.resolve()
    .then(() => {
      console.log(1);
    })
    .then(() => {
      console.log(3);
    })
    .then(() => {
      console.log(5);
    });
  Promise.resolve()
    .then(() => {
      console.log(2);
    })
    .then(() => {
      console.log(4);
    })
    .then(() => {
      console.log(6);
    });
}
// test5(); // 1 2 3 4 5 6

function test6() {
  queueMicrotask(() => {
    console.log(1);
    queueMicrotask(() => {
      console.log(3);
    });
  });
  queueMicrotask(() => {
    console.log(2);
    queueMicrotask(() => {
      console.log(4);
    });
  });
}
// test6(); // 1 2 3 4

function test7() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 100);

  setTimeout(() => {
    console.log(3);
    queueMicrotask(() => {
      console.log(4);
    });
  }, 90);

  queueMicrotask(() => {
    console.log(5);
    queueMicrotask(() => {
      console.log(6);
    });
  });

  setTimeout(() => {
    console.log(7);
    queueMicrotask(() => {
      console.log(8);
    });
    setTimeout(() => {
      console.log(9);
      queueMicrotask(() => {
        console.log(10);
      });
    }, 10);
    console.log(11);
  }, 80);

  console.log(12);
}
// test7(); // 1 12 5 6 7 11 8 3 4 9 10 2
