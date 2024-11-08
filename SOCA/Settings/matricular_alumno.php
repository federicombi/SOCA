<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_alumno = $_POST["id_alumno"];
                $id_curso = $_POST["id_curso"];
                $existe = hacer_consulta("select * from matricula where id_alumno = ".$id_alumno." and id_curso = ".$id_curso." ;");
                if(isset($existe[0])){
                    echo json_encode(1);
                }else{
                    $guardado = hacer_consulta("insert into matricula(id_alumno, id_curso) values (".$id_alumno.", ".$id_curso.");");
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