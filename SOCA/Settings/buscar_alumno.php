<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    try{
        $alumno = [];
        $alumno[0] = false;
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $dni = clean_input($_POST["dni"]);
                $alumno = hacer_consulta("select * from alumno inner join persona on alumno.dni = persona.dni where alumno.dni = ".$dni.";");
            }
            echo json_encode($alumno);
        }else{
            echo json_encode($alumno);
        }
    }catch(Exception $error){
        throw new Exception("Error al buscar el alumno");
    }
        
?>