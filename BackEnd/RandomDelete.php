<?php
include 'Header.php';
include_once 'Database.php';
include_once 'UserProminent.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query= "SELECT count(id_usuario) from public.ingreso_sa WHERE salaa = ". $data['room'];
$res = pg_query($dataB, $query);
if (pg_fetch_result($res, 0, 0) <= 1) {
    $query = "DELETE from public.sala_aleatoria WHERE no_salaa = ". $data['room'];
    $res = pg_query($dataB, $query);
} else {
    $query = "SELECT participantes from public.sala_aleatoria WHERE no_salaa = ". $data['room'];
    $res = pg_query($dataB, $query);
    $participants = pg_fetch_result($res, 0, 0);
    $newParticipants = $participants - 1;
    $query = "UPDATE public.sala_aleatoria SET participantes = ". $newParticipants ." WHERE no_salaa = ". $data['room'];
    $res = pg_query($dataB, $query);
    $query = "SELECT rol from public.ingreso_sa WHERE salaa = ". $data['room'] ." AND  id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    if (pg_fetch_result($res, 0, 0) == 'Moderador') {
        $query = "UPDATE public.sala_aleatoria SET moderador = 'f' WHERE no_salaa = ". $data['room'];
        $res = pg_query($dataB, $query);
    }
}
$query = "SELECT rol from public.ingreso_sa WHERE salaa = ". $data['room'] ." AND  id_usuario = ". $id;
$res = pg_query($dataB, $query);
if (pg_fetch_result($res, 0, 0) == 'Moderador') {
    $uP = new UserProminent();
    $uP -> check($id, $dataB);
    $query = "SELECT moderacion from public.destaque WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    $mods = pg_fetch_result($res, 0, 0);
    $newMods = $mods + 1;
    if ($newMods > 9) {
        $query = "SELECT votos_conteo from public.destaque WHERE id_usuario = " . id;
        $res = pg_query($dataB, $query);
        $votes = pg_fetch_result($res, 0, 0);
        if ($votes > 49) {
            $uP -> giveStatus($id, $dataB);
        }
    }
    $query = "UPDATE public.destaque SET moderacion = ". $newMods ." WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
}
$query = "UPDATE public.usuario SET estado = 'Conectado' WHERE id_usuario = ". $id;
$res = pg_query($dataB, $query);
$query = "DELETE from public.ingreso_sa WHERE id_usuario = ". $id ." AND salaa = ". $data['room'];
try {
    $res = pg_query($dataB, $query);
    echo 1;
} catch (Exception $e) {
    echo 0;
}