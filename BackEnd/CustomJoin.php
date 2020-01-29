<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
if ($data['mod']) {
    $query = "UPDATE public.sala_personalizada SET moderador_estatus = 't' WHERE no_salap = ". $data['room'];
    pg_query($dataB, $query);
    $query = "INSERT INTO public.ingreso_sp (ingreso_sp, rol, creador, estatus_isp, id_usuario, salap) VALUES (DEFAULT, 'Moderador', false, DEFAULT, '". $id ."', '". $data['room'] ."')";
} else {
    $query = "INSERT INTO public.ingreso_sp (ingreso_sp, rol, creador, estatus_isp, id_usuario, salap) VALUES (DEFAULT, 'Participante', false, DEFAULT, '". $id ."', '". $data['room'] ."')";
}
$queryPoints = "SELECT puntos from public.usuario WHERE username = '". $data['user'] ."'";
$queryUsers = "SELECT participantes from public.sala_personalizada WHERE no_salap = ". $data['room'];
$res = pg_query($dataB, $queryUsers);
$users = pg_fetch_result($res, 0,0);
$newUsers = $users + 1;
$queryUsers = "UPDATE public.sala_personalizada SET participantes = ". $newUsers ." WHERE no_salap = ". $data['room'];
pg_query($dataB, $queryUsers);
$res = pg_query($dataB, $queryPoints);
$points = pg_fetch_result($res, 0, 0);
$points = $points - 1;
$queryPoints = "UPDATE public.usuario SET puntos = ". $points .", estado = 'Privada' WHERE id_usuario = ". $id;
try {
    $res = pg_query($dataB, $queryPoints);
    $res = pg_query($dataB, $query);
    echo 1;
} catch (Exception $exception) {
    echo 0;
}
