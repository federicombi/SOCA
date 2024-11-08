<?php
    require "Persona.php";
    class Alumno extends Persona {
        protected $id;
        protected $natalicio;
        
        public function __construct($dni, $nombre, $apellido, $email, $natalicio, $id){
            parent::__construct($dni,$nombre,$apellido,$email,$legajo, $password);
            $this->natalicio = $natalicio;
            $this->id = $id;
        }

        public function getNatalicio(){
            return $this->natalicio;
        }
        
    }

?>