//class constructora
class Libro {
    constructor(id, autor, titulo, precio, imagen){
        //propiedades o atributos de nuestra clase
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen

    }
    //métodos
    mostrarInfoLibro(){
        console.log(`El titulo es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const libro1 = new Libro(1,"Jorge Luis Borges","Aleph", 900, "AlephBorges.jpg")

const libro2 = new Libro(2,"Gabriel García Marquez","Cien años de Soledad", 4500, "CienSoledadMarquez.jpg")

const libro3 = new Libro(3,"Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")

const libro4 = new Libro(4,"Jorge Luis Borges","Ficciones", 1400, "FiccionesBorges.jpg")

const libro5 = new Libro(5,"Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")

const libro6 = new Libro(6,"Mario Vargas Llosa", "La ciudad y los perros", 2000, "CiudadPerrosVargasLlosa.jpg")


//array de objetos:
//condicional que evalua si existe algo en el storage: si existe lo captura y toma como array. Si entra por primera vez, setea el array con los libros originales
let estanteria = []
//preguntar si existe algo en el storage con la clave estanteria
if(localStorage.getItem("estanteria")){
    //cuando no sea la primera vez
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
    
}else{
    console.log("Entra por primera vez, seteamos array")
    estanteria.push(libro1, libro2, libro3, libro4, libro5,libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}