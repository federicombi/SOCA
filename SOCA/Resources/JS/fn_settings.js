const 
SELECT_JURISDICCION = document.getElementById("select_jurisdiccion"),
SELECT_LOCALIDAD = document.getElementById("select_localidad"),
SELECT_CARRERA = document.getElementById("select_carrera"),
SELECT_MATERIA = document.getElementById("select_materia"),
boton_add_division = document.getElementById("boton_add_division"),
HORARIOS_BODY = document.getElementById("horarios_body"),
BOTON_REGISTRAR_ALUMNO = document.getElementById("boton_registrar_alumno"),
CARGAR_JURISDICCIONES = "../../Settings/obtener_jurisdicciones.php",
CARGAR_LOCALIDADES = "../../Settings/obtener_localidades.php",
CARGAR_INSTITUCIONES_DE_LOCALIDAD = "../../Settings/obtener_instituciones.php",
CARGAR_CARRERAS_DE_INSTI = "../../Settings/obtener_carreras.php",
CARGAR_MATERIAS_DE_CARRERA = "../../Settings/obtener_materias.php",
BUSCAR_CURSO = "../../Settings/buscar_curso.php",
CREAR_CURSO = "../../Settings/crear_curso.php",
CARGAR_HORARIOS = "../../Settings/cargar_horarios.php",
GUARDAR_HORARIO = "../../Settings/guardar_horario.php",
ELIMINAR_HORARIO = "../../Settings/eliminar_horario.php",
DESMATRICULAR_ALUMNO = "../../Settings/desmatricular_alumno.php",
BUSCAR_ALUMNO = "../../Settings/buscar_alumno.php",
MATRICULAR_ALUMNO = "../../Settings/matricular_alumno.php",
BUSCAR_PERSONA = "../../Settings/buscar_persona.php",
REGISTRAR_ALUMNO = "../../Settings/registrar_alumno.php",
ACTUALIZAR_ALUMNO = "../../Settings/actualizar_alumno.php",
UN_ANIO_EN_MS = 360 * 24 * 60 * 60 * 1000;

let id_curso_global = 0;

window.onload = cargarInicio();

async function cargarInicio(){
    try{
        agregarEventosHeader();
        await cargarJurisdicciones();
        SELECT_JURISDICCION.addEventListener("change", ()=>{evento_cambio_jurisdiccion(SELECT_JURISDICCION.value)});
        await agregarEventos();
        addEmpty(HORARIOS_BODY, "empty_horarios","b", "<h4>Seleccione una materia<br></h4>");
        addEmpty(CLASSROOM,"empty_classroom", "b", "<h4>Seleccione una materia<br></h4>");
    }catch(error){
        lanzar_error_bye("Hubo un error al cargar las configuraciones.", OVERLAY_MAIN_BODY);
    };
}

async function agregarEventos(){
    try {
        SELECT_LOCALIDAD.addEventListener("change", ()=>{evento_cambio_localidad(SELECT_LOCALIDAD.value)});
        SELECT_INSTITUCION.addEventListener("change", ()=>{evento_cambio_institucion(SELECT_INSTITUCION.value)});
        SELECT_CARRERA.addEventListener("change", ()=>{evento_cambio_carrera(SELECT_CARRERA.value)});
        SELECT_MATERIA.addEventListener("change", evento_cambio_materia)
        return 1;  
    } catch (error) {
        throw error;
    }
}

async function cargarJurisdicciones(){
    try{
        let jurisdicciones = await obtenerDatos(CARGAR_JURISDICCIONES);
        jurisdicciones.forEach(provincia =>{
            agregarOpcionASelect(SELECT_JURISDICCION, provincia.id_jurisdiccion, provincia.nombre);
        });
        SELECT_JURISDICCION.disabled = false;
        return 1;
    } catch(error){
        throw error;
    }
}


