<?php
    require __DIR__."/../Classes/Profesor.php";
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');
    try{
        if(isset($_SESSION["profesor"])){
            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $dni = $_POST["dni"];
                $nombre = $_POST["nombre"];
                $apellido = $_POST["apellido"];
                $email = $_POST["email"];
                $natalicio = $_POST["natalicio"];
                $existe_persona = $_POST["existe_persona"];

                if($existe_persona){
                    $guardado = hacer_consulta("insert INTO alumno (dni, natalicio) values (".$dni.", '".$natalicio."');");
                }else{
                    $persona_guardada = hacer_consulta("insert INTO persona (dni, nombre, apellido, email) values (".$dni.", '".$nombre."', '".$apellido."', '".$email."');");
                    $alumno_guardado = hacer_consulta("insert INTO alumno (dni, natalicio) values (".$dni.", '".$natalicio."');");
                } 

                $alumno = hacer_consulta("select * from alumno inner join persona on alumno.dni = persona.dni where alumno.dni = ".$dni.";");
                echo json_encode($alumno);

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