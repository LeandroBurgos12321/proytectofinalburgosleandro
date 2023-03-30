//convariable
// let btnToggle = document.getElementById("btnToggle")

// let modo 
// if(localStorage.getItem("modoOscuro")){
//     modo = JSON.parse(localStorage.getItem("modoOscuro"))
// }else{
//     localStorage.setItem("modoOscuro", false)
//     modo = false
// }
// console.log(modo)
// btnToggle.addEventListener("click", ()=>{

     document.body.classList.toggle("darkMode")

     //condicional que detecte en qué modo estamos
     if(modo == false){
         btnToggle.innerText = `Light`
         btnToggle.className = ("btn btn-light")
         modo = true
         localStorage.setItem("modoOscuro", modo)
         console.log(localStorage.getItem("modoOscuro"))
     }else if(modo == true){
         btnToggle.innerText = `Dark`
         btnToggle.className = ("btn btn-dark")
         modo = false
         localStorage.setItem("modoOscuro", modo)
         console.log(localStorage.getItem("modoOscuro"))

     }

// })

//con Storage directo:

let btnToggle = document.getElementById("btnToggle")

//existe no haga nada, sino setealo
if(localStorage.getItem("modoOscuro")){
    if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        document.body.classList.add("darkMode")
        btnToggle.innerText = `Light`
        btnToggle.className = ("btn btn-light")
    }
}else{
    localStorage.setItem("modoOscuro", false)
    
}

btnToggle.addEventListener("click", ()=>{

    document.body.classList.toggle("darkMode")

    //condicional que detecte en qué modo estamos
    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = `Light`
        btnToggle.className = ("btn btn-light")
        
        localStorage.setItem("modoOscuro", true)
        console.log(localStorage.getItem("modoOscuro"))
    }else if
    (JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = `Dark`
        btnToggle.className = ("btn btn-dark")
       
        localStorage.setItem("modoOscuro", false)
        console.log(localStorage.getItem("modoOscuro"))

    }

})