<?php
    require __DIR__."/conexion.php";

    function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function conectar_bd(){
        try{
            $bbdd = new Database();
            $conexion = $bbdd->connect();
            return $conexion;
        }catch(PDOException $error){
            throw new Exception("Error en la conexión a la base de datos.<br>Por favor comuníquese con el administrador.");
        }
    }

    function hacer_consulta($consulta){
        try{
            $conexion = conectar_bd();
            $query = $conexion->prepare($consulta);
            $query->execute();
            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            return $resultado;
        }catch(Exception $error){
            throw new Exception("Error al obtener los datos de la base de datos:".$error->get_message());
        }
    }

    function obtenerCursoActual($horarios){
        try{
            $hora_actual = new DateTime();
            $dia_de_semana = date("w");
            $id_curso_actual= "";
            foreach($horarios as $hora){
                if($dia_de_semana == $hora->getDiaDeSemana()){
                    if(($hora->getHoraInicio() <= $hora_actual) && ($hora_actual< $hora->getHoraFin())){
                        $id_curso_actual = $hora->getIdCurso();
                    }
                }
            }
            $_SESSION["id_curso_actual"] = $id_curso_actual;
            return $id_curso_actual;
        } catch(Exception $error){
            throw new Exception("Error al obtener los datos de l curso".$error->get_message());
        }
        
    }


?>