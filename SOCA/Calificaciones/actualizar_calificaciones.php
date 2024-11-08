<?php
    require_once __DIR__."../../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    try{
        if (isset($_SESSION["profesor"])) {
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_matricula = $_POST["id_matricula"];
                $notas_recibidas = $_POST["calificaciones"];
                $calificaciones = json_decode($notas_recibidas, true);
    
                foreach($calificaciones as $nota){
                    $existe = hacer_consulta("select * from calificacion where id_matricula = ".$id_matricula." and tipo = '".$nota["tipo"]."';");
                    if(isset($existe[0])){
                        $actualizada = hacer_consulta("update calificacion set nota = ".$nota["nota"]." where id_matricula = ".$id_matricula." and tipo = '".$nota["tipo"]."';");
                    }else{
                        $guardado = hacer_consulta("insert into calificacion (id_matricula, tipo, nota) values (".$id_matricula.", '".$nota["tipo"]."', ".$nota["nota"].");");
                    }
                }
                echo json_encode(1);
    
            } else{
                echo json_encode(0);
            }
    
        } else {
            echo json_encode(0);
        }
    }catch(Exception $error){
        throw new Exception("Error al actualizar los datos del alumno");
    }

?>