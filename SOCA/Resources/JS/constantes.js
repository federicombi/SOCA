const 
CARGAR_BIENVENIDA = "../../Main/cargar_bienvenida.php",
CARGAR_ALUMNOS = "../../Main/cargar_alumnos.php",
CARGAR_INSTITUCIONES = "../../Main/cargar_instituciones.php",
CARGAR_CARRERAS = "../../Main/cargar_carreras.php",
CARGAR_MATERIAS = "../../Main/cargar_materias.php",
CARGAR_CURSOS = "../../Main/cargar_cursos.php",
VERIFICAR_ASISTENCIA = "../../Main/verificar_asistencia.php",
GUARDAR_ASISTENCIA = "../../Main/guardar_asistencia.php",
CARGAR_ASISTENCIAS = "../../Main/cargar_asistencias.php",
OBTENER_CALIFICACIONES = "../../Calificaciones/obtener_calificaciones.php",
GUARDAR_CALIFICACIONES = "../../Calificaciones/guardar_calificaciones.php";

const 
ELEMENTO_BIENVENIDA = document.getElementById("bienvenida"),
CLASSROOM = document.getElementById("classroom"),
SELECT_INSTITUCION = document.getElementById("select_institucion"),
SELECT_CURSO = document.getElementById("select_curso"),
ELEMENTO_TITULOS_ALUMNOS = document.getElementById("titulos_seccion_alumnos"),
FECHA_INPUT = document.getElementById("fecha"),
OVERLAY_MAIN_BODY = document.getElementById('overlay_main_body');

const 
HOY = new Date(),
DIAS_LIMITE_EN_MS = 14 * 24 * 60 * 60 * 1000,
FECHA_LIMITE_ASISTENCIA = new Date((HOY.getTime())-DIAS_LIMITE_EN_MS),
BOTON_HOME = document.getElementById("boton_home"),
BOTON_CALIFICACIONES = document.getElementById("boton_calificaciones"),
BOTON_SETTINGS = document.getElementById("boton_settings"),
BOTON_SALIR = document.getElementById("boton_salir");
