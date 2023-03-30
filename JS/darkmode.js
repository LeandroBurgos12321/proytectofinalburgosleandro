// //DARK MODE:
// //recordar crear los mismo buttons (están en html clase 10)
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarModeBtn = document.getElementById("eliminarMode")
// //capturamos localStorage:
let modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
console.log(modoOscuro)
//condicional que si está en true, me ponga el sitio en oscuro, sino remove darkMode
if(modoOscuro == true){
     document.body.classList.add("darkMode")
 }
 else{
     document.body.classList.remove("darkMode")
 }

 botonDarkMode.addEventListener("click", ()=>{
     console.log("Btn oscuro funciona")
     document.body.classList.add("darkMode")
     //tmb se puede hacer con toggle
     localStorage.setItem("modoOscuro", true)
 })

 botonLightMode.addEventListener("click", ()=>{
     console.log("Btn claro funciona")
     document.body.classList.remove("darkMode")
     localStorage.setItem("modoOscuro", false)
 })

// //para eliminar una clave del local
 eliminarModeBtn.onclick = function(){
     //elimina el elemento indicado
     localStorage.removeItem("modoOscuro")
     //si queremos eliminar todo lo del storage
     localStorage.clear()
 }