/*var zip = new JSZip();
zip.file("Hello.txt", "Hello World\n");
var img = zip.folder("images");
img.file("smile.gif", 'abcd', { base64: true });
zip.generateAsync({ type: "blob" })
  .then(function(content) {
    // see FileSaver.js
    content.type = 'text/apx'
    var i = new Blob([content], {
      type: 'text/acp'
    })

    JSZipUtils.getBinaryContent('exam.zip', function(err, data) {
      if (err) {
        throw err; // or handle err
      }

      JSZip.loadAsync(data).then(function(o) {
        // ...
        //console.log(o.files['Hello.txt']);
      });
    });

    //saveAs(content, "example.zip");
  });
  
  
*/
var blob = new Blob(['hellaushe48930{   }'], {
  type: 'text/txt'
})

var myURL = 'data:text/txt;base64,'+decodeURI('bdjdkkdmsdhjsjs')
console.log(myURL);

var reader = new FileReader();
reader.readAsDataURL(blob);
reader.onloadend = function() {
  var base64data = reader.result;
  console.log(base64data);
}