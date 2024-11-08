<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__.'/../Classes/Institucion.php';
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    ///////// AGREGAR : if($_SESSION["iniciada"]){} else{ echo json_encode(false);  /ir al login???}
    header('Content-Type: application/json');
    if(isset($_SESSION["profesor"])){
        $profesor = $_SESSION["profesor"];
        $instituciones_obtenidas = getInstitucionesPara($profesor->getLegajo());
        $instituciones = [];
        foreach($instituciones_obtenidas as $instituto){
            $instituciones[] = new Institucion($instituto["cue"], $instituto["nombre"], $instituto["direccion"]);
        }
        echo json_encode($instituciones_obtenidas);
    }else{
        echo json_encode([]);
    }
    
    function getInstitucionesPara($legajo){
        $resultado = hacer_consulta("SELECT DISTINCT institucion.nombre, institucion.cue, direccion from 
            institucion inner join carrera on institucion.cue = carrera.cue
            inner join materia on materia.id_carrera = carrera.id_carrera
            inner join curso on curso.id_materia = materia.id_materia 
            where legajo = ".$legajo." ;");
        return $resultado;
    }

?>