<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Horario.php';
    require __DIR__."/../Elemental/funciones_generales.php";

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header('Content-Type: application/json');

    if (isset($_SESSION["profesor"])) {
        $profesor = $_SESSION["profesor"];    
        $horarios = obtenerHorarios($profesor->getLegajo());
        $id_curso_actual = obtenerCursoActual($horarios); 
        echo json_encode($id_curso_actual);    
    } else {
        throw new Exception("sesion no iniciada");
    }
    
    function obtenerHorarios($legajo){
        $resultados = hacer_consulta(
            "SELECT id_horario, horario.id_curso, hora_inicio, hora_fin, dia_de_semana, modulos 
            from horario inner join curso on horario.id_curso = curso.id_curso
            where legajo =".$legajo." and fecha_fin > CURDATE();"
        );
        $horarios_obtenidos = [];
        foreach($resultados as $hora){
            $hora_inicio = new DateTime($hora["hora_inicio"]);
            $hora_fin = new DateTime($hora["hora_fin"]);
            $horarios_obtenidos[] = new Horario($hora["id_horario"],$hora["id_curso"],$hora_inicio, $hora_fin, $hora["dia_de_semana"],$hora["modulos"]);
        };
        return $horarios_obtenidos;
    }

?>