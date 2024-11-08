<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $id_curso = $_POST["id_curso"];
                $dia_de_semana = $_POST["dia_de_semana"];
                $hora_inicio = $_POST["hora_inicio"];
                $hora_fin = $_POST["hora_fin"];
                $modulos = $_POST["modulos"];

                $entrada_interrumpe = hacer_consulta("SELECT * FROM horario WHERE id_curso = ".$id_curso." and dia_de_semana = ".$dia_de_semana." and '".$hora_inicio."' BETWEEN hora_inicio AND hora_fin;");
                $salida_interrumpe = hacer_consulta("SELECT * FROM horario WHERE id_curso = ".$id_curso." and dia_de_semana = ".$dia_de_semana." and '".$hora_fin."' BETWEEN hora_inicio AND hora_fin;");
                
                if(isset($entrada_interrumpe[0]) || isset($salida_interrumpe[0])){
                    echo json_encode("interrumpe");  
                }else{
                    $guardado = hacer_consulta("insert INTO horario (id_curso, dia_de_semana, hora_inicio, hora_fin, modulos) values (".$id_curso.", ".$dia_de_semana.", '".$hora_inicio.":00', '".$hora_fin.":00', ".$modulos.")");
                    $id_horario_guardado = hacer_consulta("select id_horario from horario where id_curso = ".$id_curso.";");
                    echo json_encode($id_horario_guardado);
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