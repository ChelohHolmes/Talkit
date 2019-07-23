<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$queryC = "SELECT COUNT(public.sala_personalizada.no_salap) FROM public.sala_personalizada WHERE no_salap = '". $data['room'] ."'";
$query = "SELECT COUNT(public.sala_personalizada.contrasena) FROM public.sala_personalizada WHERE no_salap = '". $data['room'] ."' AND contrasena = '". $data['Password'] ."'";
$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == false) {
    echo 0; //No existe
} else {
    $res = pg_query($dataB, $query);
    $valor = pg_fetch_result($res, 0, 0 );
    if ($valor == 0) {
        echo 0; //No coincide contraseña
    }
    else {
        $queryUser = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
        $res = pg_query($dataB, $queryUser);
        $id = pg_fetch_result($res, 0, 0);
        $query = "INSERT INTO public.ingreso_sp (ingreso_sp, rol, creador, estatus_isp, id_usuario, salap) VALUES (DEFAULT, 'Participante', false, DEFAULT, '". $id ."', '". $data['room'] ."')";
        $res = pg_query($dataB, $query);
        $queryPoints = "SELECT puntos from public.usuario WHERE username = '". $data['user'] ."'";
        $res = pg_query($dataB, $queryPoints);
        $points = pg_fetch_result($res, 0, 0);
        $points = $points - 2;
        $queryPoints = "UPDATE public.usuario SET puntos = ". $points ." WHERE id_usuario = ". $id;
        $res = pg_query($dataB, $queryPoints);
        echo 1; //Correcto
    }
}