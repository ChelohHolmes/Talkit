<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT volumen, estado, salida, entrada from public.usuario where username = '". $data ."'";
$res = pg_query($dataB, $query);
$valor = pg_fetch_all($res);
$preferences = json_encode($valor);
echo $preferences;