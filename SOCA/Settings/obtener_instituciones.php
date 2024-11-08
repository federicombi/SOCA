<?php
        require __DIR__."/../Elemental/funciones_generales.php";
        session_start();
        header('Content-Type: application/json');

        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_localidad = $_POST["id_localidad"];
                $instituciones = hacer_consulta("select * from institucion where id_localidad = ".$id_localidad.";");
                echo json_encode($instituciones);
            }else{
                echo json_encode([]);
            }
        }else{
            echo json_encode([]);
        }
        
?>