/////////////////////eventos de los selectores:
async function evento_cambio_jurisdiccion(id_jurisdiccion){
    try {
        const ciudades = await fetchViaPost(CARGAR_LOCALIDADES, {"id_jurisdiccion":id_jurisdiccion});
        vaciarSelect(SELECT_LOCALIDAD, "Seleccionar localidad");
        SELECT_LOCALIDAD.disabled = true;
        ciudades.forEach(city=>{
            agregarOpcionASelect(SELECT_LOCALIDAD, city.id_localidad, city.nombre);
        });
        SELECT_LOCALIDAD.disabled = false;
        deshabilitarElemento("boton_cargar_datos", true);
        deshabilitarElemento("select_carrera", true);
        deshabilitarElemento("select_materia", true); 
        deshabilitarElemento("select_institucion", true); 
        return 1;
    } catch (error) {
        lanzar_error_bye("Error al obtener las localidades", OVERLAY_MAIN_BODY);
    }
}
async function evento_cambio_localidad(id_localidad){
    try {
        const instituciones = await fetchViaPost(CARGAR_INSTITUCIONES_DE_LOCALIDAD, {"id_localidad":id_localidad});
        vaciarSelect(SELECT_INSTITUCION, "Seleccionar institucion");
        SELECT_INSTITUCION.disabled = true;
        instituciones.forEach(escuela=>{
            agregarOpcionASelect(SELECT_INSTITUCION, escuela.cue, escuela.nombre);
        });
        SELECT_INSTITUCION.disabled = false;
        deshabilitarElemento("boton_cargar_datos", true);
        deshabilitarElemento("select_carrera", true);
        deshabilitarElemento("select_materia", true);
        return 1;
    } catch (error) {
        lanzar_error_bye("Error al obtener las instituciones", OVERLAY_MAIN_BODY);
    }
}
async function evento_cambio_institucion(cue){
    try {
        const datos = await fetchViaPost(CARGAR_CARRERAS_DE_INSTI, {"cue":cue});
        vaciarSelect(SELECT_CARRERA, "Seleccionar carrera");
        SELECT_CARRERA.disabled = true;
        datos.forEach(carrera=>{
            agregarOpcionASelect(SELECT_CARRERA, carrera.id_carrera, carrera.nombre);
        });
        SELECT_CARRERA.disabled = false;
        deshabilitarElemento("boton_cargar_datos", true);
        deshabilitarElemento("select_materia", true);
        return 1;
    } catch (error) {
        lanzar_error_bye("Error al cargar las carreras", OVERLAY_MAIN_BODY);
    }  
}
async function evento_cambio_carrera(id_carrera){
    try {
        const datos = await fetchViaPost(CARGAR_MATERIAS_DE_CARRERA, {"id_carrera":id_carrera});
        vaciarSelect(SELECT_MATERIA, "Seleccionar materia");
        SELECT_MATERIA.disabled = true;
        datos.forEach(materia=>{
            agregarOpcionASelect(SELECT_MATERIA, materia.id_materia, materia.nombre);
        });
        SELECT_MATERIA.disabled = false;
        deshabilitarElemento("boton_cargar_datos", true);
        return 1;
    } catch (error) {
        lanzar_error_bye("Error al cargar las materias", OVERLAY_MAIN_BODY);
    }
}
function evento_cambio_materia(){
    deshabilitarElemento("boton_cargar_datos", false);
}


////////////// buscar los datos y configuraciones de un curso:

async function mostrarBienvenida(id_curso){
    try {
        const datos_del_curso = await fetchViaPost(CARGAR_BIENVENIDA, {"id_curso": id_curso}),
        division = definirDivision(datos_del_curso.division);
        ELEMENTO_BIENVENIDA.innerHTML = "<h2>Configuraciones para la materia <span id='materia'>"+datos_del_curso.materia+"</span>"+division+"</h2><h2>"+datos_del_curso.carrera+" - "+datos_del_curso.institucion+"</h2>";    
        boton_add_division.hidden = false;
        return 1;
    } catch (error) {
        throw error;
    }
}

