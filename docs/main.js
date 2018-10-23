(function () {

var image = document.createElement('img');
var preview = document.getElementById('preview');

$('#file').change(function () {
  var
    file_list = [],
    file = this.files[0],
    timer;

  preview.innerHTML = '';

  for(var i = 0;i < 1000;i++){
    file_list.push(Object.assign(file, {}));
  }

  timer = setInterval(function () {
    var bg_color_dec = Math.floor(parseInt('1000000', 16) * Math.random());
    var bg_color = bg_color_dec.toString(16);

    $('#preview').css({ 'background-color' : '#' + bg_color}); 
  }, 10);

  console.time('analyzing');
  Promise.all(file_list.map((file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function() {
        resolve(this.exifdata);
      });
    });
  }))
  .then((value) => {
    console.timeEnd('analyzing');
    clearInterval(timer);

    var image = document.createElement('img');
    var preview = document.getElementById('preview');
    image.src = window.URL.createObjectURL(file);
    preview.appendChild(image);
  });
});

$('#worker_file').change(function () {
  var
    file_list = [],
    file = this.files[0],
    worker = new Worker("worker.js"),
    timer;

  preview.innerHTML = '';

  for(var i = 0;i < 1000;i++){
    file_list.push(Object.assign(file, {}));
  }

  timer = setInterval(function () {
    var bg_color_dec = Math.floor(parseInt('1000000', 16) * Math.random());
    var bg_color = bg_color_dec.toString(16);

    $('#preview').css({ 'background-color' : '#' + bg_color}); 
  }, 10);

  console.time('post');
  worker.postMessage({file_list : file_list});
  worker.onmessage = function (e) {
    console.timeEnd('post');
    clearInterval(timer);

    image.src = window.URL.createObjectURL(file);
    preview.appendChild(image);
  }
});
})();
