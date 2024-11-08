<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_matricula = $_POST["id_matricula"];

                $borrado = hacer_consulta("delete from matricula where id_matricula = ".$id_matricula.";");
                echo json_encode(1);

            }else{
                echo json_encode(0);
            }
        }else{
            echo json_encode(0);
        }
    }catch(Exception $error){
        throw new Exception("Error al guardar el curso");
    }
?>