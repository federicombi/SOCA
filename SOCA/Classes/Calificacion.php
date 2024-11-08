<?php
    require_once __DIR__."/Traits/funciones.php";

    class Calificacion {
        use Funciones;
        Protected $id;
        Protected $id_matricula;
        Protected $tipo;
        Protected $nota;

        public function __construct($id, $id_matricula, $tipo, $nota){
            $this-> id = $id;
            $this-> id_matricula = $id_matricula;
            $this-> tipo = $tipo;
            $this-> nota = $nota;
        }
        
        public function getNota(){
            return $this->nota;
        }

        public function getTipo(){
            return $this->tipo;
        }

        public function getMatricula(){
            return $this->id_matricula;
        }
    }
?>