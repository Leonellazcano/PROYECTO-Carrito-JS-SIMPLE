const carrito= document.querySelector('#carrito');
const contenedorCarrito= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const listaCursos= document.querySelector('#lista-cursos');
let articulosCarrito= [];

cargarEventListeners();
function cargarEventListeners(){
    //agregar carrito
    listaCursos.addEventListener('click', agregarCurso);

    //elimina curso del carrito 
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito= []; // resetear el arreglo
        limpiarHtml();
    });
}


//Funciones 

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
        
    }
}
//elimina curso carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
      const cursoId = e.target.getAttribute('data-id');   
    articulosCarrito= articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHtml(); // iteramos sobre carrito y mostramos el html
    }

}
// lee el contenido del html y extra la info

function leerDatosCurso(curso){
    const infoCurso= {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        }
    // Revisa si elemnt existe 
    const existe= articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos 
        const cursos= articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; 
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    }else{
        //agregar
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


carritoHtml(); 
}


//MUESTRA CARRITO EN HTML

function carritoHtml(){
//limpiar el html 
limpiarHtml();
// recorre carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
         <td>  <img src="${imagen}" width="100">   </td>  
         <td>    ${titulo}    </td> 
         <td>    ${precio}    </td>
         <td>    ${cantidad}    </td>
         <td>
               <a href"#" class="borrar-curso" data-id="${id}"> x </a>
         </td>             
        `;
        //Agrega el html del carrito al tbody 
        contenedorCarrito.appendChild(row);
    });
}


//elimina los cursos del tbody

function limpiarHtml() {
    //contenedorCarrito.innerHTML= '';// forma lenta
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}