<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "reclutamiento";

// Crear la conexión
$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn){
    echo "No se realizo la conexion a la basa de datos, el error fue:".
    mysqli_connect_error() ;
}
?>