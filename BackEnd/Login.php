<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$data["Password"] = md5($data["Password"]);
$queryC = "SELECT COUNT(public.usuario.username) FROM public.usuario WHERE username = '". $data["User"] ."' AND verificado = true";
$res = pg_query($dataB, $queryC);
$valor = pg_fetch_result($res, 0, 0 );
if ($valor == 0) {
    echo 1; //No existe
} else {
    $query = "SELECT COUNT(public.usuario.contrasena) FROM public.usuario WHERE contrasena = '". $data["Password"] ."' AND username = '". $data["User"] ."'";
    $res = pg_query($dataB, $query);
    $valor = pg_fetch_result($res, 0, 0 );
    if ($valor == 0) {
        echo 1; //No coincide contraseña..
    }
    else {
        $query = "SELECT id_usuario from public.usuario WHERE username = '". $data['User'] ."'";
        $res = pg_query($dataB, $query);
        $id = pg_fetch_result($res, 0, 0);
        $query = "SELECT count(id_usuario) from public.destaque WHERE id_usuario = ". $id;
        $res = pg_query($dataB, $query);
        $isInTable = pg_fetch_result($res, 0,0);
        if ($isInTable > 0) {
            $query = "SELECT desbaneo from public.destaque WHERE id_usuario = ". $id;
            $res = pg_query($dataB, $query);
            $banDate = pg_fetch_result($res, 0,0);
            $date = date('Y-m-d H:i:s');
            if ($banDate > $date) {
                echo 2;
            } else {
                $query = "SELECT ultimo_login from public.usuario WHERE id_usuario = ". $id;
                $res = pg_query($dataB, $query);
                $date = pg_fetch_result($res, 0, 0);
                $newDate = date('Y-m-d', strtotime($date. ' + 1 days'));
                $today = date('Y-m-d');
                if ($today >= $newDate) {
                    $query = "UPDATE public.usuario set votos = 3 WHERE id_usuario = ". $id;
                    pg_query($dataB, $query);
                }
                $query = "UPDATE public.usuario set estado = 'Conectado', ultimo_login = '". $today ."' where username = '". $data["User"] ."'";
                $res = pg_query($dataB, $query);
                echo 0; //Correcto
            }
        } else {
            $query = "SELECT ultimo_login from public.usuario WHERE id_usuario = ". $id;
            $res = pg_query($dataB, $query);
            $date = pg_fetch_result($res, 0, 0);
            $newDate = date('Y-m-d', strtotime($date. ' + 1 days'));
            $today = date('Y-m-d');
            if ($today >= $newDate) {
                $query = "UPDATE public.usuario set votos = 3 WHERE id_usuario = ". $id;
                pg_query($dataB, $query);
            }
            $query = "UPDATE public.usuario set estado = 'Conectado', ultimo_login = '". $today ."' where username = '". $data["User"] ."'";
            $res = pg_query($dataB, $query);
            echo 0; //Correcto
        }
    }
}