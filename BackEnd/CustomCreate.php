<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query = "SELECT puntos from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$points = pg_fetch_result($res, 0, 0);
if ($data['Privacy'] == 'Publica') {
    $points = $points - 5;
} else {
    $points = $points - 10;
}
if ($data['Topic'] == 'aleatorio') {
    $topic = 'true';
} else {
    $topic = 'false';
}
$query = "INSERT into public.sala_personalizada (no_salap, lengua, tipo_conv, moderador_estatus, moderador, participantes_cant, cambio_tema, tema, nivel, descripcion, privacidad, status_sp, contrasena) VALUES (DEFAULT, '". $data['Language'] ."', '". $data['ChatType'] ."', false, '". $data['Moderator'] ."', ". $data['Participants'] .", '". $topic ."', '". $data['Topics'] ."', '". $data['Level'] ."', '". $data['Description'] ."', '". $data['Privacy'] ."', DEFAULT, '". $data['Password'] ."') RETURNING no_salap";
$res = pg_query($dataB, $query);
$room = pg_fetch_result($res, 0, 0);
$query = "INSERT INTO public.ingreso_sp (ingreso_sp, rol, creador, estatus_isp, id_usuario, salap) VALUES (DEFAULT, 'Participante', true, DEFAULT, '". $id ."', '". $room ."')";
$res = pg_query($dataB, $query);
$query = "UPDATE public.usuario SET puntos = ". $points ." WHERE id_usuario = ". $id;
$res = pg_query($dataB, $query);
echo 1;
//echo $room;