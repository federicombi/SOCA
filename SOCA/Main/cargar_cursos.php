<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Curso.php';
    require_once __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    if(isset($_SESSION["profesor"])){
        $profesor = $_SESSION["profesor"];
        $resultados = hacer_consulta(
            "SELECT id_curso, legajo, curso.id_materia, fecha_inicio, fecha_fin, division from 
            (curso inner join materia on materia.id_materia = curso.id_materia) 
	        inner join carrera on materia.id_carrera = carrera.id_carrera            
            inner join  institucion on institucion.cue = carrera.cue
            where legajo =".($profesor->getLegajo())." and fecha_fin > CURDATE();"
        );
        $cursos = [];
        foreach($resultados as $curso){
            $cursos[] = new Curso($curso["id_curso"],$curso["legajo"], $curso["id_materia"], $curso["fecha_inicio"], $curso["fecha_fin"], $curso["division"]);
        }
        header('Content-Type: application/json');
        echo json_encode($resultados);
    }else{
        throw new Exception("Hubo un error al cargar los cursos");
    }
        

?>