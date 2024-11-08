<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CALIFICACIONES</title>
        <link rel="icon" type="image" href="../Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="../Resources/CSS/style_calificaciones.css">
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
            <div class="main_body">
                <div class="overlay" id="overlay_main_body">
                </div>
                <div class="notas_adder" id="notas_adder">
                    <div class="notas_adder_header">
                        <button onclick="cerrarIngresarNotas()">Cancelar</button>
                        <select id="tipo_nota">
                            <option selected disabled> Tipo de nota...</option>
                            <option value="p1"> Primer Parcial</option>
                            <option value="rp1"> Recuperatorio 1er Parcial </option>
                            <option value="p2"> Segundo Parcial</option>
                            <option value="rp2"> Recuperatorio 2do Parcial </option>
                            <option value="tf"> Trabajo Final </option>
                            <option value="tp1"> Trabajo Practico 1 </option>
                            <option value="tp2"> Trabajo Practico 2 </option>
                            <option value="tp3"> Trabajo Practico 3 </option>
                            <option value="tp4"> Trabajo Practico 4 </option>
                            <option value="tp5"> Trabajo Practico 5 </option>
                        </select>
                        <button id="boton_guardar_notas" onclick="guardarNotas()" disabled>GUARDAR</button>
                    </div>
                    <div class="notas_alumnos_container">
                        <table id="tabla_notas" class="tabla_notas">

                        </table>
                    </div>
                </div>
                <img src="../Resources/Images/waldo.png" width="13px" id="waldo">
                <div class="header_calificaciones">
                    <ol>
                        <li id="li_bienvenida">
                            <div id="bienvenida" class="bienvenida"> 
                                <h1>Registro de Calificaciones</h1>
                            </div>
                        </li>
                        <li id="li_buscador">
                            <div class="seccion_buscador">
                                    <ol>
                                        <li>
                                            <select id="select_institucion" disabled>
                                                <option selected disabled> Institución...</option>
                                            </select>
                                        </li>
                                        <li>
                                            <select id="select_curso" title="Seleccione una Institución" disabled>
                                                <option selected value="" disabled> Curso...</option>
                                            </select> 
                                        </li>
                                        <li>
                                            <button id="boton_cargar_alumnos" title="Seleccione un curso" onclick="accion('Cargando registro', 500, buscarRegistro)" disabled>
                                                Cargar alumnos
                                            </button>
                                        </li>
                                        <li>
                                            <button id="boton_ingresar_notas" title="Cargue un curso" onclick="ingresarNotas()" disabled>
                                                Agregar Notas
                                            </button>
                                        </li>
                                    </ol>
                            </div>
                        </li>
                    </ol>
                </div>
                <div class="seccion_alumnos">
                    <div class="titulos_seccion_alumnos" id="titulos_seccion_alumnos" hidden>
                    </div> 
                    <div class="classroom" id="classroom"> 

                    </div>
                </div>
            </div>
        </div>    
        </div>

    </body>
    <script src="../Resources\JS\constantes.js"></script>
    <script src="../Resources\JS\fn_funciones.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../Resources\JS\fn_calificaciones.js"></script>

</html>