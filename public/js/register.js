

let formRegister  = document.getElementById("registerForm");
formRegister.addEventListener('submit',function(event){
    event.preventDefault();
    let info = new FormData(formRegister);
    let sendObject ={
        nombre:info.get('nombre'),
        correo:info.get('correo'),
        password:info.get('password')
    }
    fetch('/api/auth/register',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        formRegister.reset();
        alert('User registered');
    })
})

let formLogin = document.getElementById('loginForm');
formLogin.addEventListener('submit',function(event){
    event.preventDefault();
    let info = new FormData(formLogin);
    let sendObject={
        correo:info.get('correo'),
        password:info.get('password')
    }
    fetch('/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        console.log(json);
        location.replace('http://localhost:3000/home')
    })
})

const btnFacebook = document.querySelector("#btnFacebook")


btnFacebook.addEventListener("click", function(){

    location = "http://localhost:3000/facebook"
})