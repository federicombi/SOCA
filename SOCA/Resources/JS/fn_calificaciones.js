const 
OVERLAY_NOTAS_ADDER = document.getElementById("notas_adder"),
NOTAS_ALUMNOS_CONTAINER = document.getElementById("notas_alumnos_container"),
TABLA_NOTAS = document.getElementById("tabla_notas"), 
SELECT_TIPO_NOTA = document.getElementById("tipo_nota"),
NOTA_APROBADO = 6,
NOTA_PROMOCION = 7,
OBTENER_CALIFICACIONES_DE_ALUMNO = "../../Calificaciones/obtener_calificaciones_de_alumno.php",
ACTUALIZAR_CALIFICACIONES = "../../Calificaciones/actualizar_calificaciones.php";

let dias_de_clase;

cargarInicio();

let id_curso_global = 0;
/////////////////////////////////////////////////template
function template_xd (){
    try {

        return 1;
    } catch (error) {
        throw error;
        lanzar_error_bye("Error al obtener las localidades", OVERLAY_MAIN_BODY);
        throw new Error("Mensaje");
    }
}
//////////////////////////////////////////////

function cargarInicio(){
    try{
        agregarEventosHeader();
        cargarInstituciones();
        agregarEventos();
        addEmpty(CLASSROOM, "empty_classroom","e", "<h3>Nada por aqui</h3><h4>Puedes acceder al registro de calificaciones <br>en el panel superior</h4>");

    }catch{
        cerrarSesion();
    };
}
async function agregarEventos(){
    try {
        const lista_de_carreras = await obtenerDatos(CARGAR_CARRERAS);
        const lista_de_materias = await obtenerDatos(CARGAR_MATERIAS);
        const lista_de_cursos = await obtenerDatos(CARGAR_CURSOS);
        SELECT_INSTITUCION.addEventListener('change', ()=>{evento_cambio_institucion_cargar_cursos(SELECT_INSTITUCION,lista_de_carreras, lista_de_materias, lista_de_cursos)});
        SELECT_CURSO.addEventListener('change', ()=>{evento_validar_requisitos_para_buscar_alumnos()});
        SELECT_INSTITUCION.addEventListener('change', ()=>{deshabilitarElemento("boton_ingresar_notas", true);});
        SELECT_TIPO_NOTA.addEventListener('change', ()=>{deshabilitarElemento("boton_guardar_notas", false);});
        return 1;
    } catch (error) {
        throw error;
    }

}

function evento_validar_requisitos_para_buscar_alumnos(){
    let 
    id_curso = SELECT_CURSO.value;
    if(id_curso == ""){
        deshabilitarElemento("boton_cargar_alumnos", true);
        deshabilitarElemento("boton_ingresar_notas", true);
    }else{
        deshabilitarElemento("boton_cargar_alumnos", false);
        deshabilitarElemento("boton_ingresar_notas", true);
    }
}

async function buscarRegistro(){
    try {
        CLASSROOM.innerHTML="";
        document.getElementById("titulos_seccion_alumnos").hidden = true;
        const 
        id_curso = SELECT_CURSO.value,
        datos_del_curso = await fetchViaPost(CARGAR_BIENVENIDA, {"id_curso":id_curso});
        dias_de_clase = datos_del_curso.dias_de_clase;
        let division = definirDivision(datos_del_curso.division);
        ELEMENTO_BIENVENIDA.innerHTML = "<h2>Calificaciones de <span id='materia'>"+datos_del_curso.materia+"</span>"+division+"</h2><h2> <span>"+datos_del_curso.carrera+"</span></h2><h3>"+datos_del_curso.institucion+"</h3><br>";
        agregarAlumnos(id_curso);
        deshabilitarElemento("boton_ingresar_notas", false);
        id_curso_global = id_curso;
        return id_curso;
    } catch (error) {
        throw error;
    }

}

