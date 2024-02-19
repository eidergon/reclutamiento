<?php
require_once 'conexion.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tipo = $_FILES['archivo_excel']['type'];
    $tamanio = $_FILES['archivo_excel']['size'];
    $archivotmp = $_FILES['archivo_excel']['tmp_name'];
    $lineas = file($archivotmp);

    $i = 0;
    $errors = 0;
    $insertedRecords = 0;

    foreach ($lineas as $linea) {
        $cantidad_registros = count($lineas);
        $cantidad_regist_agregados = ($cantidad_registros - 1);

        if ($i != 0) {
            $datos = explode(";", $linea);

            $nombre = !empty($datos[0]) ? rtrim($datos[0]) : '';
            $telefono = !empty($datos[1]) ? rtrim($datos[1]) : '';
            $documento = !empty($datos[2]) ? rtrim($datos[2]) : '';
            $medio = !empty($datos[3]) ? rtrim($datos[3]) : '';
            $ciudad = !empty($datos[4]) ? rtrim($datos[4]) : '';
            $reclutador = !empty($datos[5]) ? rtrim($datos[5]) : '';

            $checkQuery = "SELECT documento, telefono FROM reclutas WHERE documento = '$documento' AND telefono = '$telefono'";
            $checkResult = mysqli_query($conn, $checkQuery);

            if (mysqli_num_rows($checkResult) == 0) {
                $insertar = "INSERT INTO reclutas (nombre, telefono, documento, medio, ciudad, reclutador) 
                VALUES ('$nombre', '$telefono', '$documento', '$medio', '$ciudad', '$reclutador')";

                if (mysqli_query($conn, $insertar)) {
                    $insertedRecords++;
                } else {
                    $errors++;
                }
            }
        }

        $i++;
    }

    if ($errors === 0) {
        $response['status'] = 'success';
        $response['message'] = 'Archivo subido correctamente.';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Error al subir archivo. Detalles: ' . $e->getMessage();
    }

    $response['total_records'] = $cantidad_regist_agregados;
    $response['inserted_records'] = $insertedRecords;

    header('Content-Type: application/json');
    echo json_encode($response);
}