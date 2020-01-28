<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query = "SELECT count(id_usuario) from public.destaque WHERE id_usuario = ". $id;
$res = pg_query($dataB, $query);
if (pg_fetch_result($res, 0, 0) < 1) {
    $query = "INSERT into public.destaque (id_usuario, moderacion, votos_conteo, destacado, expulsiones, baneos, desbaneo) VALUES ('". $id ."', default, default, default, default, default, default)";
    $res = pg_query($dataB, $query);
}
$query = "SELECT expulsiones from public.destaque WHERE id_usuario = ". $id;
$res = pg_query($dataB, $query);
$kicks = pg_fetch_result($res, 0, 0);
$newKicks = $kicks + 1;
if ($newKicks > 4) {
    $newKicks = 0;
    $query = "SELECT baneos from public.destaque WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    $bans = pg_fetch_result($res, 0, 0);
    $newBans = $bans + 1;
    $date = date('Y-m-d H:i:s');
    if ($newBans == 1) {
        $newDate = date('Y-m-d H:i:s', strtotime($date. ' + 1 days'));
    } elseif ($newBans == 2) {
        $newDate = date('Y-m-d H:i:s', strtotime($date. ' + 1 weeks'));
    } else {
        $newDate = date('Y-m-d H:i:s', strtotime($date. ' + 1000 years'));
    }
    $query = "UPDATE public.destaque SET expulsiones = ". $newKicks .", baneos = ". $newBans .", desbaneo = '". $newDate ."' WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    echo 1;
} else {
    $query = "UPDATE public.destaque SET expulsiones = ". $newKicks ." WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    echo 1;
}