<?php
    require_once __DIR__."/Traits/funciones.php";
    class Materia {
        use Funciones;
        Protected $id;
        Protected $id_carrera;
        Protected $nombre;
        Protected $grado;

        public function __construct($id, $id_carrera, $nombre, $grado){
            $this-> id = $id;
            $this-> id_carrera = $id_carrera;
            $this-> nombre = $nombre;
            $this-> grado = $grado;
        }

        public function getIdCarrera(){
            return $this->id_carrera;
        }
        public function getGrado(){
            return $this->grado;
        }
    }
?>