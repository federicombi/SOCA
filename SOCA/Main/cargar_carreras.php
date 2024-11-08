<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Carrera.php';
    require_once __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    ////AGREGAR IF SESSION
        $profesor = $_SESSION["profesor"];
        $resultados = hacer_consulta(
            "SELECT distinct carrera.nombre, carrera.id_carrera, carrera.cue from 
	        curso inner join materia on curso.id_materia = materia.id_materia
	        inner join carrera on materia.id_carrera = carrera.id_carrera 
            where legajo =".($profesor->getLegajo()).";"
        );
        $carreras = [];
        foreach($resultados as $carrera){
            $carreras[] = new Carrera($carrera["id_carrera"],$carrera["cue"],$carrera["nombre"]);
        }
        $_SESSION["carreras"] = $carreras;
        header('Content-Type: application/json');
        echo json_encode($resultados);

?>