
const socketClient = io()

const btnPOST = document.querySelector(".btnPOST")
const btnChat = document.querySelector(".btnChat")

const form = document.querySelector(".formProducto")

console.log("hola mundo")

function renderizarProducto (producto){
    const div = document.createElement("div");

    div.innerHTML = `

    <div class="producto">
        <p>${producto.id}</p>
        <p>${producto.title}</p>
        <p>${producto.price}</p>
       
    </div>

    `
    const allProducts = document.querySelector(".allProducts");

    allProducts.append(div);

}
function renderizarMensaje(mensaje){
    const div = document.createElement("div");

    div.innerHTML = `

    <div class="mensajes">
        <p class="mensajes__email">${mensaje.email} <span>[${mensaje.created_at}]</span></p>
        <p class="mensajes__mensaje">dice:${mensaje.mensaje}</p>
    </div>


    `
    const chat = document.querySelector(".chat");

    chat.append(div);

}

btnPOST.addEventListener("click", function(e){

    e.preventDefault()

    const url = "http://localhost:8080/api/productos/";

    let data = new FormData(form)
    let title=data.get('title');
    let price=data.get('price');
    let thumbnail=data.get('thumbnail')
    let sendObject={
        title,
        price,
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
        console.log("xd",data)
        socketClient.emit("sendProducts", sendObject, function(){

            renderizarProducto(sendObject);
        } )
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
        email: inputEmail.value,
        mensaje: inputMensaje.value,
        

    }
    
    socketClient.emit("sendMensaje", mensajes, function(){
        renderizarMensaje(mensajes)

    } )

})



socketClient.on("productosAlBrowser", data=>{

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




