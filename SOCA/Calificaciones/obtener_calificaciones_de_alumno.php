<?php
    require_once __DIR__."../../Elemental/funciones_generales.php";
    require __DIR__."../../Classes/Calificacion.php";
    session_start();
    header('Content-Type: application/json');

    try{
        if (isset($_SESSION["profesor"])) {
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $id_matricula = clean_input($_POST["id_matricula"]);
                $id_curso = clean_input($_POST["id_curso"]);
                $resultados = [];
    
                $calificaciones_ingresadas = obtenerTiposDeCalificacionesIngresadas($id_curso);
                $resultados[0] = $calificaciones_ingresadas; 
    
                $calificaciones_de_alumno = hacer_consulta("select * from calificacion where id_matricula = ".$id_matricula.";");
                $resultados[1]= $calificaciones_de_alumno;
    
                echo json_encode($resultados);
    
            } else{
                echo json_encode(0);
            }
        } else {
            echo json_encode(0);
        }
    } catch(Exception $error){
        throw new Exception("Error al obtener los datos del alumno");
    }




    function obtenerTiposDeCalificacionesIngresadas($id_curso){
        $tipos_de_calificacion = hacer_consulta(
            "select distinct calificacion.tipo FROM 
            matricula inner join calificacion on matricula.id_matricula = calificacion.id_matricula 
            inner join curso on matricula.id_curso = curso.id_curso
            WHERE matricula.id_curso = ".$id_curso."
            ORDER BY FIELD(calificacion.tipo, 'p1', 'rp1', 'p2', 'rp2', 'tf', 'tp1', 'tp2', 'tp3', 'tp4', 'tp5');"
        );
        return $tipos_de_calificacion;
    }

?>