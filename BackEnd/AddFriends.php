<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
//echo $data["username"];
$queryC = "SELECT Count(public.usuario.username) from public.usuario WHERE username = '". $data["username"] ."'";
$queryGR = "SELECT id_usuario from usuario where username ='". $data["username"] ."'";
$queryGS = "SELECT id_usuario from usuario where username ='". $data["user"] ."'";

$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 0; //No existe
}
else {
    $res = pg_query($dataB, $queryGR);
    $idR = pg_fetch_result($res, 0, 0 );
    $res = pg_query($dataB, $queryGS);
    $idS = pg_fetch_result($res, 0, 0 );
    $query = "INSERT into public.amigos (id_usuario_envia, id_usuario_recibe, relacion) values ($idS, $idR, 'Solicitud')";
    $res = pg_query($dataB, $query);
    echo 1;
}