const 
CARGAR_HORARIOS = "../../Main/cargar_horarios.php",
VERIFICAR_CUMPLES = "../../Main/verificar_cumples.php";
window.onload = accion("Cargando contenido",500, main);

//////////////Funciones:

function main(){
    try{
        cargarInicio();
        agregarEventosHeader();
        cargarInstituciones();
        agregarEventosMain();
    }catch(error){
        console.log(error)
        cerrarSesion();
    };
}

async function cargarInicio(){
    try {
        const id_curso_actual = await obtenerDatos(CARGAR_HORARIOS);
        const datos_de_bienvenida = await fetchViaPost(CARGAR_BIENVENIDA, {"id_curso":id_curso_actual});
        if(id_curso_actual != ""){
            let division = definirDivision(datos_de_bienvenida.division);
            ELEMENTO_BIENVENIDA.innerHTML = "<h1>Hola "+datos_de_bienvenida.nombre+",</h1><br><h2>Estás pasando asistencia en <span id='materia'>"+datos_de_bienvenida.materia+"</span>"+division+"</h2><h2><span id='carrera'>"+datos_de_bienvenida.carrera+"</span></h2><h3>"+datos_de_bienvenida.institucion+"</h3><br>";
            agregarAlumnos(id_curso_actual, HOY);
        }else{
            ELEMENTO_BIENVENIDA.innerHTML = "<h1>Hola "+datos_de_bienvenida.nombre+",</h1><br><h2>Ahora estás en hora libre</h2><br>";
            document.getElementById("titulos_seccion_alumnos").hidden = true;
            addEmpty(CLASSROOM, "empty_classroom", "e", "<h3>Nada por aqui</h3><h4>Puedes acceder al registro de asistencias <br>en el panel izquierdo</h4>");
        }
        return 1;
    } catch (error) {
        throw error;
    }

}
async function agregarEventosMain(){
    const lista_de_carreras = await obtenerDatos(CARGAR_CARRERAS);
    const lista_de_materias = await obtenerDatos(CARGAR_MATERIAS);
    const lista_de_cursos = await obtenerDatos(CARGAR_CURSOS);
    SELECT_INSTITUCION.addEventListener('change', ()=>{evento_cambio_institucion_cargar_cursos(SELECT_INSTITUCION,lista_de_carreras, lista_de_materias, lista_de_cursos)});
    SELECT_CURSO.addEventListener('change', ()=>{evento_validar_requisitos_para_buscar_alumnos()});
    FECHA_INPUT.addEventListener("change", ()=>{evento_validar_requisitos_para_buscar_alumnos()});
}

async function agregarAlumnos(id_curso, dia_cursado){
    try {
        document.getElementById("titulos_seccion_alumnos").hidden = false;
        const alumnos = await obtenerAlumnos(id_curso);
        if(alumnos.length > 0){
            alumnos.forEach(alumno =>{
                addAlumno(alumno, dia_cursado);
            });
        }else{
            addEmpty(CLASSROOM, "empty_classroom", "eb", "<h3>No hay alumnos matriculados en esta materia</h3><h4> Puede matricular alumnos en configuracion.</h4>");
        }
        document.getElementById("caption_alumnos").innerHTML="<h2>Registro del día: "+dia_cursado.getDate()+"/"+(dia_cursado.getMonth()+1)+"/"+dia_cursado.getFullYear()+"</h2>";
        verificarCumples(id_curso);
        return 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error al agregar los alumnos");
    }

}

async function verificarCumples(id_curso){
    const cumpleanios = await fetchViaPost(VERIFICAR_CUMPLES, {"id_curso":id_curso});
    console.log(cumpleanios);
    if(cumpleanios.length > 0){
        let cumpleanieros = "";
        await cumpleanios.forEach(cumple=>{
            cumpleanieros += cumple.nombre + " " + cumple.apellido+ ",<br>";
        });
        console.log(cumpleanieros);
        await Swal.fire({
            allowOutsideClick:false,
            backdrop: false,
            html: "Hoy es el cumpleaños de: <br> <h3>"+cumpleanieros+"</h3>",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Genial!",
            imageUrl: "https://cliply.co/wp-content/uploads/2021/02/392102670_BIRTHDAY_CAKE_400px.gif",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Feliz Cumpleaños!",
            didOpen: () => {
                OVERLAY_MAIN_BODY.style.display = 'block';
            },
            willClose: () => {
                OVERLAY_MAIN_BODY.style.display = 'none';
            }
        })
    };
}