async function cargarCurso(){
    try {
        let curso = await buscarCurso();
        if(curso){
            const horarios = await cargarHorarios(curso.id_curso);
        
            if(horarios[0] === undefined){
                addEmpty(HORARIOS_BODY, "empty_horarios", "e", "<h3>No hay horarios cargados para esta materia.<br></h3><h4>Puede guardar los horarios para cargar automáticamente el curso al iniciar sesión</h4>");
                addButton(document.getElementById("empty_horarios"), "Agregar horario", ()=>{guardarHorario(curso.id_curso)});
            };

            cargarAlumnos(curso.id_curso);
        }
        return 1;
    } catch (error) {
        lanzar_error_bye("Error al obtener los datos de la materia", OVERLAY_MAIN_BODY);
    }
}
async function buscarCurso(){
    try {
        const id_materia = SELECT_MATERIA.value;
        const cursos_encontrados = await fetchViaPost(BUSCAR_CURSO, {"id_materia":id_materia});
        let curso_seleccionado;
        if(cursos_encontrados.length === 0){
            crearCurso("Quieres crear el curso?", 'No tienes cursos de '+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+' registrados este año. <br><br><b style="color:red;">Esta operación no es cancelable<br>Una vez creado, no podra borrar el curso.</b>');
            return;
        } else if(cursos_encontrados.length > 1){
            curso_seleccionado = cursos_encontrados[0];
            let divisiones = {};
            cursos_encontrados.forEach(curso=>{
                if(curso.division){
                    divisiones[curso.division] = curso.division;
                }else{
                    divisiones[""] = "Division Original"
                }
                 
            });
            await Swal.fire({allowOutsideClick:false,backdrop: false,title: "Selecciona una division:",text:"Selecciona la division que deseas configurar",input: "select",inputOptions: divisiones,inputPlaceholder: "Seleccione una división...",showCancelButton: true,
                preConfirm: async (value) => {
                    try{
                        await cursos_encontrados.forEach(curso =>{
                            if(curso.division === value){
                                curso_seleccionado = curso;
                                mostrarBienvenida(curso.id_curso);
                                id_curso_global = curso.id_curso;
                            }else if (!curso.division){
                                curso_seleccionado = curso;
                                mostrarBienvenida(curso.id_curso);
                                id_curso_global = curso.id_curso;
                            }
                        });
                    }catch(error){
                        console.log(error);
                    }
                    
                },
                didOpen: () => {OVERLAY_MAIN_BODY.style.display = 'block';},
                willClose: () => {OVERLAY_MAIN_BODY.style.display = 'none';}
            });
            return curso_seleccionado;
        } else{
            curso_seleccionado = cursos_encontrados[0];
            mostrarBienvenida(curso_seleccionado.id_curso);
            id_curso_global = curso_seleccionado.id_curso;
            return curso_seleccionado;
        }
    } catch (error) {
        throw error;
    }    
}
async function cargarHorarios(id_curso){
    try {
        HORARIOS_BODY.innerHTML = "";
        const horarios = await fetchViaPost(CARGAR_HORARIOS,{"id_curso" : id_curso});
        if(horarios.length > 0){
            addButton(HORARIOS_BODY, "Agregar horario", ()=>{guardarHorario(id_curso)});
            horarios.forEach(hora =>{
                addHorario(hora);
            });
        }else{
            addEmpty(HORARIOS_BODY, "empty_horarios", "e", "<h3>No hay horarios cargados para "+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+"<br></h3><h4>Puede guardar los horarios para cargar automáticamente el curso al iniciar sesión</h4>");
            addButton(document.getElementById("empty_horarios"), "Agregar horario", ()=>{guardarHorario(curso.id_curso)});
        }
        return horarios;
    } catch (error) {
        throw new Error("Error al cargar los horarios");
    }

}
async function addHorario(horario){
    try {
        const div = document.createElement("div");
        div.classList.add('horario_container');
        div.id = horario.id_horario;
        const 
        id_eliminador = "delete"+horario.id_horario;
        let dia_para_mostrar = "";
        switch (horario.dia_de_semana){
            case 0:
                dia_para_mostrar = "Domingo";
                break;
            case 1:
                dia_para_mostrar = "Lunes";
                break;
            case 2:
                dia_para_mostrar = "Martes";
                break;
            case 3:
                dia_para_mostrar = "Miércoles";
                break;
            case 4:
                dia_para_mostrar = "Jueves";
                break;
            case 5:
                dia_para_mostrar = "Viernes";
                break;
            case 6:
                dia_para_mostrar = "Sábado";
                break;
        }
        div.innerHTML = "<table class='horario'><tr> <td class='horario_dia_semana'>"+dia_para_mostrar+"</td><td class='horario_horario'> "+horario.hora_inicio+"  a  "+horario.hora_fin+"</td> <td class='celda_eliminador'><button id='"+id_eliminador+"' class='eliminador'>Eliminar</button></td></tr><tr></table>"
        HORARIOS_BODY.appendChild(div);
        document.getElementById(id_eliminador).addEventListener("click", ()=>{borrarHorario(horario.id_horario)});
        return 1;
    } catch (error) {
        throw new Error("Error al agregar horario");
    }

}
async function borrarHorario(id_horario){
    try {
        const borrado = await borrarRegistro(ELIMINAR_HORARIO, "Eliminar horario?", "ELIMINAR", {"id_horario":id_horario}, "Horario eliminado", "El horario no se pudo eliminar", "El horario no se pudo eliminar")
        if(borrado){
            cargarHorarios(id_curso_global);
        }
        return 1;
    } catch (error) {
        throw new Error("Error al borrar el horario");
    }
}

