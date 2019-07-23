<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db->connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "UPDATE public.usuario set estado = '". $data["estado"] ."', entrada = '". $data["dispE"] ."', salida = '". $data["dispS"] ."', volumen = '". $data["volumen"] ."' WHERE username = '". $data["user"] ."'";
try {
    $res = pg_query($dataB, $query);
    echo 1;
} catch (Exception $exception) {
    echo 0;
}