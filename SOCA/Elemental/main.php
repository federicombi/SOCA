<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MAIN</title>
        <link rel="icon" type="image" href="../Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="../Resources/CSS/style_main.css">
    </head>
    <body>
        <div class="main_container">
                <div class="main_header">
                    <table>
                        <tr>
                            <td style="text-align:left">
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
                <div class="overlay" id="overlay_main_body"></div>
                <ol class="main_body">
                            <!-- SECCIÓN IZQUIERDA - BUSCADOR -->
                    <li>
                        <div class="seccion_principal">
                            <div id="bienvenida" class="bienvenida">

                            </div>
                            <div class="seccion_buscador">
                                <div class="buscador_header">
                                    Registro de asistencias
                                </div>
                                <div class="buscador_body">
                                    <ol>
                                        <li>
                                            <select id="select_institucion" disabled>
                                                <option selected disabled> Institución...</option>
                                            </select>
                                            <select id="select_curso" disabled>
                                                <option selected value="" disabled> Curso...</option>
                                            </select> 
                                            <input id="fecha" type="date" placeholder="Selecciona una fecha">
                                            <div class="mensaje_error" id="mensaje_error"></div>
                                        </li>
                                        <li>
                                            <button id="boton_cargar_alumnos" title="Seleccione un curso y una fecha" onclick="accion('Buscando registro', 1000, buscarRegistro)" disabled>
                                                Cargar alumnos
                                            </button>
                                        </li>
                                    </ol>
                                </div>  
                            </div>
                            
                        </div>
                    </li>
                    <li>
                            <!-- SECCIÓN DERECHA - ALUMNOS -->
                        <div class="seccion_alumnos">
                            <table class="titulos_seccion_alumnos" id="titulos_seccion_alumnos" hidden>
                                <caption id="caption_alumnos">
                                </caption>
                                <tr> 
                                    <th style="width: 65%;">Nombre del alumno</th>
                                    <th>Asistencia</th>
                                </tr>
                            </table> 
                            <div class="classroom" id="classroom"> 
                            </div>
                        </div> 
                    </li>
                </ol>
                
        </div>

    </body>
    <script src="../Resources\JS\constantes.js"></script>
    <script src="../Resources\JS\fn_funciones.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../Resources\JS\fn_main.js"></script>

</html>