async function cargarAlumnos(id_curso){
    try {
        CLASSROOM.innerHTML = "";
        const alumnos = await fetchViaPost(CARGAR_ALUMNOS, {"id_curso": id_curso});
        if(alumnos.length > 0){
            alumnos.forEach(alumno =>{
                addAlumno(alumno);
            });
        }else{
            addEmpty(document.getElementById("classroom"), "empty_classroom", "eb", "<h3>No hay alumnos matriculados en esta materia</h3><br><br>");
        }
        BOTON_REGISTRAR_ALUMNO.hidden = false;
        return 1;
    } catch (error) {
        throw new Error("Error al cargar los alumnos");
    }

}
async function addAlumno(alumno){
    try {
        const div = document.createElement("div");
        div.classList.add('alumno_container');

        const nombre_completo = alumno.apellido+" "+alumno.nombre,
        id_eliminador = "borrar_alumno_"+alumno.id_alumno,
        id_editor = "editar_alumno_"+alumno.id_alumno;

        div.innerHTML = "<table><tr> <td class='nombre_alumno'>"+nombre_completo+"</td><td class='celda_editor'><button id='"+id_editor+"' class='editor'>Editar</button></td> <td class='celda_eliminador'><button id='"+id_eliminador+"' class='eliminador'>Quitar</button></td> <tr></table>"
        CLASSROOM.appendChild(div);
        document.getElementById(id_eliminador).addEventListener("click", ()=>{desmatricular_alumno(alumno.id_matricula)});
        document.getElementById(id_editor).addEventListener("click", ()=>{editarAlumno(alumno)});
        return 1;
    } catch (error) {
        throw new Error("Error al agregar alumne");
    }

}

async function desmatricular_alumno(id_matricula){
    const mensaje_operacion_incompleta = "<b> Error al desmatricular alumno </b>,<br> Reintente más tarde o comuníquese con el administrador.";
    try {
        const registro_borrado = await borrarRegistro(DESMATRICULAR_ALUMNO, "Desmatricular alumno?", "CONFIRMAR", {"id_matricula":id_matricula}, "Alumno desmatriculado", mensaje_operacion_incompleta, "El alumno no se puede eliminar porque tiene asistencias o calificaciones ingresadas");
        if(registro_borrado){
            cargarAlumnos(id_curso_global);
        }
        return 1;
    } catch (error) {
        operacion_con_error(mensaje_operacion_incompleta, OVERLAY_MAIN_BODY);
    }

}







////////////////////////////// controlador
function template(){
    try {

        return 1;
    } catch (error) {
        throw error;
        lanzar_error_bye("Error al obtener las localidades", OVERLAY_MAIN_BODY);
        throw new Error("Mensaje");
    }
}
////////////////////////////// funciones independientes ponele

async function borrarRegistro(ENLACE, titulo_alerta, titulo_boton_confirmar,  objeto_para_enviar,mensaje_exito, mensaje_error, mensaje_error_bbdd){
    try {
        const eliminar_seguro = await confirmar_accion(titulo_alerta, "No podrás revertir esta acción", "warning", titulo_boton_confirmar, OVERLAY_MAIN_BODY);
        if (eliminar_seguro.isConfirmed) {
            const eliminado = await fetchViaPost(ENLACE, objeto_para_enviar);
            if(eliminado){
                operacion_exitosa(mensaje_exito, OVERLAY_MAIN_BODY);
                return true
            }else{
                operacion_con_error( mensaje_error, OVERLAY_MAIN_BODY);
                return false
            }
        }
        return 1;
    } catch (error) {
        operacion_con_error( mensaje_error_bbdd, OVERLAY_MAIN_BODY);
    }
}
async function no_es_por_ahi(mensaje, overlay, cerrar_overlay){
    const resultado = await Swal.fire({
        text: mensaje, icon: "error", allowOutsideClick:false, backdrop: false, confirmButtonColor: "#3085d6",
        didOpen: () => {
            overlay.style.display = 'block';
        },
        willClose: () => {
            if(cerrar_overlay){
                overlay.style.display = 'none';
            }
        }
    });
    return resultado.isConfirmed;
}

