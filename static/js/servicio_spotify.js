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
        console.log(cancion.popularity)
        console.log(cancion.album.images[0].url)
        
        // Crear div con js
        let item =document.createElement("div")        
        //Crear la clase carousel-item
        item.classList.add("carousel-item")  

        //Creo una img
        let imagen=document.createElement("img")
        imagen.classList.add("d-block")
        imagen.classList.add("w-50")
        imagen.classList.add("mx-auto")
        imagen.src=cancion.album.images[0].url
        
        //Creo un audio
        let audio=document.createElement("audio")
        audio.classList.add("w-50")
        audio.classList.add("mt-5")
        audio.classList.add("d-block")
        audio.classList.add("mx-auto")
        audio.src=cancion.preview_url
        audio.setAttribute("controls","controls")

        // Crear div con js
        let caption =document.createElement("div")
        //Crear la clase carousel-caption d-none d-md-block
        caption.classList.add("carousel-caption")  
        caption.classList.add("d-none")  
        caption.classList.add("d-md-block")  
        
        //Creo un título de canción
        let titulo=document.createElement("h5")   
        titulo.textContent=cancion.name
        titulo.classList.add("bg-black")          
        titulo.classList.add("w-25")  
        titulo.classList.add("d-block")
        titulo.classList.add("mx-auto")
        titulo.classList.add("mb-5")  

        //Creo estructura estrellas llena primer div
        let estrellallena=document.createElement("div")
        estrellallena.classList.add("stars-outer")
        estrellallena.classList.add("mx-auto")

        //Creo estructura estrellas vacia primer div
        let estrellavacia=document.createElement("div")
        estrellavacia.classList.add("stars-inner")
        estrellavacia.style.width=cancion.popularity+"%"

        //PADRES E HIJOS de adentro hacia afuera        
        estrellallena.appendChild(estrellavacia)
        item.appendChild(estrellallena)      
        item.appendChild(caption)
        caption.appendChild(titulo)
        item.appendChild(imagen)
        item.appendChild(audio) 
        fila.appendChild(item)
    })
}