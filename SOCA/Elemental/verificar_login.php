<?php
    session_start();
    header('Content-Type: application/json');
    $SESION_INICIADA = isset($_SESSION["profesor"]);
    echo json_encode($SESION_INICIADA); 
?>