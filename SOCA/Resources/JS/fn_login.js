const 
PROCESAR_LOGIN = "../../Elemental/procesar_login.php",
VERIFICAR_LOGIN= "../../Elemental/verificar_login.php";

verificarLogin();

function login(){

    try {
        let 
        email = document.getElementById("email").value,
        password = document.getElementById("password").value;
    
         if (email_ok(email) && password_ok(password)){
            document.getElementById("mensaje_error").innerHTML = "";
            ///Para enviar los datos del form como POST a la pagina del fetch.
            fetch(PROCESAR_LOGIN,{
                method:"POST", 
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams({
                    'email': email,
                    'password': password
                    })
                }).then (response=>response.json()).then(data=>{
                    if(data.nombre != undefined){
                        ///LOGIN EXITOSO
                        document.getElementById("form_login").submit();
                    }else{
                        document.getElementById("mensaje_error").innerHTML = data;
                    }
                    
                })
         }else{
            document.getElementById("mensaje_error").innerHTML = "Hay un error en el correo electrónico o la contraseña";
         };

        return 1;
    } catch (error) {
        /////lanzar_error_bye("Error al obtener las localidades", OVERLAY_MAIN_BODY);
        throw new Error("Mensaje");
    }

}


function password_ok(password){
    let 
    result = true;
    const noPermitidos=["'",'"',"/","(",")","=","¿","+","{","}","[","]","¡","|","°","¬","&",";","~","\\","<",">"];
    if(password.length >100){
        result = false;
    }else{
        for (i=0;i<password.length;i++){
            for(const element of noPermitidos){
                if (password.at(i) == element){
                    result = false;
                }
            }
        }
    }
    return result;
}

async function verificarLogin(){
    isLogueado = await obtenerDatos(VERIFICAR_LOGIN);
    if (isLogueado){
        document.getElementById("form_login").submit();
    }

}