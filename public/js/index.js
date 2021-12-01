
const socketClient = io()
const btnPOST = document.querySelector(".btnPOST")
const btnChat = document.querySelector(".btnChat")


const form = document.querySelector(".formProducto")

console.log("hola mundo")

btnPOST.addEventListener("click", function(e){

    e.preventDefault()

    const url = "http://localhost:8080/api/productos/";

    let data = new FormData(form)
    let title=data.get('title');
    let precio=data.get('precio');
    let thumbnail=data.get('thumbnail')
    let sendObject={
        title,
        precio,
        thumbnail
    }
    fetch(url,{
        method: "POST",
        body: JSON.stringify(sendObject),
        headers:{
            "content-type": "application/json"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

btnChat.addEventListener("click", function(e){
    e.preventDefault()
    const inputEmail = document.querySelector(".inputEmail")
    const inputMensaje = document.querySelector(".inputMensaje")

    if(inputEmail.value.length < 5){
        throw new Error("el email es necesario")
    }

    const mensajes = {
        inputEmail: inputEmail.value,
        inputMensaje: inputMensaje.value
    }
    
    socketClient.emit("sendMensaje", mensajes )

})

socketClient.on("sendProducts", data=>{
    console.log(data)
    fetch('templates/allProducts.handlebars')
    .then(string => string.text())
    .then(template =>{
        const processedTemplate = Handlebars.compile(template);
        const templateObjects ={
            data
        }
        const html = processedTemplate(templateObjects)
        const allProducts = document.querySelector(".allProducts");
        allProducts.innerHTML= html;
    })
    .catch((err)=> console.log(err))
})

socketClient.on("MensajesAlBrowser", mensajes =>{
    console.log(mensajes)
    fetch('templates/chat.handlebars')
    .then(string => string.text())
    .then(template =>{
        const processedTemplate = Handlebars.compile(template);
        const templateObjects ={
            mensajes
        }
        const html = processedTemplate(templateObjects)
        const chat = document.querySelector(".chat");
        chat.innerHTML= html;
    })
    .catch((err)=> console.log(err))
})




