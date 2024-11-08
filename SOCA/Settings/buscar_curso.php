<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header('Content-Type: application/json');

    if(isset($_SESSION["profesor"])){
        $profesor = $_SESSION["profesor"];
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $id_materia = clean_input($_POST["id_materia"]);

            $este_anio = date("Y");
            $cursos = hacer_consulta("select * from curso where id_materia = ".$id_materia." and YEAR(fecha_inicio) = ".$este_anio." and legajo = ".$profesor->getLegajo()." order by division;");
            echo json_encode($cursos);
        }else{
            echo json_encode([]);
        }
    }else{
        echo json_encode([]);
    }
        
?>