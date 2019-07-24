<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT id_usuario FROM public.usuario where username = '". $data ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0 );
$query = "SELECT nombres, apellidos, correo, lengua_mater, sexo, intereses from public.usuario where id_usuario = '". $id ."'";
$res = pg_query($dataB, $query);
$valor = pg_fetch_all($res);
$info = json_encode($valor);
echo $info;