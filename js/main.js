
// CONFIGURACION FIREBASE
const config = {
    apiKey: "AIzaSyBgjuAHNeTrIzFzKyYT2UA9i3w04FG5pcM",
    authDomain: "amonguschat.firebaseapp.com",
    databaseURL: "https://amonguschat.firebaseio.com",
    projectId: "amonguschat",
    storageBucket: "amonguschat.appspot.com",
    messagingSenderId: "1091967339766",
    appId: "1:1091967339766:web:fe15924486ea045908f0d7",
    measurementId: "G-8ZRC79EP16"
  };

  firebase.initializeApp(config);

// DECLARACION DE VARIABLES

  let pushMensaje = document.getElementById('pushMensaje')
  let mensaje = document.getElementById('mensaje')
  let mensajes = document.getElementById('mensajes')
  let mensajeContainer = document.getElementById('mensajeContainer')
  let lobby = document.getElementById('lobby')
  let server = document.getElementById('server')
  let errorPost = document.getElementById('error')
  let usuario = {}

// ACCION ENVIAR MENSAJE
  pushMensaje.addEventListener('click', (e)=> {
    e.preventDefault()
    error()
  })


// FUNCTION GUARGAR MENSAJE EN DATABASE
  function guardarMensaje(){
    const record = {
      lobby: lobby.value,
      server: server.value,
      txt: mensaje.value,
    }

    var db = firebase.database()
    const dbRef = db.ref('mensajes')
    const newMensaje = dbRef.push()
    newMensaje.set(record)

    mensaje.value = ''
    lobby.value = ''
  }

// FUNCTION MOSTRAR MENSAJES EN PANTALLA 
  function mostrame(){
    const db = firebase.database()
    const dbRef = db.ref('mensajes')
    dbRef.on('child_added', snapshot =>{
      var item = document.createElement('li')
      item.classList.add("section__item")
      item.innerHTML = '<strong>Lobby Nº: ' + snapshot.val().lobby + '</strong>' +'<br>'+ '<strong>Server: </strong>' + snapshot.val().server + '<br>' + snapshot.val().txt 
      mensajes.appendChild(item)
      let items = document.querySelectorAll('li')
      let last = items[items.length-1]
      last.scrollIntoView()
    })
  }

  mostrame()

// FUNCTION VALIDAR CAMPOS ENVIADOR
  function error(){
    if(lobby.value == '' || mensaje.value == ''){
      errorPost.style.display = 'block'
    }else {
      guardarMensaje()
      errorPost.style.display = 'none'
    }
  }

