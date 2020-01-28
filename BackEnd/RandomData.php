<?php
include 'Header.php';
include_once 'Database.php';
$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$json = array();
$query = "SELECT id_usuario from public.ingreso_sa WHERE salaa = ". $data ." AND rol = 'Participante'";
$res = pg_query($dataB, $query);
$users = pg_fetch_all($res);
if (is_array($users)) {
    if (sizeof($users) != 0) {
        for ($i = 0; $i < sizeof($users); $i++) {
            $query = "SELECT username, foto_perfil from public.usuario where id_usuario = " . $users[$i]['id_usuario'];
            $res = pg_query($dataB, $query);
            $hamana = pg_fetch_all($res);
            array_push($json, array($hamana[0]));
        }
        $query = "SELECT id_usuario from public.ingreso_sa WHERE salaa = " . $data . " AND rol = 'Moderador'";
        $res = pg_query($dataB, $query);
        $mod = pg_fetch_all($res);
        if (is_array($mod)) {
            $query = "SELECT username, foto_perfil from public.usuario where id_usuario = " . $mod[0]['id_usuario'];
            $res = pg_query($dataB, $query);
            $modp = pg_fetch_all($res);
            $modArr = array("mod" => $modp);
            array_push($json, $modArr);
            echo json_encode($json);
        } else {
            $modArr = array("mod" => null);
            array_push($json, $modArr);
            echo json_encode($json);
        }
    }
} else {
    $hamana = array("users"=>null);
    array_push($json, $hamana);
    $query = "SELECT id_usuario from public.ingreso_sa WHERE salaa = ". $data ." AND rol = 'Moderador'";
    $res = pg_query($dataB, $query);
    $mod = pg_fetch_all($res);
    if (is_array($mod)) {
        $query = "SELECT username, foto_perfil from public.usuario where id_usuario = ". $mod[0]['id_usuario'];
        $res = pg_query($dataB, $query);
        $modp = pg_fetch_all($res);
        $modArr = array("mod"=>$modp);
        array_push($json, $modArr);
        echo json_encode($json);
    } else {
        $modArr = array("mod"=>null);
        array_push($json, $modArr);
        echo json_encode($json);
    }
}