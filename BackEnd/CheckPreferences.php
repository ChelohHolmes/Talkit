<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT tipo_conv, participantes_cant, moderador, tema from public.sala_personalizada WHERE no_salap = ". $data;
$res = pg_query($dataB, $query);
$json = json_encode(pg_fetch_all($res));
echo $json;