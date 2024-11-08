<?php
    require_once __DIR__."/Traits/funciones.php";
    class Asistencia {
        use Funciones;
        Protected $id;
        Protected $id_matricula;
        Protected $fecha;
        
        public function __construct($id,$id_matricula, $fecha){
            $this-> id = $id;
            $this-> id_matricula = $legajo;
            $this-> fecha = $fecha;
        }
    }
?>