async function agregarAlumnos(id_curso){
    try {
        document.getElementById("titulos_seccion_alumnos").hidden = false;
        const 
            alumnos = await obtenerAlumnos(id_curso),
            calificaciones = await fetchViaPost(OBTENER_CALIFICACIONES, {"id_curso":id_curso}),
            columnas = calificaciones[0],
            notas = calificaciones[1],
            estados = calificaciones[2];
    
        if(alumnos.length > 0){
            agregarTitulos(columnas);
            alumnos.forEach(alumno =>{
                addAlumno(alumno, columnas, notas, estados);
            });
        }else{
            agregarTitulos([]);
            addEmpty(CLASSROOM, "empty_classroom", "eb", "<h3>No hay alumnos matriculados en esta materia</h3><h4> Puede matricular alumnos en configuracion.</h4>");
        }
        return 1;
    } catch (error) {
        console.log(error.message);
    }

}

async function addAlumno(alumno, columnas, todas_las_notas, todos_los_estados){
    try {
        const div = document.createElement("div"),
        id_boton = "edit"+alumno.id_matricula;
    
        let columnas_a_insertar = "";
    
        columnas.forEach(col=>{
            columnas_a_insertar += "<td class='col' id='"+col.tipo+"'> - - </td>";
        });
    
        div.classList.add('alumno_container');
        div.id = "alumno"+alumno.id_matricula;
        div.innerHTML = "<table id='alumno'><tr><td id='nombre_alumno' class='nombre_alumno'></td>"+columnas_a_insertar+" <td class='col_button'><button class='editor' id='"+id_boton+"'>Editar</button></td><tr></table>";
        div.querySelector("#nombre_alumno").textContent = alumno.apellido +" "+ alumno.nombre;
    
        todas_las_notas.forEach(nota=>{
            if(nota.id_matricula == alumno.id_matricula){
                if(nota.nota){
                    div.querySelector('#'+nota.tipo).innerHTML = "<b>"+nota.nota+"</b>";
                }
                if(nota.nota < NOTA_APROBADO){
                    div.querySelector('#'+nota.tipo).style.color = "DarkOrange";
                }else if(nota.nota > NOTA_PROMOCION){
                    div.querySelector('#'+nota.tipo).style.color = "green";
                }
    
            }
        });
    
        todos_los_estados.forEach(estado=>{
            if(estado.id_matricula == alumno.id_matricula){
                div.querySelector('#percent').innerHTML = "<b>"+estado.percent+" %</b>";
                div.querySelector('#promedio').innerHTML = "<b>"+estado.promedio+"</b>";
                div.querySelector('#condicion').innerHTML = "<b>"+estado.condicion+"</b>";
                if(estado.percent < 70){
                    div.querySelector('#percent').style.color = "red";
                }else if(estado.percent < 80){
                    div.querySelector('#percent').style.color = "#9f661e";
                }
                if(estado.promedio < NOTA_APROBADO){
                    div.querySelector('#promedio').style.color = "red";
                }else if( estado.promedio > NOTA_PROMOCION){
                    div.querySelector('#promedio').style.color = "green";
                }
                if(estado.condicion === "Libre"){
                    div.querySelector('#condicion').style.color = "red";
                }else if(estado.condicion === "Promocion"){
                    div.querySelector('#condicion').style.color = "green";
                }
            }
        })
    
        CLASSROOM.appendChild(div);
        document.getElementById(id_boton).addEventListener('click', ()=>{editarCalificacionDeAlumno(alumno)});

    } catch (error) {
        throw new Error("Error al agregar alumno "+alumno.id_alumno);
    }
    
}

function agregarTitulos(columnas){
    ELEMENTO_TITULOS_ALUMNOS.innerHTML="";
    const titulos = document.createElement("div");
    let columnas_de_calificaciones = "";
    columnas.forEach(col=>{
        let nombre_columna = "";
        switch(col.tipo){
            case "p1":
                nombre_columna = "1er Prueba"
                break;
            case "rp1":
                nombre_columna = "Recu. 1er Prueba"
                break;
            case "p2":
                nombre_columna = "2da Prueba";
                break;
            case "rp2":
                nombre_columna = "Recu. 2da Prueba";
                break;
            case "tf":
                nombre_columna = "Trabajo Final";
                break;
            case "tp1":
                nombre_columna = "TP 1";
                break;
            case "tp2":
                nombre_columna = "TP 2";
                break;
            case "tp3":
                nombre_columna = "TP 3";
                break;
            case "tp4":
                nombre_columna = "TP 4";
                break;
            case "tp5":
                nombre_columna = "TP 5";
                break;
            case "percent":
                nombre_columna = "% Asistencia";
                break;
            case "promedio":
                nombre_columna = "Promedio";
                break;
            case "condicion":
                nombre_columna = "Condicion";
                break;
        }
        columnas_de_calificaciones += "<th id='"+col.tipo+"'>"+nombre_columna+"</th>";
    });
    titulos.classList.add('titulos_alumnos');
    titulos.id = "titulos_alumnos";
    titulos.innerHTML = "<table><caption>Dias de clase efectivos: <b>"+dias_de_clase+"</b></caption><tr><td class='nombre_alumno'>Nombre Alumno</td>"+columnas_de_calificaciones+" <td class='espacio_extra'><p></p></td><tr></table>";
    ELEMENTO_TITULOS_ALUMNOS.appendChild(titulos);
}

