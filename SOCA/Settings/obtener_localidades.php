<?php
        require __DIR__."/../Elemental/funciones_generales.php";
        session_start();
        header('Content-Type: application/json');

        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_jurisdiccion = $_POST["id_jurisdiccion"];
                $localidades = hacer_consulta("select * from localidad where id_jurisdiccion = ".$id_jurisdiccion.";");
                echo json_encode($localidades);
            }else{
                echo json_encode([]);
            }
        }else{
            echo json_encode([]);
        }
        
?>