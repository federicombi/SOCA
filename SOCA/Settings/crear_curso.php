<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            $profesor = $_SESSION["profesor"];
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $profesor = $_SESSION["profesor"];
                $id_materia = clean_input($_POST["id_materia"]);
                $fecha_inicio = $_POST["fecha_inicio"];
                $fecha_fin = $_POST["fecha_fin"];
                $division_recibida = clean_input($_POST["division"]);
                $este_anio = date("Y");

                if($division_recibida === "NA"){
                    $division = "null";
                    $division_para_buscar = " division is null ";
                } else{
                    $division = "'".$division_recibida."'";
                    $division_para_buscar = " division = '".$division_recibida."'";
                }

                $existe = hacer_consulta("select * from curso where id_materia = ".$id_materia." and legajo = ".$profesor->getLegajo()." and YEAR(fecha_inicio) = ".$este_anio." and ".$division_para_buscar.";");
                if(isset($existe[0])){
                    echo json_encode(0);
                }else{
                    $guardado = hacer_consulta("insert INTO CURSO (legajo, id_materia, fecha_inicio, fecha_fin, division) VALUES (".$profesor->getLegajo().", ".$id_materia.", '".$fecha_inicio."', '".$fecha_fin."', ".$division.");");
                    echo json_encode(1);
                }
                
            }else{
                echo json_encode(0);
            }
        }else{
            echo json_encode(0);
        }
    }catch(Exception $error){
        throw new Exception("Error al guardar el curso");
    }
?>