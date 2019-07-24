<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db->connect();
$data = json_decode(file_get_contents('php://input'), true);
$data["NewPassword"] = md5($data["NewPassword"]);
$data["OldPassword"] = md5($data["OldPassword"]);
$queryc = "SELECT COUNT(public.usuario.username) FROM public.usuario WHERE username = '". $data["User"] ."'";
$queryp = "SELECT contrasena from public.usuario where username = '". $data["User"] ."'";
$query = "UPDATE public.usuario SET contrasena = '". $data["NewPassword"] ."' WHERE usuario.username = '". $data["User"] ."'";
$res = pg_query($dataB, $queryc);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 1; //No usuario
} else {
    $res = pg_query($dataB, $queryp);
    $pass = pg_fetch_result($res, 0, 0 );
    if (strcmp($pass, $data['OldPassword']) === 0) {
        $res = pg_query($dataB, $query);
        echo 0; //Correcto
    } else {
        echo 1; //No coincide
    }
}