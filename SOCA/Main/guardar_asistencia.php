<?php
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');
    if(isset($_SESSION["profesor"])) {
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $id_matricula = $_POST["id_matricula"];
            $fecha = $_POST["fecha"];
            $asistencia = $_POST["asistencia"];
            $alumno_asistio = filter_var($asistencia, FILTER_VALIDATE_BOOLEAN);
            try{
                if($alumno_asistio){
                    $guardada = hacer_consulta("
                        INSERT INTO asistencia(id_matricula, fecha) 
                        VALUES (".$id_matricula.", '".$fecha."');
                    ");
                    echo json_encode($guardada);
                }else{
                    $guardada = hacer_consulta(" 
                        DELETE FROM asistencia 
                        WHERE  id_matricula = ".$id_matricula." and DATE(fecha) = '".$fecha."';");
                    echo json_encode($guardada);               
                }
            }catch(Exception $err){
                throw new Exception("Error al guardar la asistencia");
            }
            
        }else{
            throw new Exception("Hubo un error en el metodo de solicitud");
        }

    }else{
        echo json_encode([]);
    }

?>