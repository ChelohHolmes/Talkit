<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query= "SELECT count(id_usuario) from public.ingreso_sp WHERE salap = ". $data['room'];
$res = pg_query($dataB, $query);
if (pg_fetch_result($res, 0, 0) <= 1) {
    $query = "DELETE from public.sala_personalizada WHERE no_salap = ". $data['room'];
    $res = pg_query($dataB, $query);
} else {
    $query = "SELECT participantes_cant from public.sala_personalizada WHERE no_salap = ".$data['room'];
    $res = pg_query($dataB, $query);
    $participants = pg_fetch_result($res, 0, 0);
    $newParticipants = $participants - 1;
    $query = "UPDATE public.sala_personalizada SET participantes_cant = ". $newParticipants ." WHERE no_salap = ". $data['room'];
    $res = pg_query($dataB, $query);
}
$query = "UPDATE public.usuario SET estado = 'Conectado' WHERE id_usuario = ". $id;
$res = pg_query($dataB, $query);
$query = "DELETE from public.ingreso_sp WHERE id_usuario = ". $id ." AND salap = ". $data['room'];
try {
    $res = pg_query($dataB, $query);
    echo 1;
} catch (Exception $e) {
    echo 0;
}