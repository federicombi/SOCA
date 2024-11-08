<?php
    require "funciones_generales.php";
    require __DIR__.'/../Classes/Profesor.php';

    procesar_login();

    /////////////// funciones:

    function getProfesor($conexion, $email){
        ////ya se debe haber hecho la conexión a la bbdd
        try{
            $query = $conexion->prepare("SELECT * FROM persona inner join profesor on persona.dni = profesor.dni WHERE email = :email;");
            $query->bindParam(':email', $email, PDO::PARAM_STR);
            $query->execute();
            $usuario = $query->fetch(PDO::FETCH_ASSOC);
            return $usuario;
        }catch(Exception $error){
            throw new Exception("Error al obtener los datos del usuario");
        }
    };

    function procesar_login(){
        try{
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                header('Content-Type: application/json');
                $email = clean_input($_POST["email"]);
                $password = clean_input($_POST["password"]);
                try {
                    $conexion = conectar_bd();
                    $usuario = getProfesor($conexion,$email,$password);                              
                    if (!$usuario){
                        throw new Exception("Por favor verifique el correo electrónico");
                    } else{
                        if ($usuario['password'] == $password) {
                            ////LOGIN EXITOSO
                            echo json_encode($usuario);
                            iniciarSesionPara($usuario);
                        } else {
                            throw new Exception("Verifique su contraseña");
                        }
                    };                              
                } catch (Exception $err) {
                    throw $err;
                }
            } else {
                throw new Exception("Hay un error en el método de petición");
            }
        }catch(Exception $err){
            echo json_encode($err->getMessage());
        }
    }
    function iniciarSesionPara($usuario){
        $profesor = new Profesor ($usuario["dni"],$usuario["nombre"],$usuario["apellido"],$usuario["email"],$usuario["legajo"],$usuario["password"]);
        session_start();
        $_SESSION["profesor"] = $profesor;
    }
?>
