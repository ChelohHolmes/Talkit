<?php
include 'Header.php';
include_once 'Database.php';
include_once 'Random.php';

$db = new Database();
$dataB = $db -> connect();
$ran = new Random();
$token = $ran -> random_str(60);

$data = json_decode(file_get_contents('php://input'), true);

$sbj = 'Account verificaton';
$link = 'http://localhost:4200/Verified?token='. $token;
$msg = 'Use this link to verify your account: '. $link;
$headers = 'From: support@talkit.com';

$queryC = "SELECT Count(public.usuario.correo) from public.usuario WHERE correo = '". $data["Email"] ."'";
$query = "UPDATE public.usuario SET token = '". $token ."' WHERE correo = '". $data["Email"] ."'";
$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 1; //No existe
}
else {
    $res = pg_query($dataB, $query);
    try {
        mail($data["Email"], $sbj, $msg, $headers);
    } catch (Exception $e) {
        echo 1;
    }
    echo 0;
}