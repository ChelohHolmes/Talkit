<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$data["Password"] = md5($data["Password"]);
$queryC = "SELECT Count(public.usuario.token) from public.usuario WHERE token = '". $data["Token"] ."'";
$query = "UPDATE public.usuario SET contrasena = '". $data["Password"] ."' WHERE token = '". $data["Token"] ."'";
$queryD = "UPDATE public.usuario set token = null WHERE token = '". $data["Token"] ."'";

$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 0; //No existe
}
else {
    $res = pg_query($dataB, $query);
    $res = pg_query($dataB, $queryD);
    echo 1;
}