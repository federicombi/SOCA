<?php
        require __DIR__."/../Elemental/funciones_generales.php";
        session_start();
        header('Content-Type: application/json');

        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $cue = $_POST["cue"];
                $carreras = hacer_consulta("select * from carrera where cue = ".$cue.";");
                echo json_encode($carreras);
            }else{
                echo json_encode([]);
            }
        }else{
            echo json_encode([]);
        }
        
?>