async function guardarHorario(id_curso){
    try {
        let 
        horas_del_horario = [], 
        dia_de_semana;
    
        await Swal.fire({allowOutsideClick:false,backdrop: false, title: "Agregar horario", icon: "info", showCancelButton: true, confirmButtonColor: "#0a6c15", cancelButtonColor: "#d33", confirmButtonText: "AGREGAR", cancelButtonText: "CANCELAR",
            input: "range",inputLabel: "N° de Módulos",inputValue: 1,
            inputAttributes: {min: "1",max: "9",step: "1"},
            html: 'Día de la semana: <select id="swal_dia_de_semana" class="swal_select"><option value="1">Lunes</option><option value="2">Martes</option><option value="3">Miércoles</option><option value="4">Jueves</option><option value="5">Viernes</option><option value="6">Sábado</option><option value="0">Domingo</option></select> Hora de entrada: <input type="time" id="swal_hora_inicio" class="swal2-input"><br> Hora de salida: <input type="time" id="swal_hora_fin" class="swal2-input"></input> <br>',
            preConfirm: () => {
                horas_del_horario = [document.getElementById("swal_hora_inicio").value , document.getElementById("swal_hora_fin").value];
                dia_de_semana = document.getElementById("swal_dia_de_semana").value;
            },
            didOpen: () => {OVERLAY_MAIN_BODY.style.display = 'block';},
            willClose: () => {OVERLAY_MAIN_BODY.style.display = 'none';}
        }).then(async (result) => {
            if (result.isConfirmed) {
                let 
                datos_incompletos = false;
                horas_del_horario.forEach(hora =>{
                    if (hora === ""){
                        datos_incompletos = true;
                    }
                });
    
                const
                modulos = result.value,
                hora_inicio = horas_del_horario[0],
                hora_fin = horas_del_horario[1];
                const [horas_hora_inicio, minutos_hora_inicio] = hora_inicio.split(":").map(Number);
                const [horas_hora_fin, minutos_hora_fin] = hora_fin.split(":").map(Number);
                
                if(datos_incompletos){
                    const entendido = await no_es_por_ahi("Debe completar las horas de entrada y de salida", OVERLAY_MAIN_BODY, true);
                    if(entendido){
                        guardarHorario(id_curso);
                    }
                    return entendido;
                }else{
                    if(horas_hora_inicio > horas_hora_fin){
                        const entendido = await no_es_por_ahi("La hora de salida debe ser mayor a la hora de entrada", OVERLAY_MAIN_BODY, true);
                        if(entendido){
                            guardarHorario(id_curso);
                        }
                        return entendido;
                    } else if ( horas_hora_inicio === horas_hora_fin){
                        if(minutos_hora_inicio >= minutos_hora_fin){
                            const entendido = await no_es_por_ahi("La hora de salida debe ser mayor a la hora de entrada", OVERLAY_MAIN_BODY, true);
                            if(entendido){
                                guardarHorario(id_curso);
                            }
                            return entendido;
                        }
                    } else{
                        const horario_guardado = await fetchViaPost(GUARDAR_HORARIO, {"id_curso":id_curso, "dia_de_semana":dia_de_semana, "hora_inicio":hora_inicio, "hora_fin":hora_fin, "modulos":modulos});
                        if(horario_guardado === "interrumpe"){
                            const entendido = await no_es_por_ahi("El horario ingresado coincide con otro horario. <br> Por favor verífiquelo.", OVERLAY_MAIN_BODY, true);
                            if(entendido){
                                guardarHorario(id_curso);
                            }
                            return entendido;
                        }else if(horario_guardado){
                            operacion_exitosa("Horario guardado!", OVERLAY_MAIN_BODY);
                            cargarHorarios(id_curso);
                            return horario_guardado;
                        }else {
                           operacion_con_error("No se pudo guardar el horario.<br>Reintente más tarde o comuníquese con el administrador.", OVERLAY_MAIN_BODY);
                           return horario_guardado;
                        }
    
                    }
    
                }
            }
        });
        return 1;
    } catch (error) {
        throw new Error("Error al guardar horario");
    }

}
async function crearCurso(titulo, mensaje){
    try {
        let 
        fechas_del_curso = [],
        division = "",
        id_materia = SELECT_MATERIA.value;
        const este_anio = new Date().getFullYear();
        
        const result = await Swal.fire({allowOutsideClick:false,backdrop: false, title: titulo, icon: "info", showCancelButton: true, confirmButtonColor: "#0a6c15", cancelButtonColor: "#d33", confirmButtonText: "CREAR", cancelButtonText: "CANCELAR",
            html: mensaje+' <br> Fecha de inicio: <input type="date" id="swal_fecha_inicio" class="swal2-input" value="'+este_anio+'-03-01"><br> Fecha de cierre: <input type="date" id="swal_fecha_fin" class="swal2-input"value="'+este_anio+'-11-01"></input> <br><br> Division: <select id="swal_division" class="swal_select"><option value="NA" selected>No aplica</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option></select>',
            preConfirm: () => {
                fechas_del_curso = [document.getElementById("swal_fecha_inicio").value , document.getElementById("swal_fecha_fin").value];
                division = document.getElementById("swal_division").value;
            },
            didOpen: () => {
                OVERLAY_MAIN_BODY.style.display = 'block';
            },
            willClose: () => {
                OVERLAY_MAIN_BODY.style.display = 'none';
            }
        });

        let 
        fecha_inicio = new Date(fechas_del_curso[0]),
        fecha_fin = new Date(fechas_del_curso[1]);
        const diferencia = fecha_fin.getTime() - fecha_inicio.getTime();

        if(diferencia >= UN_ANIO_EN_MS){
            Swal.fire({ text: "Solo puede matricularse por un año", icon: "error", allowOutsideClick:false, backdrop: false, confirmButtonColor: "#3085d6",
                didOpen: () => {
                    OVERLAY_MAIN_BODY.style.display = 'block';
                },
                willClose: () => {
                    crearCurso("Quieres crear el curso?", 'No tienes cursos de '+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+' registrados este año. <br><br><b style="color:red;">Esta operación no es cancelable<br>Una vez creado, no podra borrar el curso.</b>');
                }
            });
            return;
        }
        if(fecha_inicio >= fecha_fin){
            Swal.fire({ text: "La fecha de cierre no puede ser antes que la fecha de inicio", icon: "error", allowOutsideClick:false, backdrop: false, confirmButtonColor: "#3085d6",
                didOpen: () => {
                    OVERLAY_MAIN_BODY.style.display = 'block';
                },
                willClose: () => {
                    crearCurso("Quieres crear el curso?", 'No tienes cursos de '+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+' registrados este año. <br><br><b style="color:red;">Esta operación no es cancelable<br>Una vez creado, no podra borrar el curso.</b>');
                }
            });
            return;
        }else{
            if (result.isConfirmed) {
                const curso_creado = await fetchViaPost(CREAR_CURSO, {"id_materia":id_materia, "fecha_inicio": fechas_del_curso[0], "fecha_fin":fechas_del_curso[1], "division":division}); 
                if(curso_creado){
                    operacion_exitosa("Curso creado", OVERLAY_MAIN_BODY);
                    cargarCurso();
                }else{
                    operacion_con_error("No se pudo crear el curso <br> Verifique los datos ingresados, reintente más tarde o comuníquese con el administrador.", OVERLAY_MAIN_BODY);
                }
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el curso");
    }

}
async function addDivision() {
    /////////////// HACER QUE VAYA A OTRO LADO AGREGAR DIVISION PARA QUE CONVIERTA LA NULL A LETRA.
    try {
        await crearCurso("Quieres agregar una division?", '<br>Se agregará una division para '+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+'<br><br><b style="color:red;">Esta operación no es cancelable<br>Una vez creada, no podra borrar la división.</b>');
        return 1;
    } catch (error) {
        throw error;
    }
}
async function buscarAlumno(){
    try {
        let alumno;
        ///////                           PIDE INGRESAR EL DNI DEL ALUMNO   
        const resultado_ingresar_dni = await Swal.fire({title: "Ingrese el DNI del alumno",input: "number",confirmButtonColor: "#3085d6",cancelButtonColor: "#d33",showCancelButton: true,confirmButtonText: "Buscar",cancelButtonText: "Cancelar",showLoaderOnConfirm: true,allowOutsideClick:false,focusConfirm: false,backdrop: false,
            didOpen: () => {
                OVERLAY_MAIN_BODY.style.display = 'block';
            },
            willClose: () => {
                OVERLAY_MAIN_BODY.style.display = 'none';
            },
            preConfirm: async (value) => {
              try {
                if(value<1000000){     
                    Swal.showValidationMessage('Ingrese un DNI válido'); 
                }else if(value>99999999){
                    Swal.showValidationMessage('Ingrese un DNI válido'); 
                }
              } catch (error) {
                Swal.showValidationMessage('Error: ${error}');
              }
            }
        });
    
        if(resultado_ingresar_dni.isConfirmed){
            const dni = resultado_ingresar_dni.value;
            const datos = await fetchViaPost(BUSCAR_ALUMNO,{"dni":dni});
            alumno = datos[0];
    
            if(alumno){
                let nombre_completo = alumno.nombre+" "+alumno.apellido
                const si_matricular = await Swal.fire({
                    html:"Estudiante encontrado: <br><br> <h2>"+nombre_completo+"</h2> <br> Desea matricularlo en <b>"+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+"</b>?",
                    showCancelButton: true, confirmButtonColor: "#3085d6",cancelButtonColor: "#d33",confirmButtonText: "Matricular",cancelButtonText: "Cancelar",
                    allowOutsideClick:false,backdrop: false,
                    didOpen: () => {OVERLAY_MAIN_BODY.style.display = 'block';},
                    willClose: () => {OVERLAY_MAIN_BODY.style.display = 'none';}
                });
                if (si_matricular.isConfirmed) {
                    matricularAlumno(alumno);
                };
                

            }else{
                registrarAlumno(dni);
            }
        }
    } catch (error) {
        throw new Error("Error al recuperar datos de alumnos");
    }

}

async function matricularAlumno(alumno){
    const matriculado = await fetchViaPost(MATRICULAR_ALUMNO, {"id_alumno":alumno.id_alumno, "id_curso":id_curso_global});
    if(matriculado){
        operacion_exitosa("Alumno Matriculado!", OVERLAY_MAIN_BODY);
        cargarAlumnos(id_curso_global);
    }else{
        operacion_con_error("No se pudo matricular el alumno", OVERLAY_MAIN_BODY);
    }
}

async function registrarAlumno(dni){

    const 
    persona = await fetchViaPost(BUSCAR_PERSONA, {"dni":dni}),
    inputNatalicio = "<br>  Natalicio: <input type='date' id='swal_natalicio' class='swal2-input'> ",
    inputDni = "<br> DNI: <input type='number' readonly value ='"+dni+"' class='swal2-input'> ";

    let 
    natalicio, nombre, apellido, email,
    html_inputs = "",
    mensaje_alerta = "<br><b> Alumno no encontrado, desea registrarlo?</b>",
    inputNombre = "<br> Nombre: <input type='text' class='swal2-input' id='swal_nombre'> ",
    inputApellido = "<br> Apellido: <input type='text' class='swal2-input' id='swal_apellido'> ",
    inputEmail = "<br> Email: <input type='email' class='swal2-input' id='swal_email'> ";

    if(persona[0]){
        let nombre = persona[0].nombre, apellido = persona[0].apellido, email = persona[0].email;
        mensaje_alerta = "<br><b>Se encontraron los datos de la persona pero no está registrado como alumno. <br> Desea registrarlo?</b>"
        inputNombre = "<br> Nombre: <input type='text' class='swal2-input' id='swal_nombre' readonly value ='"+nombre+"' > ",
        inputApellido = "<br> Apellido: <input type='text' class='swal2-input' id='swal_apellido' value ='"+apellido+"' readonly></input> ",
        inputEmail = "<br> Email: <input type='email' class='swal2-input' id='swal_email' value='"+email+"' readonly></input> ";
    }else{
        persona[0] = 0;
    }
    
    html_inputs = inputDni + inputNombre + inputApellido + inputEmail + inputNatalicio;

    const resultado = await Swal.fire({
        html: "<h2>Registrar alumno</h2>" + mensaje_alerta + html_inputs,
        confirmButtonColor: "#0a6c15",cancelButtonColor: "#d33",showCancelButton: true,confirmButtonText: "Registrar",cancelButtonText: "Cancelar",showLoaderOnConfirm: true,allowOutsideClick:false,focusConfirm: false,backdrop: false,
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
                validarInputTextoSwal(nombre, "nombre");
                validarInputTextoSwal(apellido, "apellido");
                if (email == ""){
                    Swal.showValidationMessage('Ingrese el correo electrónico'); 
                }else{
                    if(!email_ok(email)){
                        Swal.showValidationMessage('Ingrese un correo electrónico válido'); 
                    }
                }
                if (natalicio == ""){
                    Swal.showValidationMessage('Ingrese una fecha de nacimiento'); 
                }else{
                    fecha_nacimiento = new Date(natalicio);
                    const hoy = new Date();
                    const fecha_minima = new Date("1924-01-01");
        
                    if(fecha_nacimiento > hoy){     
                        Swal.showValidationMessage('Ingrese una fecha de nacimiento válida.'); 
                    }else if(fecha_nacimiento < fecha_minima){
                        Swal.showValidationMessage('Ingrese una fecha de nacimiento válida.'); 
                    }
                }
                return true;
            } catch (error) {
                Swal.showValidationMessage('Hubo un error al registrar el alumno. Comuníquese con el administrador.');
            }
        }
    });

    if(resultado.isConfirmed){
        const alumno_registrado = await fetchViaPost(REGISTRAR_ALUMNO, {"dni":dni, "nombre":nombre, "apellido":apellido, "email":email, "natalicio":natalicio, "existe_persona":persona[0]});
        if(alumno_registrado){
            const confirmar_matricula = await confirmar_accion("Alumno registrado", "<b>Desea matricular a "+alumno_registrado[0].nombre+" "+alumno_registrado[0].apellido+" en "+SELECT_MATERIA.options[SELECT_MATERIA.selectedIndex].text+"?</b>", "success", "Matricular", OVERLAY_MAIN_BODY);
            if(confirmar_matricula.isConfirmed){
                matricularAlumno(alumno_registrado[0]);
            }
        }else{
            operacion_con_error("<b>No pudo compeltarse el registro.</b><br>Reintente más tarde o comuníquese con el administrador.");
        }
    }

}