async function ingresarNotas(){
    const 
    id_curso = SELECT_CURSO.value, 
    alumnos = await obtenerAlumnos(id_curso);
    OVERLAY_MAIN_BODY.style.display = 'block';
    TABLA_NOTAS.innerHTML="";
    alumnos.forEach(alumno=>{
        const 
        fila = TABLA_NOTAS.insertRow(),
        input = document.createElement('input'),
        mensaje_error = document.createElement("p");
        let 
        id_input = alumno.id_matricula,
        id_error = "err"+alumno.id_matricula;

        input.type = "number";
        input.id = id_input;
        input.placeholder = "Calificacion..."; 
        mensaje_error.classList.add("mensaje_error");
        mensaje_error.id = id_error;
        fila.insertCell(0);
        fila.insertCell(1).innerHTML = alumno.apellido +" "+ alumno.nombre;
        fila.insertCell(2).appendChild(input);
        fila.insertCell(3).appendChild(mensaje_error);
        fila.cells[0].style.width = "10%";
    });
    OVERLAY_NOTAS_ADDER.style.display = "block";
}

function cerrarIngresarNotas(){
    OVERLAY_MAIN_BODY.style.display = 'none';
    OVERLAY_NOTAS_ADDER.style.display = "none";
}

async function guardarNotas(){
    try {
        let 
        notas = [],
        nulos = 0,
        notas_erroneas = 0;
        const calificaciones = await fetchViaPost(OBTENER_CALIFICACIONES, {"id_curso":SELECT_CURSO.value});
    
        for( let i=0; i<TABLA_NOTAS.rows.length; i++){
            const 
            fila = TABLA_NOTAS.rows[i],
            input = fila.cells[2].querySelector('input'),
            mensaje_error = document.getElementById("err"+input.id);
    
            let calificacion = {
                "id_matricula": input.id,
                "nota": input.value,
                "tipo": SELECT_TIPO_NOTA.value
            };
            await calificaciones[0].forEach(columna=>{
                if(columna.tipo == calificacion.tipo){
                    throw new Error("<h3>Las notas del <b>"+SELECT_TIPO_NOTA.options[SELECT_TIPO_NOTA.selectedIndex].text+"</b> ya fueron cargadas<h3><br>Puede editar la nota de un alumno haciendo clic en el boton <b>Editar</b>");
                }
            });
    
            if (input.value == ""){
                nulos++;
            }else if(input.value<1 || input.value > 10){
                mensaje_error.innerHTML = "La calificacion debe ser entre 1 y 10";
                notas_erroneas++;
            }else{
                mensaje_error.innerHTML = "";
            }
            notas.push(calificacion);
        }
    
        if(notas_erroneas == 0){
            if(nulos > 0){
                await Swal.fire({ title: "Hay "+nulos+" estudiantes sin calificar", text: "Si continúa podrá editarlo luego", icon: "info", showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", confirmButtonText: "Guardar", cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                    mandarNotasBBDD(notas);
                      fireDatosGuardados();
                      cerrarIngresarNotas();
                    }
                });
    
            }else{
                await mandarNotasBBDD(notas);
                fireDatosGuardados()
                cerrarIngresarNotas();
            }
            buscarRegistro();
        }

        return 1;
    } catch (error) {
        await operacion_con_error(error.message, OVERLAY_MAIN_BODY);
        OVERLAY_MAIN_BODY.style.display = "block";
    }
}

