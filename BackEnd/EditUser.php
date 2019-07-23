<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
//$user = file_get_contents('php://input');
//    echo $user;
$data = json_decode(file_get_contents('php://input'), true);
//    echo $data['User'];
$data["Password"] = md5($data["Password"]);
$queryc = "SELECT Count(public.usuario.contrasena) from public.usuario WHERE contrasena = '". $data["Password"] ."'";
$query = "UPDATE public.usuario SET nombres = '". $data["Name"] ."', apellidos = '". $data["Lastname"] ."', correo = '". $data["Email"] ."', sexo = '". $data["Gender"] ."', lengua_mater = '". $data["NativeLanguage"] ."', intereses = '". $data["Description"] ."' WHERE usuario.username = '". $data["User"] ."'";
//    echo $query;
$res = pg_query($dataB, $queryc);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 1; //No coincide
}
else {
    $res = pg_query($dataB, $query);
    echo 0; //Correcto
}