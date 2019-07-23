<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "UPDATE public.usuario set estado = 'Desconectado' where username = '". $data ."'";
try {
    $res = pg_query($dataB, $query);
    echo 1;
} catch (Exception $exception) {
    echo 0;
}
