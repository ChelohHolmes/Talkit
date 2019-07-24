<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT id_usuario FROM public.usuario where username = '". $data ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0 );
$query = "SELECT id_usuario_recibe, username, relacion, foto_perfil, estado from public.amigos inner join usuario on id_usuario_recibe = id_usuario where id_usuario_envia = '". $id ."'";
$res = pg_query($dataB, $query);
$lel = pg_fetch_all($res);
$friends = json_encode($lel);
echo $friends;