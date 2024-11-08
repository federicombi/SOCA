<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro</title>
    <link rel="icon" type="image" href="Resources/Images/fedicon.ico">
    <link rel="stylesheet" type="text/css" href="Resources/CSS/style.css">
</head>
<body>
    <form action="procesar_registro.php" method="POST" id="formulario">
        <div class="logon-container">
            <div class="logon-header">
                <h1>Registro</h1>
            </div>
            <div class="logon-body">
                <form action="procesar_registro.php" method="post" id="formulario">
                    <p>
                        eMail:
                        <input type="text" id="email" name="email" required>
                    </p>
                    <p>
                        Contraseña:
                        <input type="password" id="password" name="password" required>
                    </p>
                    <p>
                        Nombre:
                        <input type="text" id="nombre" name="nombre" required>
                    </p>
                    <p>
                        Apellido:
                        <input type="text" id="apellido" name="apellido" required>
                    </p>
                    <button type="submit" id="logon-button">Completar Registro</button>
                </form>
            </div>
        </div>
    </form>    
    <script src="Resources\JS\fn.js" ></script>
</body>
</html>