async function mandarNotasBBDD(notas){
    const notas_para_enviar = JSON.stringify(notas);
    try{
        await fetchViaPost(GUARDAR_CALIFICACIONES, {"notas": notas_para_enviar});
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "Hubo un error al guardar las calificaciones",
            icon: "error",
            timer: 2500,
            showConfirmButton: false
        });
        console.log(error.message);
    }
}

async function editarCalificacionDeAlumno(alumno){
    const datos_del_alumno = await fetchViaPost(OBTENER_CALIFICACIONES_DE_ALUMNO, {"id_matricula":alumno.id_matricula, "id_curso":id_curso_global});
    let html_inputs = "<table class='editor_notas' id='editor_notas'>";
    let 
    calificaciones_actualizadas = [],
    notas_vacias = 0;
    notas_erroneas = 0;
    if(datos_del_alumno){
        await datos_del_alumno[0].forEach(tipo_de_calificacion_ingresada=>{
            switch(tipo_de_calificacion_ingresada.tipo){
                case "p1":
                    /////////primer prueba que agregue al string cada uno de los inputs cada vez.
                    html_inputs += "<tr><td> 1er Parcial: </td> <td> <input type='number' class='swal2-input' id='swal_p1'> </td><tr>";
                    break;
                case "rp1":
                    html_inputs += "<tr><td> Recup. 1er Parcial: </td> <td> <input type='number' class='swal2-input' id='swal_rp1'> </td><tr>";
                    break;
                case "p2":
                    html_inputs += "<tr><td> 2do Parcial: </td> <td> <input type='number' class='swal2-input' id='swal_p2'> </td><tr>";
                    break;
                case "rp2":
                    html_inputs += "<tr><td> Recup. 2do Parcial: </td> <td> <input type='number' class='swal2-input' id='swal_rp2'> </td><tr>";
                    break;
                case "tf":
                    html_inputs += "<tr><td> Trabajo Final </td> <td> <input type='number' class='swal2-input' id='swal_tf'> </td><tr>";
                    break;
                case "tp1":
                    html_inputs += "<tr><td> T.P. 1 </td> <td> <input type='number' class='swal2-input' id='swal_tp1'> </td><tr>";
                    break;
                case "tp2":
                    html_inputs += "<tr><td> T.P. 2 </td> <td> <input type='number' class='swal2-input' id='swal_tp2'> </td><tr>";
                    break;
                case "tp3":
                    html_inputs += "<tr><td> T.P. 3 </td> <td> <input type='number' class='swal2-input' id='swal_tp3'> </td><tr>";
                    break;
                case "tp4":
                    html_inputs += "<tr><td> T.P. 4 </td> <td> <input type='number' class='swal2-input' id='swal_tp4'> </td><tr>";
                    break;
                case "tp5":
                    html_inputs += "<tr><td> T.P. 5 </td> <td> <input type='number' class='swal2-input' id='swal_tp5'> </td><tr>";
                    break;
            }
        });
        html_inputs += "</table>";
        
        const notas_editadas = await Swal.fire({
            html: "<h3>Está editando las notas de <br><span>"+alumno.nombre+" "+alumno.apellido+"</span></h3><br>"+html_inputs,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            backdrop: false,
            didOpen: async () => {
                OVERLAY_MAIN_BODY.style.display = 'block';
                await datos_del_alumno[1].forEach(nota_del_alumno=>{
                    let nota_input = document.getElementById("swal_"+nota_del_alumno.tipo);
                    nota_input.value = nota_del_alumno.nota;
                });
            },
            preConfirm: async ()=>{
                await datos_del_alumno[0].forEach(tipo_de_calificacion_ingresada=>{
                    let nota_ingresada = document.getElementById("swal_"+tipo_de_calificacion_ingresada.tipo).value;
                    if(nota_ingresada === ""){
                        notas_vacias++;
                    }else if(nota_ingresada > 10){
                        notas_erroneas++;
                    }else if(nota_ingresada < 1){
                        notas_erroneas++;
                    }else{
                        calificaciones_actualizadas.push({tipo: tipo_de_calificacion_ingresada.tipo, nota: nota_ingresada});
                    }
                });
            },
            willClose: async () => {
                OVERLAY_MAIN_BODY.style.display = 'none';
            }
        });

        if(notas_editadas.isConfirmed){
            if(notas_erroneas>0){
                await operacion_con_error("Solo pueden ingresarse notas con valor entre 1 y 10", OVERLAY_MAIN_BODY);
                editarCalificacionDeAlumno(alumno);
            }else{
                const confirmar_cambios = await Swal.fire({
                    title:"Seguro desea guardar estos datos?",
                    html: html_inputs, showCancelButton: true, confirmButtonColor: "#3085d6", icon:"question", cancelButtonColor: "#d33", confirmButtonText: "Confirmar", cancelButtonText: "Volver", allowOutsideClick: false, backdrop: false,
                    didOpen: async () => {
                        OVERLAY_MAIN_BODY.style.display = 'block';
                        const inputs = document.querySelectorAll("#editor_notas input");
                        inputs.forEach( input => {
                            input.readOnly = true;
                        });
                        calificaciones_actualizadas.forEach(calificacion=>{
                            let nota_input = document.getElementById("swal_"+calificacion.tipo);
                            nota_input.value = calificacion.nota;
                        });
                    },
                    willClose: async () => {
                        OVERLAY_MAIN_BODY.style.display = 'none';
                    }
                });
                
                if(confirmar_cambios.isConfirmed){
    
                    if(notas_vacias>0){
                        await confirmar_accion("Hay notas vacías", "Las notas que se dejaron vacías no se guardarán, el alumno conservará la última nota ingresada.", "info", "Aceptar", OVERLAY_MAIN_BODY); 
                        OVERLAY_MAIN_BODY.style.display = "block";
                    }
                    const notas_para_enviar = JSON.stringify(calificaciones_actualizadas);
                    const alumno_actualizado = await fetchViaPost(ACTUALIZAR_CALIFICACIONES, {"id_matricula":alumno.id_matricula, "calificaciones":notas_para_enviar});
    
                    if(alumno_actualizado){
                        operacion_exitosa("Datos actualizados!", OVERLAY_MAIN_BODY);
                        buscarRegistro();
                    }else{
                        operacion_con_error("<b>No se pudieron actualizar los datos del alumno.</b><br>Reintente más tarde o comuníquese con el administrador.", OVERLAY_MAIN_BODY);
                    }
                        
                }else{
                    editarCalificacionDeAlumno(alumno);
                }
            }
        } 
    }

}

