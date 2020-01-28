<?php
include 'Header.php';
include_once 'Database.php';
include_once 'UserProminent.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT votos from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$votes = pg_fetch_result($res, 0, 0);
if ($votes > 0) {
    $query = "SELECT id_usuario, puntos from public.usuario WHERE username = '". $data['username'] ."'";
    $res = pg_query($dataB, $query);
    $user = pg_fetch_all($res);
    $query = "SELECT rol from public.ingreso_sa WHERE salaa = ". $data['room'] ." AND id_usuario = ". $user[0]['id_usuario'];
    $res = pg_query($dataB, $query);
    if (pg_fetch_result($res, 0, 0) == 'Moderador') {
        $newPoints = $user[0]['puntos'] + 5;
    } else {
        $newPoints = $user[0]['puntos'] + 2;
    }
    $uP = new UserProminent();
    $uP -> check($user[0]['id_usuario'], $dataB);
    $query = "SELECT votos_conteo from public.destaque WHERE id_usuario = ". $user[0]['id_usuario'];
    $res = pg_query($dataB, $query);
    $uVotes = pg_fetch_result($res, 0, 0);
    $newUVotes = $uVotes + 1;
    if ($newUVotes > 49) {
        $query = "SELECT moderacion from public.destaque WHERE id_usuario = ". $user[0]['id_usuario'];
        $res = pg_query($dataB, $query);
        $mods = pg_fetch_result($res, 0, 0);
        if ($mods > 9) {
            $uP -> giveStatus($user[0]['id_usuario'], $dataB);
        }
    }
    $query = "UPDATE public.destaque SET votos_conteo = ". $newUVotes ." WHERE id_usuario = ". $user[0]['id_usuario'];
    pg_query($dataB, $query);
    $query = "UPDATE public.usuario SET puntos = ". $newPoints ." WHERE id_usuario = ". $user[0]['id_usuario'];
    pg_query($dataB, $query);
    $newVotes = $votes - 1;
    $query = "UPDATE public.usuario SET votos = ". $newVotes . " WHERE username = '". $data['user'] ."'";
    pg_query($dataB, $query);
    echo 1;
} else {
    echo 0;
}