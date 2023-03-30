//PROYECTO DOM:
//Captura de DOM
let librosDiv = document.getElementById("libros")
let guardaLibroBtn = document.getElementById("guardarLibroBtn")
// let btnVerCatalogo = document.getElementById("verCatalogo")
// let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let botonCarrito = document.getElementById("botonCarrito")
let modalCargarLibro = document.getElementById("modalCargarLibro")
//Functions
function mostrarCatalogo(array){
    //vaciar Div
    librosDiv.innerHTML = ""
    //tenemos nuestros libros en estanteria:
    for(let libro of array){
        let nuevoLibroDiv = document.createElement("div")
        //otra forma de sumarle una class a un elemento html
        //classList + add agrego clases al elemento seleccionado
        nuevoLibroDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
        nuevoLibroDiv.innerHTML = `
        <div id="${libro.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
                <div class="card-body">
                    <h4 class="card-title">${libro.titulo}</h4>
                    <p>Autor: ${libro.autor}</p>
                    <p class="${libro.precio <= 2000 && "ofertaLibro"}">Precio: ${libro.precio}</p>
                <button id="agregarBtn${libro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
        </div>
        `
        librosDiv.appendChild(nuevoLibroDiv)
        //captura agregarBtn
        let agregarBtn = document.getElementById(`agregarBtn${libro.id}`)
        //adjunto evento
        agregarBtn.addEventListener("click", ()=>{
            
            agregarAlCarrito(libro)
        })
    }
    
}
let productosEnCarrito
//if para preguntar si entra por primera vez o si hay algo en storage
if(localStorage.getItem("carrito")){
    //cuando ya existe algo en el storage entra aca:
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
    console.log(productosEnCarrito)
}else{
    productosEnCarrito = []
    localStorage.setItem("carrito", productosEnCarrito)

}

function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoEnCarrito)=>{
        modalBodyCarrito.innerHTML +=
        `
        <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoEnCarrito.titulo}</h4>
                    
                         <p class="card-text">$${productoEnCarrito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoEnCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `

    })

}

function agregarAlCarrito(libro){

    //preguntar si existe ese libro en el array
    let libroAgregado = productosEnCarrito.find((elem)=>elem.id == libro.id)

    if(libroAgregado == undefined){
        // console.log(`El libro ${libro.titulo} de ${libro.autor} ha sido agregado al carrito. Vale ${libro.precio}`)
        //agregar libro al array de carrito
        productosEnCarrito.push(libro)
        // console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    
        // //alert para agregar libro
        Swal.fire({
            title: 'Ha agregado un producto :D',
            text: `El libro ${libro.titulo} de ${libro.autor} ha sido agregado`,
            icon: "info",
            confirmButtonColor: "green",
            confirmButtonText: "Gracias!",
            //milisegundo por medida
            timer: 3000,
            imageUrl: `assets/${libro.imagen}`,
            imageHeight: 200
        })

    }else{
        Swal.fire({
            title: 'Libro ya agregado',
            text: `El libro ${libroAgregado.titulo} de ${libroAgregado.autor} ya existe en el carrito`,
            icon: "info",
            showConfirmButton: false,
            timer: 1500,
            
        })
    }
}
function cargarLibro(array){
        let inputAutor = document.getElementById("autorInput")
        let inputTitulo = document.getElementById("tituloInput")
        let inputPrecio = document.getElementById("precioInput")
        
        const libroNuevo = new Libro(array.length+1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "libroNuevo.jpg")
        console.log(libroNuevo)
        //sumarlo a estanteria:
        array.push(libroNuevo)
        console.log(array)
        //sumarlo también al Storage:
        localStorage.setItem("estanteria", JSON.stringify(array))
        mostrarCatalogo(array)
        //resetear los inputs
        // inputAutor.value = ""
        // inputTitulo.value = ""
        // inputPrecio.value = ""

        //resetear manipulando el form directo
        // console.log(modalCargarLibro[0])
        // console.log(modalCargarLibro[1])
        // console.log(modalCargarLibro[2])
        // console.log(modalCargarLibro[3])
        // console.log(modalCargarLibro[0].value)
        // console.log(modalCargarLibro[1].value)
        // console.log(modalCargarLibro[2].value)
        
        modalCargarLibro.reset()
        //notificación Toastify
        Toastify({
            text: `El libro ${libroNuevo.titulo} ha sido incorporado al stock`,
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              color: "black"
            },
          }).showToast();
        
        
    }

function buscarInfo(buscado, array){
    //comparación estricta autor y titulo, ej:
    // libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    let busquedaArray = array.filter(
        (libro)=> libro.autor.toLowerCase().includes(buscado) || libro.titulo.toLowerCase().includes(buscado)
    )
    
    // if(busquedaArray.length == 0){
    //     coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`
    //     mostrarCatalogo(busquedaArray)
    // }else{
    //     coincidencia.innerHTML = ""
    //     mostrarCatalogo(busquedaArray)
    // }
    //reemplazar por ternario
    //necesito darle dos intrucciones, separa con coma
    busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, mostrarCatalogo(busquedaArray)) 
    :
    (coincidencia.innerHTML = "", mostrarCatalogo(busquedaArray))

}
//functios de ordenamiento:
function ordenarMenorMayor(array){
    //copiamos array original // concat
    const menorMayor = [].concat(array)
    //ordena de menor a mayor
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    mostrarCatalogo(mayorMenor)
}
function ordenarAlfabeticamenteTitulo(array){
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a,b) => {
        if(a.titulo > b.titulo) {
            return 1
        }
        if (a.titulo < b.titulo) {
            return -1
        }
        // a must be equal to b
        return 0;
    })
    mostrarCatalogo(ordenadoAlfabeticamente)
}

//EVENTOS
guardaLibroBtn.addEventListener("click", ()=>{
        cargarLibro(estanteria)}
    )
    
// btnVerCatalogo.onclick = ()=>{mostrarCatalogo(estanteria)}

// ocultarCatalogoBtn.ondblclick = function(){
//         librosDiv.innerHTML =""
// }
buscador.addEventListener("input", ()=>{
    
    buscarInfo(buscador.value.toLowerCase(), estanteria)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    //invocar functions de ordenamiento
    if(selectOrden.value == 1){
        ordenarMayorMenor(estanteria)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(estanteria)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamenteTitulo(estanteria)
    }else{
        mostrarCatalogo(estanteria)
    }
})
botonCarrito.addEventListener("click", () =>{
    cargarProductosCarrito(productosEnCarrito)
})


//CODIGO PROYECTO
mostrarCatalogo(estanteria)

//CLASE N° 13 LIBRERIAS

//sweet alert:
 Swal.fire({
     title: 'Error!',
     text: 'Do you want to continue',
     icon: 'error',
     confirmButtonText: 'Cool'
   })

 Swal.fire({
     title: "Bienvenidos",
     text: "Buen día, hoy es la clase 13",
     icon: "question",
     confirmButtonText: "Entendido",
     confirmButtonColor: "green"
 })


//Segunda librería Toastify

 Toastify({
     text:"Esto es una notificación",
     //en milisegundos
     duration: 2500
 }).showToast()

 Toastify({
     text: "This is a toast",
     duration: 3000,
     destination: "https://github.com/apvarun/toastify-js",
     newWindow: true,
     close: true,
     gravity: "bottom", // `top` or `bottom`
     position: "center", // `left`, `center` or `right`
     stopOnFocus: true, // Prevents dismissing of toast on hover
     style: {
       background: "linear-gradient(to right, #00b09b, #96c93d)",
       color: "black"
     },
     onClick: function(){
     } // Callback after click
   }).showToast();

