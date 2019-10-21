<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db->connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario FROM public.usuario where username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$idE = pg_fetch_result($res, 0, 0 );
$query = "SELECT id_conexion from public.amigos where id_usuario_recibe = '". $data['idR'] ."' AND id_usuario_envia = '$idE'";
$res = pg_query($dataB, $query);
echo pg_fetch_result($res, 0, 0);