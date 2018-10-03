var Worker = window.Worker || {},
    w = new Worker('worker.js');

w.postMessage([1,2,3]);
