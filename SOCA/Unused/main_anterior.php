<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <title> Main </title>
        <link rel="icon" type="image" href="Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="Resources/CSS/style.css">
    </head>
    <body>

        <table style="width:84%; margin-left: 8%;margin-right: 8%">
            <caption>
                <h1> Main </h1>
            </caption>

            <tr>
                <td>
                    <?php
                        if($_SERVER["REQUEST_METHOD"] == "POST") {
                            if($_POST["tipo_de_persona"] == 'cliente'){
                                require "Classes/Cliente.php";
                                $sujeto = New Cliente($_POST["nombre"],$_POST["apellido"],$_POST["mail"],$_POST["dni"],$_POST["fecha_nacimiento"],$_POST["localidad"],$_POST["provincia"],$_POST["telefono"],$_POST["numero_cuenta"]);

                                $cumplio18 = $sujeto->esMayor();
                                if(!$cumplio18){
                                    echo "<p style='color:red'>Debe ser mayor de edad para ser cliente</p>";
                                }else{
                                    echo "<p>Se ingresa el cliente: <h3>".$sujeto->mostrarCliente()."</h3></p><br><br>";
                                }
                                $plata = $_POST["plata"];
                                $totalConDescuento = $sujeto->hacerDescuento($plata);
                                $descuento = $plata - $totalConDescuento;
                                echo "<table style='width:40%;margin-left:32%;text-align:left'>
                                    <tr>
                                        <td><p>Subtotal:</p></td>
                                        <td><p>$".number_format($plata,2)."</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>Descuento:</p></td>
                                        <td><p>$".number_format($descuento,2)."</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>TOTAL:</p></td>
                                        <td><h3>$".number_format($totalConDescuento,2)."</h3></td>
                                    </tr> 
                                </table>";
                                /*
                                echo "<p>Con un monto de: $".number_format($plata,2)."</p>";
                                echo "<p>Se aplica descuento del 30%: $".number_format($descuento,2)."</p>";
                                echo "<p>TOTAL A PAGAR: <h3>$".number_format($totalConDescuento,2)."</h3></p>";
                                */
                            }elseif($_POST["tipo_de_persona"] == "empleado"){
                                require "Classes/Empleado.php";
                                $sujeto = New Empleado($_POST["nombre"],$_POST["apellido"],$_POST["mail"],$_POST["dni"],$_POST["fecha_nacimiento"],$_POST["localidad"],$_POST["provincia"],$_POST["telefono"],$_POST["legajo"]);
                                $plata = $_POST["plata"];
                                echo "<p>Se ingresa empleado: <h3>".$sujeto->mostrarEmpleado()."</h3></p><br><br>";

                                if($sujeto->tieneDescuento()){
                                    $totalConDescuento = $sujeto->hacerDescuento($plata);
                                    $descuento = $plata - $totalConDescuento;
                                    $parrafoDescuento = "<p>Descuento:</p>";
                                    $string_con_descuento = "<p>$".number_format($descuento,2)."</p>";
                                }else{
                                    $totalConDescuento = $plata;
                                    $parrafoDescuento = "";
                                    $string_con_descuento="";
                                }
                                echo "<table style='width:40%;margin-left:32%;text-align:left'>
                                    <tr>
                                        <td><p>Subtotal:</p></td>
                                        <td><p>$".number_format($plata,2)."</p></td>
                                    </tr>
                                    <tr>
                                        <td>".$parrafoDescuento."</td>
                                        <td><p>".$string_con_descuento."</p></td>
                                    </tr>
                                    <tr>
                                        <td><p>TOTAL:</p></td>
                                        <td><h3>$".number_format($totalConDescuento,2)."</h3></td>
                                    </tr> 
                                </table>";
                                
                            };
                        }
                    ?>
                </td>
            </tr>
        </table>

    </body>
</html>