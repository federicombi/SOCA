<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $dni = $_POST["dni"];
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $email = $_POST["email"];
                $natalicio = $_POST["natalicio"];
                
                $persona_actualizada = hacer_consulta("update persona set nombre = '".$nombre."', apellido = '".$apellido."', email = '".$email."' WHERE dni = ".$dni.";");
                $alumno_actualizado = hacer_consulta("update alumno set natalicio = '".$natalicio."' WHERE dni = ".$dni.";");
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