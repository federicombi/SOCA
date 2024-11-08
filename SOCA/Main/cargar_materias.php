<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Materia.php';
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    ////AGREGAR IF SESSION
        $profesor = $_SESSION["profesor"];
        
        $resultados = hacer_consulta(
            "SELECT distinct materia.id_materia, materia.id_carrera, materia.nombre, grado from 
            curso inner join materia on curso.id_materia = materia.id_materia
            where legajo =".($profesor->getLegajo()).";"
        );
        $materias = [];
        foreach($resultados as $materia){
            $materias[] = new Materia($materia["id_materia"], $materia["id_carrera"], $materia["nombre"], $materia["grado"]);
        }
        header('Content-Type: application/json');
        echo json_encode($resultados);

?>