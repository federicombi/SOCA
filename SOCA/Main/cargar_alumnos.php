<?php
    ////require_once __DIR__.'/../Classes/Alumno.php';
    require_once __DIR__.'/../Classes/Profesor.php';
    require_once __DIR__.'/../Classes/Curso.php';
    require_once __DIR__."/../Elemental/funciones_generales.php";
    
    session_start();
        header('Content-Type: application/json');
    if (isset($_SESSION["profesor"])) {
        $id_curso = clean_input($_POST["id_curso"]);
        ////$cursos = $_SESSION["cursos"];
        $resultados = hacer_consulta(
            "SELECT * from 
            ((matricula inner join alumno on matricula.id_alumno = alumno.id_alumno) 
            inner join persona on alumno.dni = persona.dni) 
            inner join curso on matricula.id_curso = curso.id_curso 
            where curso.id_curso = ".$id_curso."
            order by apellido, nombre;"
        );
    } else {
        throw new Exception("sesion no iniciada");
    }

    echo json_encode($resultados);

?>