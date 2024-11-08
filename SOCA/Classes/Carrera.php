<?php
    require_once __DIR__."/Traits/funciones.php";
    class Carrera {
        use Funciones;
        Protected $id;
        Protected $cue;
        Protected $nombre;

        public function __construct($id, $cue, $nombre){
            $this-> id = $id;
            $this-> cue = $cue;
            $this-> nombre = $nombre;
        }
    }
?>