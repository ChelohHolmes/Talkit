<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$data["Password"] = md5($data["Password"]);
$queryC = "SELECT COUNT(public.usuario.username) FROM public.usuario WHERE username = '". $data["User"] ."'";
$queryM = "SELECT COUNT(public.usuario.correo) FROM public.usuario WHERE correo = '". $data["Email"] ."'";
$query = "INSERT INTO public.usuario (id_usuario, nombres, apellidos, fecha_nac, correo, sexo, username, lengua_mater, contrasena, foto_perfil, intereses, votos, puntos, verificado, estado, entrada, salida, volumen) VALUES (DEFAULT, '" . $data["Name"] . "', '" . $data["LastName"] . "', '" . $data["Birthday"] . "', '" . $data["Email"] . "', '" . $data["Gender"] . "', '" . $data["User"] . "', '" . $data["NativeLanguage"] . "', '" . $data["Password"] . "', DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)";
$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0);
if ($valor > 0) {
    echo 1; // Ya existe usuario
} else {
    $res = pg_query($dataB, $queryM);
    $valor = pg_fetch_result($res, 0, 0);
    if ($valor > 0){
        echo 1; //Ya existe correo
    } else {
        $res = pg_query($dataB, $query);
        echo 0; // Creado
    }
}