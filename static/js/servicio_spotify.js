// Datos iniciales para conectar la API, hacer la petición
let uri="https://accounts.spotify.com/api/token";
let grant_type="grant_type=client_credentials";
let client_id="client_id=042f14e5f7ed4fcca39f6ca438cb28a6";
let client_secret="client_secret=dc52a0a2a23d4b2787a9d8140f1ca10e";

let parametrosPOST = {
    method: "POST",
    headers: {//Aca se trae el Content-Type de los de POSTMAN que estan en header en Hidden//        
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body: `${grant_type}&${client_id}&${client_secret}`
}

fetch(uri,parametrosPOST)
//Verifica que llegue en formato json//
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){//Qué hare con la respuesta anterior acá se hace lo que uno quiere que
    //sucede al responder correctamente el formato json//
    console.log(respuesta) //esto se hizo para probar que si llevara el token
    obtenerToken(respuesta)
})
.catch(function(error){//Mensaje de error si falla
    console.log(error)
})

function obtenerToken(respuesta){
    let token=respuesta.token_type+" "+respuesta.access_token
    obtenerCanciones(token)
}

function obtenerCanciones(token){    
    let uri="https://api.spotify.com/v1/artists/3LLNDXrxL4uxXtnUJS5XWM/top-tracks?market=US";
    let parametrosEnvio={
        method:"GET",
        headers:{
            Authorization: token
        }
    }

    fetch (uri,parametrosEnvio)
    //Verifica que llegue en formato json//
    .then(function(respuesta){
        return(respuesta.json())
    })
    .then(function(respuesta){//Qué hare con la respuesta anterior acá se hace lo que uno quiere que
        //sucede al responder correctamente el formato json//
        console.log(respuesta) //esto se hizo para probar que si llevara el token
        pintarDatos(respuesta);        
    })
    .catch(function(error){//Mensaje de error si falla
        console.log(error)
    })    
}

function pintarDatos(datos){
    let fila=document.getElementById("fila")
    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)
        
        // Crear div con js
        let columna=document.createElement("div")
        
        //Crear la clase col
        columna.classList.add("col")
        
        //Creo un div que sirve de tarjeta
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")
        
        //Creo una img de tarjeta
        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url

        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.src=cancion.preview_url
        audio.setAttribute("controls","controls")
        
        //PADRES E HIJOS de adentro hacia afuera
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(audio)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
    })
}