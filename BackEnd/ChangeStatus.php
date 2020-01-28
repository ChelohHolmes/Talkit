<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "UPDATE public.usuario set estado = 'Conectado' WHERE username = '". $data ."'";
$res = pg_query($dataB, $query);
echo 1;