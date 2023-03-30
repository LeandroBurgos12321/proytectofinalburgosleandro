//FUNCTIONS proyecto -- prompts y alerts:
function agregarLibro(){
    let autorIngresado = prompt("Ingrese el nombre del autor")
    let tituloIngresado = prompt("Ingrese el titulo del libro")
    let precioIngresado = parseInt(prompt("Ingrese el precio del libro"))
    //creamos nuevo objeto 
    //para id dinámica usamos propiedad length
    const libroNuevo = new Libro(estanteria.length+1, autorIngresado, tituloIngresado, precioIngresado)
    console.log(libroNuevo)
    //sumarlo a estanteria
    estanteria.push(libroNuevo) 
    console.log(estanteria)
}

function eliminarLibro(array){
    console.log("A partir del catalogo ingrese el id que desea eliminar")
    for(let elem of array){
        console.log(`${elem.id} - ${elem.titulo} del autor ${elem.autor}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))

    //vamos a hacer una copia del array que tenga sólo las id
    let arrayID = array.map((libro) => libro.id)
    console.log(arrayID)
    
    let indice = arrayID.indexOf(idEliminar)

    array.splice(indice, 1)
    verCatalogo(array)
}


function verCatalogo(array){
    console.log("Bienvenido! Nuestro catalogo es:")
    array.forEach((libro)=>{
        console.log(libro.id, libro.titulo, libro.precio, libro.autor)
    })
}

//aplicación de find
function buscarPorTitulo(array){
    let tituloBuscado = prompt("Ingrese el nombre del titulo del libro que desea buscar")
    let tituloEncontrado = array.find(
        (book)=> book.titulo.toLowerCase() == tituloBuscado.toLowerCase()
        )
    //si hay coincidencia nos devuelve el objeto, sino undefined (Atención find busca y cuando hay coincidencia retorna y deja de buscar)
    if(tituloEncontrado == undefined){
        console.log(`El libro ${tituloBuscado} no está en stock`)
    }
    else{
        console.log(tituloEncontrado) 
    }
}

function buscarPorAutor(arr){
    let autorBuscado = prompt("Ingrese el nombre del autor que está buscando")
    let busqueda = arr.filter((libro)=> libro.autor.toLowerCase() == autorBuscado.toLowerCase())
    if(busqueda.length == 0){
        console.log(`No hay coincidencias para el autor/a ${autorBuscado}`)
    }else{
        //lo muestro común el array
        console.log(busqueda)
        //para probar reutilizamos la function que muestra el array
        verCatalogo(busqueda)
    }

}

//SORT -- ATENCIÓN METODO QUE DESTRUYE (AFECTA) AL ARRAY ORIGINAL -- en el after lo seguimos
// //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// // https://davidyero.medium.com/ordenar-arreglo-de-objetos-por-propiedad-o-atributo-javascript-56f74fc48906

function ordenarMenorMayor(array){
        //copiamos array original // concat
        const menorMayor = [].concat(array)
        //ordena de menor a mayor
        menorMayor.sort((a,b) => a.precio - b.precio)
        verCatalogo(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    verCatalogo(mayorMenor)
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
    verCatalogo(ordenadoAlfabeticamente)
}
function ordenar(array){
    let opcion = parseInt(prompt(`
    1 - Ordenar de menor a mayor
    2 - Ordenar de mayor a menor
    3 - Ordenar alfabeticamente `))
    switch(opcion){
        case 1:
            ordenarMenorMayor(array)
        break
        case 2:
            ordenarMayorMenor(array)
        break
        case 3:
            ordenarAlfabeticamenteTitulo(array)
        break
        default:
            console.log(`${opcion} no es válida para ordenar`)
        break    
    }
}

function menu(){
    let salirMenu = false
    do{
        salirMenu = preguntarOpcion(salirMenu)
    }while(!salirMenu)
} 

function preguntarOpcion(salir){
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
           1 - Agregar libro
           2 - Borrar libro
           3 - Consultar catálogo
           4 - Encontrar por titulo:
           5 - Buscar libros de un mismo autor:
           6 - Ordenar libros:
           0 - Salir del menu`))
    
        switch(opcionIngresada){
            case 1:
                agregarLibro()
            break
            case 2:
                //borrar libro
                eliminarLibro(estanteria)
            break
            case 3:
                //ver catalogo
                verCatalogo(estanteria)
            break
            case 4:
                //buscar por titulo
                buscarPorTitulo(estanteria)
            break
            case 5:
                //buscar por autor
                buscarPorAutor(estanteria)
            break
            case 6:
                //ordenar
                ordenar(estanteria)
            break
            case 0:
                console.log("gracias por utilizar nuestra app")
                salir = true
                return salir
            break
            default:
                console.log("Ingrese una opción correcta")
            break
        }
}

//CÓDIGO
// menu()

//--------------------------------------------------------------------------------------------