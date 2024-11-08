<?php
    require_once __DIR__."/Traits/funciones.php";

    class Persona {
        use Funciones;
        Protected $dni;
        Protected $nombre;
        Protected $apellido;
        Protected $email;


        public function __construct($dni,$nombre, $apellido, $email){
            $this-> dni = $dni;
            $this-> nombre = $nombre;
            $this-> apellido = $apellido;
            $this-> email = $email;

        }

        public function getDni(){
            return $this->dni;
        }
        public function getApellido(){
            return $this->apellido;
        }
        public function getEmail(){
            return $this->email;
        }
    }
?>
