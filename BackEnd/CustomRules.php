<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT privacidad, descripcion/*, reglas*/ from public.sala_personalizada where no_salap = '". $data ."'";
$res = pg_query($dataB, $query);
$data = pg_fetch_all($res);
echo json_encode($data);