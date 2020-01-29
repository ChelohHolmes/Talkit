<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "UPDATE public.usuario SET foto_perfil = '". $data['file'] ."' WHERE username = '". $data['user'] ."'";
pg_query($dataB,$query);
echo 1;