async function addAlumno(alumno, dia_cursado){
    try {
        const div = document.createElement("div");
        div.classList.add('alumno_container');
        div.id = alumno.id_matricula;
        const 
        id_check_asistencia = "asistencia"+alumno.id_matricula;
        div.innerHTML = "<table id='alumno'><tr><td id='nombre_alumno' class='nombre_alumno'></td><td style='width: 21%;'><input type='checkbox' id='"+id_check_asistencia+"' name='"+id_check_asistencia+"' value='"+alumno.id_matricula+"'></input></td><tr></table>"
        div.querySelector("#nombre_alumno").textContent = alumno.apellido +" "+ alumno.nombre;
        CLASSROOM.appendChild(div);
    
        const existe_asistencia = await hay_asistencia_registrada(dia_cursado,alumno.id_matricula);
        document.getElementById(id_check_asistencia).checked = existe_asistencia;
        addEventoGuardarAsistencia(id_check_asistencia, alumno.id_matricula, dia_cursado);
    
        if(!fecha_esta_en_limite(dia_cursado)){
            deshabilitarElemento(id_check_asistencia, true);
            document.getElementById(id_check_asistencia).title = "Registro excede los 14 días anteriores"
        }
        return 1;
    } catch (error) {
        console.log(error);
        throw new Error("Error al agregar alumno");
    }

}


function evento_validar_requisitos_para_buscar_alumnos(){
    try {
        let 
        fecha = FECHA_INPUT.value,
        id_curso = SELECT_CURSO.value;
        if(validarFechaInput(fecha)){
            if(id_curso == ""){
                document.getElementById("mensaje_error").innerHTML = "Selecciona un curso";
            }else{
                document.getElementById("mensaje_error").innerHTML = "";
                deshabilitarElemento("boton_cargar_alumnos", false);
            }
        }else{
            deshabilitarElemento("boton_cargar_alumnos", true);
        }
        return 1;
    } catch (error) {
        throw error
    }

}



async function buscarRegistro(){
    try {
        CLASSROOM.innerHTML="";
        document.getElementById("titulos_seccion_alumnos").hidden = true;
        const 
        fecha_seleccionada = FECHA_INPUT.value,
        id_curso = SELECT_CURSO.value;
        const asistencias = await fetchViaPost(CARGAR_ASISTENCIAS, {"id_curso":id_curso, "fecha":fecha_seleccionada});
        if(asistencias.length == 0){
            await addEmpty(CLASSROOM,"empty_classroom", "b", '<h3>No se encontraron registros<br></h3><h4>No hay asistencias registradas para este día</h4>');
            addButton(document.getElementById("empty_classroom"), "Crear Asistencia", crearRegistroDeAsistencia);
        }else{
            const fecha_asistencia = new Date(fecha_seleccionada+"T00:00:00");
            agregarAlumnos(id_curso, fecha_asistencia);
        }
        const datos_del_curso = await fetchViaPost(CARGAR_BIENVENIDA, {"id_curso":id_curso});
        let division = definirDivision(datos_del_curso.division);
        ELEMENTO_BIENVENIDA.innerHTML = "<h2>Estás viendo el registro de <span id='materia'>"+datos_del_curso.materia+"</span>"+division+"</h2><h2>Carrera: <span id='carrera'>"+datos_del_curso.carrera+"</span></h2><h3>"+datos_del_curso.institucion+"</h3><br>";    
        return 1;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

function crearRegistroDeAsistencia(){
    accion("Creando registro", 1000, crearAsistencia);
}

async function crearAsistencia(){
    try {
        CLASSROOM.innerHTML="";
        const
        fecha_seleccionada = FECHA_INPUT.value,
        id_curso = SELECT_CURSO.value,
        fecha_asistencia = new Date(fecha_seleccionada+"T00:00:00");
        document.getElementById("titulos_seccion_alumnos").hidden = false;
        agregarAlumnos(id_curso, fecha_asistencia);
        return 1;
    } catch (error) {
        console.log(error);
        throw error;

    }

}


function addEventoGuardarAsistencia(id_check_asistencia, id_matricula, dia_cursado){
    document.getElementById(id_check_asistencia).addEventListener('change', ()=>{guardarAsistencia(dia_cursado, id_matricula, id_check_asistencia)});
}

async function guardarAsistencia(dia_cursado, id_matricula, id_check_asistencia){
    try {
        let 
        asistencia = document.getElementById(id_check_asistencia).checked,
        fecha = dia_cursado.getFullYear()+"-"+(dia_cursado.getMonth()+1)+"-"+dia_cursado.getDate();
        fetchViaPost(GUARDAR_ASISTENCIA, {"id_matricula": id_matricula, "fecha": fecha, "asistencia": asistencia});
        return 1;
    } catch (error) {
        throw error;
    }
}