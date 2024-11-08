<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Horario.php';
    require __DIR__."/../Elemental/funciones_generales.php";

    session_start();
    header('Content-Type: application/json');

    try{
        if (isset($_SESSION["profesor"])) {
            $profesor = $_SESSION["profesor"];    
            $id_curso = $_POST["id_curso"];
            $horarios = hacer_consulta("select id_horario, id_curso, dia_de_semana, LEFT(hora_inicio, 5) AS hora_inicio, LEFT(hora_fin, 5) AS hora_fin, modulos from horario where id_curso = ".$id_curso." order by dia_de_semana, hora_inicio;");
            echo json_encode($horarios);    
        } else {
            throw new Exception("sesion no iniciada");
        }
    }catch(Exception $error){
        throw new Exception("Error al obtener los horarios");
    }


?>