<?php
    require "Persona.php";
    class Profesor extends Persona {
        protected $legajo;
        protected $password;
        
        public function __construct($dni, $nombre, $apellido, $email, $legajo, $password){
            parent::__construct($dni,$nombre,$apellido,$email,$legajo, $password);
            $this->legajo = $legajo;
            $this->password = $password;
        }

    }

?>