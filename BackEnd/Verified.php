<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$queryC = "SELECT Count(public.usuario.token) from public.usuario WHERE token = '". $data ."'";
$query = "UPDATE public.usuario set verificado = true WHERE token = '". $data ."'";
$queryD = "UPDATE public.usuario set token = null WHERE token = '". $data ."'";

$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 1; //No existe
}
else {
    $res = pg_query($dataB, $query);
    $res = pg_query($dataB, $queryD);
    echo 0;
}