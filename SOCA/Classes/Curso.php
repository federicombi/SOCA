<?php
    require_once __DIR__."/Traits/funciones.php";
    class Curso {
        use Funciones;
        Protected $id;
        Protected $legajo;
        Protected $id_materia;
        Protected $fecha_inicio;
        Protected $fecha_fin;
        Protected $division;

        public function __construct($id, $legajo, $id_materia, $fecha_inicio, $fecha_fin, $division){
            $this-> id = $id;
            $this-> legajo = $legajo;
            $this-> id_materia = $id_materia;
            $this-> fecha_inicio = $fecha_inicio;
            $this-> fecha_fin = $fecha_fin;
            $this-> division = $division;
        }

    }
?>