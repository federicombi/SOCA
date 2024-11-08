<?php
        require __DIR__."/../Elemental/funciones_generales.php";
        session_start();
        header('Content-Type: application/json');

        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_carrera = $_POST["id_carrera"];
                $materias = hacer_consulta("select * from materia where id_carrera = ".$id_carrera.";");
                echo json_encode($materias);
            }else{
                echo json_encode([]);
            }
        }else{
            echo json_encode([]);
        }
        
?>