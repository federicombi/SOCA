<?php
    require_once __DIR__."/Traits/funciones.php";
    class Horario {
        use Funciones;
        Protected $id;
        Protected $id_curso;
        Protected $hora_inicio;
        Protected $hora_fin;
        protected $dia_de_semana;
        protected $modulos;
        
        public function __construct($id,$id_curso, $hora_inicio, $hora_fin, $dia_de_semana, $modulos){
            $this-> id = $id;
            $this-> id_curso = $id_curso;
            $this-> hora_inicio = $hora_inicio;
            $this-> hora_fin = $hora_fin;
            $this-> dia_de_semana = $dia_de_semana;
            $this-> modulos = $modulos;
        }
        public function getIdCurso(){
            return $this->id_curso;
        }
        public function getHoraInicio(){
            return $this->hora_inicio;
        }
        public function getHoraFin(){
            return $this->hora_fin;
        }
        public function getDiaDeSemana(){
            return $this->dia_de_semana;
        }
        public function getModulos(){
            return $this->modulos;
        }
    }
?>