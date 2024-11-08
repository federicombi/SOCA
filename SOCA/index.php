<!DOCTYPE html>
<html>
    <head>
        <html lang="es"></html>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SUCA</title>
        <link rel="icon" type="image" href="Resources/Images/fedicon.ico">
        <link rel="stylesheet" type="text/css" href="Resources/CSS/style_login.css">
    </head>
    <body>
        <div class="login-container">
            <div class="login-header">
                <img src="Resources/Images/soca_logo_blanco.png" width="200">
            </div>
            <div class="login-body">
                <form action="Elemental/main.php" method="post" id="form_login">
                    <div>
                        <input type="text" id="email" name="email" placeholder="Correo electrónico" required>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder="Contraseña" required>
                    </div>
                    <div class="mensaje_error" id="mensaje_error"> </div> <br>
                    <button type="button" onclick="login();">Ingresar</button>
                    
                </form>
            </div>
        </div>

    </body>
    <script src="Resources\JS\fn_funciones.js"></script>
    <script src="Resources\JS\fn_login.js" ></script>
</html>