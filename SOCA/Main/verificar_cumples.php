<?php
    require_once __DIR__."/../Elemental/funciones_generales.php";
    require_once __DIR__.'/../Classes/Profesor.php';
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    session_start();
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $fecha = date_create();
                $fecha_formateada = date_format($fecha,"m-d");
                $id_curso = clean_input($_POST["id_curso"]);
                
                $cumpleanios = hacer_consulta("select * from matricula inner join alumno on alumno.id_alumno = matricula.id_alumno inner join persona on alumno.dni = persona.dni where id_curso = ".$id_curso." and DATE_FORMAT(natalicio, '%m-%d') = '".$fecha_formateada."';");
                echo json_encode($cumpleanios);
            }else{
                echo json_encode(0);
            }
        }else{
            echo json_encode(0);
        }
    }catch(Exception $error){
        throw new Exception("Error al cargar los cumpleaños");
    }

?>