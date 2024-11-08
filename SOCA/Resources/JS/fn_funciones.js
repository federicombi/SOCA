
function iraHome(){
    window.location.href = "../../Elemental/main.php";
}
function iraCalificaciones(){
    window.location.href = "../../Calificaciones/calificaciones.php";
}
function iraSettings(){
    window.location.href = "../../Settings/settings.php";
}

function cerrarSesion(){
    try{fetch("../../Elemental/cerrar_sesion.php").then (response=>response.json())
        .then(data=>{
                window.location.href = "../../index.php";
                }
                );
            } catch(error){
                console.log("error en el cierre de sesion");
            }
}

function lanzar_error_bye(mensaje, overlay){
    Swal.fire({
        title: "ERROR!",
        html: mensaje+"<br><b>Reintente más tarde o comuníquese con el administrador.</b>",
        icon: "error",
        allowOutsideClick:false,
        backdrop: false,
        showConfirmButton: false,
        didOpen: () => {
            overlay.style.display = 'block';
            return 1;
        }
    });
}

function agregarEventosHeader(){
    BOTON_HOME.addEventListener("click", iraHome);
    BOTON_SALIR.addEventListener("click", cerrarSesion);
    BOTON_CALIFICACIONES.addEventListener("click", iraCalificaciones);
    BOTON_SETTINGS.addEventListener("click", iraSettings);
}

function accion(titulo, tiempo, funcion){
    let timerInterval;
    Swal.fire({
        allowOutsideClick:false,
        backdrop: false,
        title: titulo,
        html: "Aguarde unos segundos",
        timer: tiempo,
        timerProgressBar: true,
        didOpen: () => {
            OVERLAY_MAIN_BODY.style.display = 'block';
            Swal.showLoading();
            Swal.stopTimer();
            funcion();
            Swal.resumeTimer();
        },
        willClose: () => {
            clearInterval(timerInterval);
            OVERLAY_MAIN_BODY.style.display = 'none';
        }
    })
}

function fireDatosGuardados(){
    Swal.fire({
        title: "Guardado!",
        text: "Los datos fueron guardados",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
    });
}

function deshabilitarElemento(id_elemento,boolean){
    document.getElementById(id_elemento).disabled = boolean;
}
function agregarOpcionASelect(elemento_select, valor, textoParaMostrar){
    try {
        const opcion = document.createElement("option");
        opcion.value= valor;
        opcion.text = textoParaMostrar;
        elemento_select.appendChild(opcion);
        return 1;
    } catch (error) {
        throw error;
    }
    
}
function vaciarSelect(select, placeholder){
    select.innerHTML = "<option selected value='' disabled> "+placeholder+"...</option>";
}

async function obtenerDatos(enlace){
    try{
        const response = await fetch(enlace);
        const data = await  response.json();
        return data;
    } catch(error){
        throw new Error("Error al obtener los datos");
    }
}

async function fetchViaPost(enlace, datosComoObjeto){
    try {
        const response = await fetch(enlace,{
            method:"POST", 
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams(
                datosComoObjeto
            )
        });
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        throw error;
    }
}




async function evento_cambio_institucion_cargar_cursos(select, lista_carreras, lista_materias, lista_cursos){
    let institutoSeleccionado = select.value;
    vaciarSelect(SELECT_CURSO, "Curso");
    deshabilitarElemento("boton_cargar_alumnos",true);
    SELECT_CURSO.disabled=true;
    lista_carreras.forEach(carrera=>{
        if(institutoSeleccionado == carrera.cue){
            lista_materias.forEach(materia=>{
                if (materia.id_carrera == carrera.id_carrera){
                    lista_cursos.forEach(curso=>{
                        if(curso.id_materia == materia.id_materia){
                            let division = "";
                            if(curso.division != null){ 
                                division = curso.division+" ";
                            };
                            const opcionParaMostrar = materia.grado+"° "+division+materia.nombre+ " - "+carrera.nombre;
                            agregarOpcionASelect(SELECT_CURSO, curso.id_curso, opcionParaMostrar);
                        }
                    });
                }
            });
        }
    });
    SELECT_CURSO.disabled=false;
}
async function obtenerAlumnos(id_curso){
    try{
        const alumnos = await fetchViaPost(CARGAR_ALUMNOS, {"id_curso": id_curso});
        deshabilitarElemento("boton_cargar_alumnos",true);
        return alumnos;
    }catch{
        throw "error al obtener los alumnos";
    }
}