function validarInputTextoSwal(texto, tipoDeInput){
    if (texto == ""){
        Swal.showValidationMessage('Ingrese el '+tipoDeInput+' del alumno '); 
    }else if(!texto_ok(texto)){
        Swal.showValidationMessage('Ingrese un '+tipoDeInput+' válido'); 
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

    if(resultado.isConfirmed){
        let [anio, mes, dia] = natalicio.split("-"),
        fecha_nacimiento = dia+"/"+mes+"/"+anio;
        const confirmar_cambios = await confirmar_accion("Confirmar cambios", "<b>¿Seguro desea guardar los siguientes datos?: </b><br><br>DNI: <b>"+alumno.dni+"</b><br> Nombre: <b>"+nombre+"</b><br> Apellido: <b>"+apellido+" </b><br> Email:  <b>"+email+"</b> <br>Fecha de Nacimiento: <b>"+fecha_nacimiento+"</b>", "question", "Confirmar", OVERLAY_MAIN_BODY);
        if(confirmar_cambios.isConfirmed){
            const alumno_actualizado = await fetchViaPost(ACTUALIZAR_ALUMNO, {"dni":alumno.dni, "nombre":nombre, "apellido":apellido, "email":email, "natalicio":natalicio});
            if(alumno_actualizado){
                operacion_exitosa("Datos actualizados!", OVERLAY_MAIN_BODY);
                cargarAlumnos(id_curso_global);
            }else{
                operacion_con_error("<b>No se pudieron actualizar los datos de la persona.</b><br>Reintente más tarde o comuníquese con el administrador.", OVERLAY_MAIN_BODY);
            }
        }else{
            editarAlumno(alumno);
        }
    }
}

async function validarInputsRegistro(nombre, apellido, email, natalicio){
    try {
        validarInputTextoSwal(nombre, "nombre");
        validarInputTextoSwal(apellido, "apellido");
        if (email == ""){
            Swal.showValidationMessage('Ingrese el correo electrónico');
            return false; 
        }else{
            if(!email_ok(email)){
                Swal.showValidationMessage('Ingrese un correo electrónico válido');
                return false; 
            }
        }
        if (natalicio == ""){
            Swal.showValidationMessage('Ingrese una fecha de nacimiento');
            return false; 
        }else{
            fecha_nacimiento = new Date(natalicio);
            const hoy = new Date();
            const fecha_minima = new Date("1924-01-01");
    
            if(fecha_nacimiento > hoy){     
                Swal.showValidationMessage('Ingrese una fecha de nacimiento válida.');
                return false; 
            }else if(fecha_nacimiento < fecha_minima){
                Swal.showValidationMessage('Ingrese una fecha de nacimiento válida.'); 
                return false;
            }
        }
        return true;
    } catch (error) {
        Swal.showValidationMessage('Hubo un error al registrar el alumno. Comuníquese con el administrador.');
        return false;
    }
    
}