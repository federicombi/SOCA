<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    try{
        $persona = [];
        $persona[0] = false;
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $dni = clean_input($_POST["dni"]);
                $persona = hacer_consulta("select * from persona where dni = ".$dni.";");
            }
            echo json_encode($persona);
        }else{
            echo json_encode($persona);
        }
    }catch(Exception $error){
        throw new Exception("Error al obtener los datos de la persona");
    }
        
?>