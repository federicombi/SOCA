<?php
    require_once __DIR__."/../Elemental/funciones_generales.php";

    session_start();
    header('Content-Type: application/json');

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $id_matricula = clean_input($_POST["id_matricula"]);
        $fecha = clean_input($_POST["fecha"]);
        try{
            $asistencia_existe = hacer_consulta("SELECT count(*) as registros from asistencia where id_matricula = ".$id_matricula." and DATE(fecha) = '".$fecha."';");
            if($asistencia_existe[0]["registros"] === 0){
                /*
                $guardar_asistencia = hacer_consulta("
                    INSERT INTO asistencia(id_matricula, asistencia) 
                    VALUES (".$id_matricula.", false);
                ");
                */
                echo json_encode(false);
            }else{
                /*
                $asistencia_registrada = hacer_consulta("SELECT * from asistencia where id_matricula = ".$id_matricula." and DATE(fecha) = '".$fecha."';");
                $asistio = $asistencia_registrada[0]["asistencia"];
                */
                echo json_encode(true);
            }
        }catch(Exception $err){
            throw new Exception("Hubo un error recuperando los datos de asistencia");
        };
    }else{
        //// METODO NO FUE POST
        throw new Exception("Hubo un error en el metodo de solicitud");
    }
?>