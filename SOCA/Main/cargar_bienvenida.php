<?php
    require __DIR__.'/../Classes/Profesor.php';
    require __DIR__."/../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');
    
    if(isset($_SESSION["profesor"])) {
        $id_curso = clean_input($_POST["id_curso"]);
        $profesor = $_SESSION["profesor"];
        $nombre_profesor = $profesor->getNombre();
        try{
            if($id_curso == ""){
                echo json_encode(["nombre"=>$nombre_profesor]);
            }else{
                $datos_de_bienvenida = hacer_consulta("SELECT materia.nombre as 'materia', carrera.nombre as 'carrera', institucion.nombre as 'institucion', division from
                    curso inner join materia on curso.id_materia = materia.id_materia
                    inner join carrera on materia.id_carrera = carrera.id_carrera
                    inner join institucion on carrera.cue = institucion.cue
                    where id_curso = ".$id_curso.";"
                );
                $materia = $datos_de_bienvenida[0]["materia"];
                $carrera = $datos_de_bienvenida[0]["carrera"];
                $institucion = $datos_de_bienvenida[0]["institucion"];
                $division = $datos_de_bienvenida[0]["division"];
                $dias_de_clase_efectivos = hacer_consulta("select count(distinct DATE(fecha)) as dias from asistencia inner join matricula on asistencia.id_matricula = matricula.id_matricula where id_curso = ".$id_curso.";");
                echo json_encode(["nombre"=>$nombre_profesor,"materia"=>$materia, "carrera"=>$carrera, "institucion"=>$institucion, "division"=>$division, "dias_de_clase"=>$dias_de_clase_efectivos[0]["dias"]]);
            }
        } catch(Exception $err){
            throw new Exception("Error al cargar bienvenida");
        }
    } else {
        echo json_encode(false);
    }
    
?>