function fecha_esta_en_limite(fecha_asistencia){
    return ((fecha_asistencia.getTime() >= FECHA_LIMITE_ASISTENCIA.getTime()));
}


async function hay_asistencia_registrada(dia,id_matricula){
    let fecha = dia.getFullYear()+"-"+(dia.getMonth()+1)+"-"+dia.getDate();
    const ya_asistio = await fetchViaPost(VERIFICAR_ASISTENCIA, {"id_matricula": id_matricula, "fecha":fecha});
    return ya_asistio;
}


async function addEmpty(container, id_div, id_imagen, mensaje){
    try {
        container.innerHTML = "";
        const img = document.createElement("img");
        img.alt = "Nada por aquí";
        switch (id_imagen){
            case "b":
                img.src="../Resources/Images/buscar.png";
                break;
            case "e":
                img.src="../Resources/Images/empty.png";
                break;
            case "eb":
                img.src="../Resources/Images/empty_box.png";
                break;
        }
        const div_empty = document.createElement("div");
        div_empty.id = id_div;
        div_empty.classList.add('empty');
        div_empty.appendChild(img);
        const texto = document.createElement("div");
        texto.innerHTML = mensaje;
        div_empty.appendChild(texto);
        container.appendChild(div_empty);
        return 1; 
    } catch (error) {
        throw new Error("Datos no encontrados");
    }

}
function addButton(container, mensaje, funcion){
    try {
        const boton = document.createElement("button");
        boton.innerHTML = mensaje;
        boton.addEventListener('click', ()=>{funcion()});
        container.appendChild(boton);
        boton.classList.add('boton_agregado');
        return 1
    } catch (error) {
        throw new Error("Error al agregar boton");
    }

}

function validarFechaInput(fecha){
    if (fecha == ""){
        return false;
    }else{
        fechaObjeto = new Date(fecha);
        if(fechaObjeto.getFullYear() != HOY.getFullYear() || fechaObjeto.getFullYear()>HOY.getFullYear() || fechaObjeto.getTime() > HOY.getTime()){
            document.getElementById("mensaje_error").innerHTML = "Ingresa una fecha válida";
            return false;
        }else{
            document.getElementById("mensaje_error").innerHTML = "";
            return true;
        }
    }
}
async function cargarInstituciones(){
    try{
        let instituciones = await obtenerDatos(CARGAR_INSTITUCIONES);
        if (instituciones.length==0){
            cerrarSesion();
        }
        instituciones.forEach(instituto =>{
            agregarOpcionASelect(SELECT_INSTITUCION, instituto.cue, instituto.nombre);
        });
        SELECT_INSTITUCION.disabled = false;
    } catch(error){
        throw new Error("Error al obtener las instituciones");
    }
}

function definirDivision(division){
    try {
        let string_division = "";
        if(division == null){
            string_division = "";
        }else{
            string_division= ", Division: <span id='division_bienvenida'>"+division+"</span>."
        }
        return string_division;
    } catch (error) {
        throw new Error("No se pudo definir la division");
    }

}

async function confirmar_accion(titulo, html, icono, texto_boton_confirmar, OVERLAY){
    const result = await Swal.fire({
        title: titulo,
        html: html,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: texto_boton_confirmar,
        cancelButtonText: "Cancelar",
        allowOutsideClick:false,
        backdrop: false,
        didOpen: () => {
            OVERLAY.style.display = 'block';
        },
        willClose: () => {
            OVERLAY.style.display = 'none';
        }
    });
    return result;
}

function operacion_exitosa(titulo, OVERLAY){
    Swal.fire({
        title: titulo,
        icon: "success",
        allowOutsideClick:false,
        backdrop: false,
        timer: 1700,
        showConfirmButton: false,
        didOpen: () => {
            OVERLAY.style.display = 'block';
        },
        willClose: () => {
            OVERLAY.style.display = 'none';
        }
    });
}
async function operacion_con_error(mensaje, OVERLAY){
    const alerta = await Swal.fire({
        title: "Accion denegada",
        html: mensaje,
        icon: "error",
        allowOutsideClick:false,
        backdrop: false,
        timer: 3000,
        showConfirmButton: false,
        didOpen: () => {
            OVERLAY.style.display = 'block';
        },
        willClose: () => {
            OVERLAY.style.display = 'none';
        }
    });
    return alerta;
}

function email_ok(email){
    const patronMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;

    if(patronMail.test(email)){
        return true
    }else{
        return false;
    }
}

function texto_ok(texto){
    const patronTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
    if(patronTexto.test(texto)){
        return true
    }else{
        return false;
    }
}