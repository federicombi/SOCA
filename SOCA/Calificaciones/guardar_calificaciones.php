<?php
    require_once __DIR__."../../Elemental/funciones_generales.php";
    session_start();
    header('Content-Type: application/json');

    if (isset($_SESSION["profesor"])) {
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            $notas_recibidas = $_POST["notas"];
            $calificaciones = json_decode($notas_recibidas, true);

            foreach($calificaciones as $nota){
                if($nota["nota"] != ""){
                    $guardada = hacer_consulta("insert INTO calificacion (id_matricula, tipo, nota) VALUES (".$nota["id_matricula"].", '".$nota["tipo"]."', ".$nota["nota"].");");
                }
            }
            echo json_encode(true);

        } else{
            throw new Exception("Wrong Method");
        }

    } else {
        throw new Exception("sesion no iniciada");
    }

?>