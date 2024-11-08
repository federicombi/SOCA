<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CALIFICACIONES</title>
        <link rel="icon" type="image" href="../Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="../Resources/CSS/style_settings.css">
    </head>
    <body>
        <div class="main_container">
            <div class="main_header">
                <table>
                    <tr>
                        <td style="text-align:left">
                            <img src="../Resources/Images/waldo_hat.png" width="12px" id="waldo">
                            <img src="../Resources/Images/soca_logo_blanco.png" width="150" alt="SOCA logo">
                        </td>
                        <td style="text-align:right">
                            <ol>
                                <li><a id="boton_salir" href="#Salir">
                                    <img src="../Resources/Images/salir.png" alt="SALIR">
                                </a></li>
                                <li><a id="boton_settings" href="#configuracion">
                                    <img src="../Resources/Images/settings.png" alt="CONFIGURACION">
                                </a></li>

                                <li><a id="boton_calificaciones" href="#calificaciones">
                                    <img src="../Resources/Images/grades.png" alt="CALIFICACIONES">
                                </a></li>

                                <li><a id="boton_home" href="#home">
                                    <img src="../Resources/Images/HOME.png" alt="INICIO">
                                </a></li>
                            </ol>
                            
                        </td>
                    </tr>
                </table>
            </div>
            <div class="main_body">
                <div class="overlay" id="overlay_main_body">
                </div>
                <div class="header_settings">
                    <ol>
                        <li id="titulo">
                            <h1>Configuración</h1>
                        </li>
                        <li id="datos_del_curso">
                            <div id="bienvenida" class="bienvenida"> 
                            </div>
                        </li>
                        <li id="add_division">
                            <button id="boton_add_division" hidden onclick="addDivision()">Agregar Division</button>
                        </li>
                    </ol>
                </div>
                <ol class="configuraciones">
                    <li id="selectores">
                            <select id="select_jurisdiccion" disabled>
                                <option selected disabled> Seleccionar provincia... </option>
                            </select>
                            <br>
                            <select id="select_localidad" disabled>
                                <option selected disabled> Seleccionar localidad...</option>
                            </select>
                            <br>
                            <select id="select_institucion" disabled>
                                <option selected disabled> Seleccionar institucion... </option>
                            </select>
                            <br>
                            <select id="select_carrera" disabled>
                                <option selected disabled> Seleccionar carrera...</option>
                            </select>
                            <br>
                            <select id="select_materia" disabled>
                                <option selected disabled> Seleccionar materia...</option>
                            </select>
                            <br>
                            <button id="boton_cargar_datos" disabled onclick="cargarCurso()">Cargar Datos</button>
                    </li>
                    <li id="settings_horarios">
                        <div class="header_configurador" id="horarios_header">
                            <h4 style="color:#fff">HORARIOS</h4>
                        </div>
                        <div class="configurador_horarios" id="horarios_body">
                        </div>
                    </li>
                    <li id="settings_alumnos">
                        <div class="header_configurador" id="alumnos_header">
                            <h4 style="color:#fff">ALUMNOS MATRICULADOS</h4>
                        </div>
                        <div class="buscador_alumnos">
                            <button onclick="buscarAlumno()" id="boton_registrar_alumno" hidden>Registrar Alumno</button>
                        </div>
                        <div class="classroom" id="classroom">
                        </div>
                    </li>
                </ol>
                
<!--
              Los profesores NO podran agregar instituciones o materias. La idea es que haya un registro de institucuones por ciudad, 
                de las carreras que ofrecen y de las materias que corresponden a cada carrera.
                El profesor solo podría asociarse a un curso ( dar una materia durante un año por ejemplo, cada año tendra que hacer un curso nuevo)
                y cargar los alumnos de dicho curso.

                Debe de poder asociar los alumnos de alguna forma  
-->
            </div>
        </div>    
        </div>
        
    </body>
    <script src="../Resources\JS\constantes.js"></script>
    <script src="../Resources\JS\fn_funciones.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../Resources\JS\fn_settings.js"></script>

</html>