class Application {
  constructor(name, type) {
    this.name = name
    this.version = 1.0
    this.type = type == undefined ? 'app' : type
    this.createdDate = new Date()
    this.files = []
    this.add = this.files.push
    this.window = false
    this.logoFile = '[Object QFile]:not settled logo qfile'
  }
}


class QFile {
  constructor(name, blob, type, dir) {
    this.name = name
    this.blob = blob
    this.type = type
    this.dir = dir == undefined ? '/' : dir
    this.date = new Date()
    this.Udate = new Date()
    this.hosted = false
    this.Mblob = new Blob([blob], {
      type: type
    })

    var self = this
    this.update = function() {
      var reader = new FileReader();
      reader.readAsDataURL(this.Mblob);
      reader.onloadend = function() {
        var base64data = reader.result;
        self.hosted = base64data
      }
    }
    this.update()
  }
}




var system = {
  run(App) {
    var indexHtml = false
    var indexHtmlFileIndex = 0
    var app = new Application()
    var app = App
    app.files.forEach(function(file, fileIndex) {
      if (file.name == 'index.html') {
        indexHtml = file.blob
        indexHtmlFileIndex = fileIndex
      } else if (file.type == 'text/css' || file.type == "application/css" || file.type == 'text/javascript' || file.type.startsWith('text') || file.type.startsWith('application')) {
        app.files.forEach(function(primFile, primFileIndex) {
          var fileBlob = file.blob
          fileBlob = fileBlob.replaceAll(primFile.dir + (primFile.dir[0] == '/' ? '' : primFile.dir.length == 0 ? '' : '/') + primFile.name, primFile.hosted)

          app.files[fileIndex].blob = fileBlob

          app.files[fileIndex].Mblob = new Blob([fileBlob], {
            type: app.files[fileIndex].type
          })

          editHTML()

          var reader = new FileReader();
          reader.readAsDataURL(app.files[fileIndex].Mblob);
          reader.onloadend = function() {
            var base64data = reader.result;
            host = app.files[fileIndex].hosted = base64data

            if ((app.files.length - 1) == fileIndex && (app.files.length - 1) == primFileIndex) {
              editHTML()
            }
          }


        })
      }
    })

    function editHTML() {

      if (indexHtml == false) {
        alert('ERROR_OPENING_APP[STATUS:404]')
      } else {
        app.files.forEach(function(file, fileIndex) {
          indexHtml = indexHtml.replaceAll(file.dir + (file.dir[0] == '/' ? '' : '/') + file.name, file.hosted)
          //indexHtml = indexHtml.replace('</body>', '<br><a href="' + file.hosted + '" >' + file.dir + (file.dir[0] == '/' ? '' : '/') + file.name + '</a> </body>')

          //console.log(file.dir + (file.dir[0] == '/' ? '' : '/') + file.name);

          //window.URL.revokeObjectURL(app.files[indexHtmlFileIndex].hosted)
          app.files[indexHtmlFileIndex].blob = indexHtml
          app.files[indexHtmlFileIndex].Mblob = new Blob([indexHtml], {
            type: app.files[indexHtmlFileIndex].type
          })

          var reader = new FileReader();
          reader.readAsDataURL(app.files[indexHtmlFileIndex].Mblob);
          reader.onloadend = function() {
            var base64data = reader.result;
            host = app.files[indexHtmlFileIndex].hosted = base64data
            //document.querySelector('p').innerHTML += 'click'.link(host)
            //document.querySelector('iframe').src = host
            //console.log(app);

            var linkA = document.createElement('a')
            linkA.href = '#' + app.name
            linkA.click()


            if (app.window == true) {

              var code = `<div class="window alert movable" id="${app.name.replaceAll(' ','')}" style="width: 300px;z-index: 999999;" id='${id}'>
      <div class="title-bar move-ctrl">
        <div class="title-bar-text">Alert</div>
        <div class="title-bar-controls"> <button aria-label="Close" onclick='document.getElementById("${id}").remove()'></button> </div>
      </div>
      <div class="window-body" style="max-height: 75vh;overflow: scroll">
        <iframe src="${ host }" width="300" height="300"></iframe>
      </div>
    </div>`
              document.body.innerHTML += code
            } else {
              document.querySelector('footer').style.display = 'none'
              document.querySelector('.home').innerHTML = '<iframe src="' + host + '" width="' + window.innerWidth + '" height="' + window.innerHeight + '"></iframe>'
              document.querySelector('.home').querySelector('iframe').onerror = function(e) { alert(e) }
            }
            return host
          }
          //console.log(app);
        })
      }
    }
  },
  apps: []
}



function download() {
  var apx = new Blob([JSON.stringify(app)], {
    type: 'text/apx'
  })

  console.log(app);

  var linkUrl = window.URL.createObjectURL(apx)
  document.body.innerHTML += '<a id="rr" href="' + linkUrl + '" download="exampler.apx"></a>'

  document.getElementById('rr').click()
}



function alert(msg) {
  var id = 'Alert' + Math.random() * 10
  var code = `<div class="window alert movable" style="width: 300px;z-index: 999999;" id='${id}'>
      <div class="title-bar move-ctrl">
        <div class="title-bar-text">Alert</div>
        <div class="title-bar-controls"> <button aria-label="Close" onclick='document.getElementById("${id}").remove()'></button> </div>
      </div>
      <div class="window-body" style="max-height: 75vh;overflow: scroll">
        <div>${msg}</div>
      </div>
    </div>`
  var body = document.body.innerHTML
  document.body.innerHTML += code
}