async function editarAlumno(alumno){
    let nombre, apellido, natalicio, email;

    const
    mensaje_alerta = "<h2>Editar alumno </h2><br>",
    inputNombre = "<br> Nombre: <input type='text' class='swal2-input' id='swal_nombre' value ='"+alumno.nombre+"'>",
    inputApellido = "<br> Apellido: <input type='text' class='swal2-input' id='swal_apellido' value ='"+alumno.apellido+"'>",
    inputEmail = "<br> Email: <input type='email' class='swal2-input' id='swal_email' value='"+alumno.email+"'>",
    inputNatalicio = "<br>  Natalicio: <input type='date' id='swal_natalicio' class='swal2-input'  value ='"+alumno.natalicio+"'>",
    inputDni = "<br> DNI: <input type='number' readonly value ='"+alumno.dni+"' class='swal2-input' title='Este campo no es modificable'> ";

    const html_inputs = inputDni + inputNombre + inputApellido + inputEmail + inputNatalicio;

    const resultado = await Swal.fire({
        html: mensaje_alerta + html_inputs,
        confirmButtonColor: "#0a6c15",cancelButtonColor: "#d33",showCancelButton: true,confirmButtonText: "Guardar",cancelButtonText: "Cancelar",showLoaderOnConfirm: true,allowOutsideClick:false,focusConfirm: false,backdrop: false,
        didOpen: () => {
            OVERLAY_MAIN_BODY.style.display = 'block';
        },
        willClose: () => {
            OVERLAY_MAIN_BODY.style.display = 'none';
        },
        preConfirm: async () => {
            try {
                natalicio = document.getElementById("swal_natalicio").value;
                nombre = document.getElementById("swal_nombre").value;
                apellido = document.getElementById("swal_apellido").value;
                email = document.getElementById("swal_email").value;
                const entradas_ok = await validarInputsRegistro(nombre, apellido, email, natalicio);
                return entradas_ok;
            } catch (error) { 
                Swal.showValidationMessage('Hubo un error al registrar el alumno. Comuníquese con el administrador.');
            }
        }
    });


}