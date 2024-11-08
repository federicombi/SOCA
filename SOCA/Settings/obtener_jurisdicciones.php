<?php
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    try{
        if(isset($_SESSION["profesor"])){
            $jurisdicciones = hacer_consulta("select * from jurisdiccion;");
            echo json_encode($jurisdicciones);
        }else{
            echo json_encode([]);
        }    
    }catch(Exception $error){
        throw new Exception("Error al cargar las jurisdicciones");
    }
        
?>