var saverTime = setInterval(function() {
  document.querySelectorAll('.move-ctrl').forEach(function(elem, index) {
    function moveWindow(evt) {
      e = evt.touches[0]
      document.querySelectorAll(".movable")[index].style.top = e.clientY + (document.querySelectorAll(".movable")[index].offsetHeight / 2) + "px";
      document.querySelectorAll(".movable")[index].style.left = e.clientX + 'px'
      //- this.offsetWidth / 2 + "px";
    }
    elem.addEventListener('touchstart', function(e) {
      elem.addEventListener('touchmove', moveWindow)
    })
    elem.addEventListener('touchend', function(e) {
      elem.removeEventListener('touchmove', moveWindow)
    })
  })

  function moveWindowMouse(evt) {
      e = evt
      document.querySelectorAll(".movable")[index].style.top = e.clientY + (document.querySelectorAll(".movable")[index].offsetHeight / 2) + "px";
      document.querySelectorAll(".movable")[index].style.left = e.clientX + 'px'
      //- this.offsetWidth / 2 + "px";
    }
    elem.addEventListener('mousedown', function(e) {
      elem.addEventListener('mousemove', moveWindowMouse)
    })
    elem.addEventListener('mouseup', function(e) {
      elem.removeEventListener('mousedown', moveWindowMouse)
    })
  })

  window.onhashchange = function() {
    if (window.location.origin + '/index.html' == window.location.href) {
      window.location.reload()
    }
  }
  
  
  localStorage.setItem('apps', JSON.stringify(system.apps == null ? [] : system.apps == [] ? []: system.apps ))
}, 1000)

function openRun() {
  var id = 'Alert' + Math.random() * 10
  var code = ` <div class = "window alert movable"
            style = "width: 300px;z-index: 99"
            id = '${id}' >
              <div class="title-bar move-ctrl">
        <div class="title-bar-text">Run APX Files</div>
        <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button><button aria-label="Close" onclick='document.getElementById("${id}").remove()'></button> </div>
      </div> <div class = "window-body">
              <div style="display:flex;flex-direction:row">
        <img src="run.webp" class="app-icon">
        <p style="margin: 0.5rem">welcome emulator runner. run .apx files with button</p>
        <button onclick='start()'> Choose File </button>
        </div> </div> </div> `;
  var body = document.body.innerHTML
  document.body.innerHTML += code
}

function start() {
  var htmlInp = document.createElement('input')
  htmlInp.type = 'file'
  htmlInp.click()

  htmlInp.onchange = function() {
    if (htmlInp.files[0].type == 'text/apx' || htmlInp.files[0].type == 'application/apx' || htmlInp.files[0]) {
      htmlInp.files[0].text().then((v) => {
        hoster = system.run(JSON.parse(v))
        system.apps.push(v)
      })

    } else {
      alert('incorrect file format.[USE_ONLY_APX_FILE_FORMAT]')
    }
  }
}



function refreshHome() {
  /*if (localStorage.getItem('apps') == false || localStorage.getItem('apps') == null) {
    alert('welcome')
    localStorage.setItem('apps', JSON.stringify([]))
  }*/
  system.apps = JSON.parse(localStorage.getItem('apps'))
  system.apps.forEach((appo, appIndex) => {
    var code = ` <div class = "app-logo"
            onclick = "system.run(JSON.parse(system.apps[${appIndex}]))" >
              <img src="apx.png" alt="404" class="app-icon">
          <p class="app-text">${JSON.parse(appo).name}</p>
        </div>`;

    document.querySelector('.home').innerHTML += code
  })
}

refreshHome()

/*
function qConfrim(title, innerHtml, callback, leftBtn, rightBtn) {
  var id = 'Alert' + Math.random() * 10
  var id1 = 'Alert' + Math.random() * 10
  var id2 = 'Alert' + Math.random() * 10
  var id3 = 'Alert' + Math.random() * 10
  var code = `<div class="window alert movable" style="width: 300px;z-index: 999999;" id='${id}'>
      <div class="title-bar move-ctrl">
        <div class="title-bar-text">${title}</div>
        <div class="title-bar-controls"> <button aria-label="Close" id='${id1}' onclick='document.getElementById("${id}").remove();'></button> </div>
      </div>
      <div class="window-body" style="max-height: 75vh;padding-bottom: 1.5rem;">
        <div>${innerHtml}</div>
        <div><button style="position: absolute;bottom: 10px;left: 8px;" id="${id2}" >${leftBtn == undefined ? 'deny' : leftBtn}</button><button id="${id3}" style="position: absolute;bottom: 10px;right: 8px;">${rightBtn == undefined ? 'accept' : rightBtn}</button></div>
      </div>
    </div>`
  var body = document.body.innerHTML
  document.body.innerHTML += code

  document.getElementById(id1).onclick = function() {
    callback(false);
    document.getElementById(id).remove()
  }
  document.getElementById(id2).onclick = function() {
    callback(false)
    document.getElementById(id).remove()
  }
  document.getElementById(id3).onclick = function() {
    callback(true)
    document.getElementById(id).remove()
  }
}*/
