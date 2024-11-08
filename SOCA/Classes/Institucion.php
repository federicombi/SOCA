<?php
    require_once __DIR__."/Traits/funciones.php";
    class Institucion {
        use Funciones;
        Protected $cue;
        Protected $nombre;
        protected $direccion;

        public function __construct($cue,$nombre, $direccion){
            $this-> cue = $cue;
            $this-> nombre = $nombre;
            $this-> direccion = $direccion;
        }

    }
?>
