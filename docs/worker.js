importScripts('exif.js');

onmessage = function(e) {
  var
    data = e.data,
    file_list = data.file_list,
    exif_list = [];


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
    postMessage(value);
  }, (reason) => {
  });
}
