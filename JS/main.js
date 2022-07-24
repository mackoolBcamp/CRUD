let formulario = document.getElementById("formulario");
let tarea = document.getElementById("tarea");
let listaTareas = document.getElementById("listaTareas");

let arrayTareas = [];
let item = {
  tarea: "",
  estado: false,
};

function agregarTarea(texto) {
  item = {
    tarea: texto,
    estado: false,
  };
  arrayTareas.push(item);
}

// agregarTarea("comer");
// agregarTarea("beber");
// console.log(arrayTareas);

formulario.onsubmit = function (e) {
  e.preventDefault();
  let textoTarea = tarea.value;
  agregarTarea(textoTarea);
  console.log(arrayTareas);
  tarea.value = "";
  GuardarBD();
};

function GuardarBD() {
  localStorage.setItem("tareas", JSON.stringify(arrayTareas));
  mostrarBD();
}

document.addEventListener("DOMContentLoaded", mostrarBD);

function mostrarBD() {
  listaTareas.innerHTML = "";
  arrayTareas = JSON.parse(localStorage.getItem("tareas"));
  for (var i = 0; i < arrayTareas.length; i++) {
    if (arrayTareas[i].estado === true) {
      listaTareas.innerHTML += `
      <div class="alert alert-primary" role="alert">
         <i class="fa fa-list" aria-hidden="true"></i>
        <strong>${arrayTareas[i].tarea}</strong>--${arrayTareas[i].estado}
         <span class="float-end">
         <i class="fa-solid fa-check ms-3"></i>
         <i class="fa-solid fa-trash-can"></i>
         </span>
      </div>

    `;
    } else {
      listaTareas.innerHTML += `
        <div class="alert alert-danger" role="alert">
           <i class="fa fa-list" aria-hidden="true"></i>
          <strong>${arrayTareas[i].tarea}</strong>--${arrayTareas[i].estado}
           <span class="float-end">
           <i class="fa-solid fa-check ms-3"></i>
           <i class="fa-solid fa-trash-can"></i>
           </span>
        </div>
  
      `;
    }
  }
}

listaTareas.onclick = function (e) {
  e.preventDefault();
  // console.log(e.target.classList[1]);
  if (
    e.target.classList[1] === "fa-check" ||
    e.target.classList[1] === "fa-trash-can"
  ) {
    //console.log(e.target.classList[1]);
    let nombreTarea =
      e.target.parentNode.parentNode.querySelector("strong").innerHTML;
    //console.log(nombreTarea);
    if (e.target.classList[1] === "fa-trash-can") {
      eliminarBD(nombreTarea);
    } else {
      editarBD(nombreTarea);
    }
  }
};

function eliminarBD(nombreTarea) {
  arrayTareas.forEach((Elemento, index) => {
    //elimina todo
    if (Elemento.tarea == nombreTarea) {
      arrayTareas.splice(index, 1);
    }
  });
  GuardarBD();
}

function editarBD(nombreTarea) {
  for (var i = 0; i < arrayTareas.length; i++) {
    if (arrayTareas[i].tarea === nombreTarea) {
      arrayTareas[i].estado = true;
    }
  }
  GuardarBD();
}
