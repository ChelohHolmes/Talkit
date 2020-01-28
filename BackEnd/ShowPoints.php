<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT puntos, votos FROM public.usuario where username = '". $data ."'";
$res = pg_query($dataB, $query);
$valor = pg_fetch_all($res);
echo json_encode($valor);