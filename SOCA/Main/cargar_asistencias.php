<?php
    require_once __DIR__."/../Elemental/funciones_generales.php";
    
    session_start();
    header('Content-Type: application/json');

    if (isset($_SESSION["profesor"])) {
        $id_curso = clean_input($_POST["id_curso"]);
        $fecha = clean_input($_POST["fecha"]);
        $resultados = hacer_consulta(
            "SELECT id_asistencia, asistencia.id_matricula, fecha FROM 
            asistencia inner join matricula on matricula.id_matricula = asistencia.id_matricula
            WHERE id_curso = ".$id_curso." and DATE(fecha) = '".$fecha."';"
        );
        echo json_encode($resultados);  
    } else {
        throw new Exception("sesion no iniciada");
    }

?>