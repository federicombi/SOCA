<?php
    require_once __DIR__."../../Elemental/funciones_generales.php";
    require __DIR__."../../Classes/Calificacion.php";
    session_start();
    header('Content-Type: application/json');

    if (isset($_SESSION["profesor"])) {
        $id_curso = 1;
        $resultados = [];
        $minimo_aprobado = 6;
        $minimo_promocion = 7;
        $minimo_percent = 70;
        $resultados[0] = obtenerTiposDeCalificacionesIngresadas($id_curso);  

        $alumnos = hacer_consulta("select id_matricula from matricula where id_curso = ".$id_curso.";");

        $calificaciones_obtenidas = obtenerCalificaciones($id_curso);
        $resultados[1]= $calificaciones_obtenidas;
        $porcentajes_de_asistencias = obtenerPorcentajesDeAsistencias($id_curso);

        $calificaciones = [];
        foreach($calificaciones_obtenidas as $nota){
            $calificaciones[] = new Calificacion($nota["id_calificacion"], $nota["id_matricula"], $nota["tipo"], $nota["nota"]);
        }
        $estados = obtenerEstados();
        $resultados[2] = $estados;
        echo json_encode($resultados);

    } else {
        throw new Exception("sesion no iniciada");
    }

    function obtenerEstados(){
        $promedios_y_condicion = [];
        global $minimo_aprobado, $minimo_promocion, $minimo_percent,$alumnos, $calificaciones_obtenidas, $porcentajes_de_asistencias, $calificaciones;
        
        foreach($alumnos as $estudiante){
            $registro_vacio = true;
            foreach($porcentajes_de_asistencias as $asistencia){
                if($estudiante["id_matricula"] == $asistencia["id_matricula"]){
                    $registro_vacio = false;
                    $condicion = "";
                    $notas_que_promedian_un_alumno = sacarNotasQuePromedian($estudiante["id_matricula"]);
                    $promedio = sacarPromedio($notas_que_promedian_un_alumno);
        
                    if($asistencia["percent"] >= $minimo_percent){
                        $condicion = "Regular";
                        if($promedio >= 7){
                            $condicion = "Promocion";
                        }else if($promedio < 6){
                            $condicion = "Libre";
                        }
                    }else{
                        $condicion = "Libre";
                    };
                    
                    $estado_de_un_alumno = ["id_matricula"=>$asistencia["id_matricula"], "percent"=>$asistencia["percent"], "promedio"=>$promedio, "condicion"=>$condicion];
                    array_push($promedios_y_condicion, $estado_de_un_alumno);
                }
                
            }
            if($registro_vacio){
                $notas_que_promedian_un_alumno = sacarNotasQuePromedian($estudiante["id_matricula"]);
                $promedio = sacarPromedio($notas_que_promedian_un_alumno);
                $estado_de_un_alumno = ["id_matricula"=>$estudiante["id_matricula"], "percent"=>0, "promedio"=>$promedio, "condicion"=>"Libre"];
                array_push($promedios_y_condicion, $estado_de_un_alumno);
            }
        }
/*
        foreach($porcentajes_de_asistencias as $asistencia){
            $condicion = "";
            $notas_que_promedian_un_alumno = sacarNotasQuePromedian($asistencia["id_matricula"]);
            $promedio = sacarPromedio($notas_que_promedian_un_alumno);

            if($asistencia["percent"] >= $minimo_percent){
                $condicion = "Regular";
                if($promedio >= 7){
                    $condicion = "Promocion";
                }else if($promedio < 6){
                    $condicion = "Libre";
                }
            }else{
                $condicion = "Libre";
            };
            
            $estado_de_un_alumno = ["id_matricula"=>$asistencia["id_matricula"], "percent"=>$asistencia["percent"], "promedio"=>$promedio, "condicion"=>$condicion];
            array_push($promedios_y_condicion, $estado_de_un_alumno);
        } 
            */
        return $promedios_y_condicion;
    }

    function validarRecuperatorio($nota_original, $nota_recuperatorio){
        if($nota_recuperatorio > $nota_original){
            return $nota_recuperatorio;
        }else{
            return $nota_original;
        }
    }

    function obtenerCalificaciones($id_curso){
        $calificaciones_obtenidas = hacer_consulta("select calificacion.id_matricula, id_alumno, id_curso, id_calificacion, tipo, CAST(nota as FLOAT) as nota FROM 
            matricula inner join calificacion on matricula.id_matricula = calificacion.id_matricula 
            WHERE id_curso = ".$id_curso."
            ORDER BY FIELD(calificacion.tipo, 'p1', 'rp1', 'p2', 'rp2', 'ex', 'tf');"
        );
        return $calificaciones_obtenidas;
    }

    function obtenerPorcentajesDeAsistencias($id_curso){
        $asistencias_de_alumnos = hacer_consulta("
            SELECT 
                asistencia.id_matricula, 
                COUNT(asistencia.id_matricula) AS total_asistencias, 
                CAST((COUNT(asistencia.id_matricula)*100/(select count(distinct DATE(fecha)) from asistencia inner join matricula on asistencia.id_matricula = matricula.id_matricula where id_curso = ".$id_curso.")) as UNSIGNED) as percent
            FROM asistencia inner join matricula on asistencia.id_matricula = matricula.id_matricula
            where id_curso = ".$id_curso."
            GROUP BY id_matricula;
        ");
        return $asistencias_de_alumnos;
    }

    function obtenerTiposDeCalificacionesIngresadas($id_curso){
        $tipos_de_calificacion = hacer_consulta(
            "select distinct calificacion.tipo FROM 
            matricula inner join calificacion on matricula.id_matricula = calificacion.id_matricula 
            inner join curso on matricula.id_curso = curso.id_curso
            WHERE matricula.id_curso = ".$id_curso."
            ORDER BY FIELD(calificacion.tipo, 'p1', 'rp1', 'p2', 'rp2', 'ex', 'tf');"
        );
        array_push($tipos_de_calificacion, ["tipo"=>"percent"]);
        array_push($tipos_de_calificacion, ["tipo"=>"condicion"]);
        return $tipos_de_calificacion;
    }

    function sacarNotasQuePromedian($id_matricula){
        $notas_que_promedian_un_alumno = ["p1"=>0, "p2"=>0, "tf"=>0, "tp1"=>0, "tp2"=>0, "tp3"=>0, "tp4"=>0, "tp5"=>0];
        global $calificaciones;
        foreach($calificaciones as $nota){
            if ($nota->getMatricula() == $id_matricula){
                switch($nota->getTipo()){
                    case "p1":
                        $notas_que_promedian_un_alumno["p1"] = $nota->getNota();
                        break;
                    case "rp1":
                        $nota_p = $notas_que_promedian_un_alumno["p1"];
                        $notas_que_promedian_un_alumno["p1"] = validarRecuperatorio($nota_p, $nota->getNota());
                        break;
                    case "p2":
                        $notas_que_promedian_un_alumno["p2"] = $nota->getNota();
                        break;
                    case "rp2":
                        $nota_p = $notas_que_promedian_un_alumno["p2"];
                        $notas_que_promedian_un_alumno["p2"] = validarRecuperatorio($nota_p, $nota->getNota());
                        break;
                    case "tf":
                        $notas_que_promedian_un_alumno["tf"] = $nota->getNota();
                        break;
                    case "tp1":
                        $notas_que_promedian_un_alumno["tp1"] = $nota->getNota();
                    break;
                    case "tp2":
                        $notas_que_promedian_un_alumno["tp2"] = $nota->getNota();
                    break;
                    case "tp3":
                        $notas_que_promedian_un_alumno["tp3"] = $nota->getNota();
                    break;
                    case "tp4":
                        $notas_que_promedian_un_alumno["tp4"] = $nota->getNota();
                    break;
                    case "tp5":
                        $notas_que_promedian_un_alumno["tp5"] = $nota->getNota();
                    break;
                }
            }
        }
        return $notas_que_promedian_un_alumno;
    }

    function sacarPromedio($notas_que_promedian_un_alumno){
        $cantidad_notas_guardadas = 0;
        $suma = 0;
        foreach($notas_que_promedian_un_alumno as $nota){
            if($nota>0){
                $suma += $nota;
                $cantidad_notas_guardadas++;
            }
        }
        if($cantidad_notas_guardadas > 0){
            $promedio = $suma / $cantidad_notas_guardadas;
        }else{
            $promedio = "N/A";
        }
        return $promedio;
    }
?>