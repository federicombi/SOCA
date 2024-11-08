<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <title> Herencia </title>
        <link rel="icon" type="image" href="Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="Resources/CSS/style.css">
    </head>
    <body>
        <form action="main.php" method="POST" id="formulario">
            <table style="width:84%; margin-left: 8%;margin-right: 8%">
                <caption>
                    <h1> Herencia </h1>
                </caption>
                <tr>
                    <td id="columna1">
                        <p>
                            Nombre: <input type="text" id="nombre" name="nombre"> <br> <br>
                            Apellido: <input type="text" id="apellido" name="apellido"> <br><br>
                            Mail: <input type="text" id="mail" name="mail"> <br><br>
                            Dni: <input type="text" id="dni" name="dni"> <br><br>
                            Fecha de Nacimiento: <input type="date" id="fecha_nacimiento" name="fecha_nacimiento"> <br><br>
                            Localidad: <input type="text" id="localidad" name="localidad"> <br><br>
                            Provincia: <input type="text" id="provincia" name="provincia"> <br><br>
                            Telefono: <input type="text" id="telefono" name="telefono"> <br><br>
                        </p>
                        

                    </td>
                    <td>
                        <p>
                            <input type="radio" id="esCliente" name="tipo_de_persona" value="cliente"> 
                            <label for="esCliente"> Soy un Cliente </label> 
                            <input type="radio" id="esEmpleado" name="tipo_de_persona" value="empleado"> 
                            <label for="esEmpleado"> Soy un empleado </label><br><br> 

                            Numero de cuenta (Clientes) : <input type="text" id="numero_cuenta" name="numero_cuenta"> <br> <br>
                            Legajo (Empleados): <input type="text" id="legajo" name="legajo"> <br><br><br><br>
                            
                            Monto: $ <input type="number" id="plata" name="plata"><br><br><br><br>
                            
                            <button type="submit"> Enviar </button><br><br>

                            <?php
                                /*
                                require "Persona.php";
                                $dia = new DateTime("1998-08-15");
                                echo "Fecha:". $dia->format("d/m")."<br>";

                                $sujeto = new Persona("Federico", "Guigou", "mail@ejemplo.com", "96161", "1997-8-15", "Guale", "ER", "5493446");
                                echo $sujeto->mostrarPersona();
                                */
                            ?>
                        </p>
                        
                    </td>
                </tr>
            </table>
        </form>

    </body>
</html>