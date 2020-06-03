<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$notNew = false;
$already = false;
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query = "SELECT count(no_salaa) from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
$res = pg_query($dataB, $query);
$rooms = pg_fetch_result($res, 0, 0);
if ($rooms < 1) {
    if ($data['Rol'] === 'Moderador') {
        $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, participantes, status_sa) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', true, 1, true) RETURNING no_salaa";
        $res = pg_query($dataB, $query);
        $room = pg_fetch_result($res, 0, 0);
        $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa, estatus_isa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .", true)";
    } else {
        $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, participantes, status_sa) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', false, 1, true) RETURNING no_salaa";
        $res = pg_query($dataB, $query);
        $room = pg_fetch_result($res, 0, 0);
        $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa, estatus_isa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .", true)";
    }
    $res = pg_query($dataB, $queryIn);
    $query = "UPDATE public.usuario SET estado = 'Aleatoria' WHERE id_usuario = ". $id;
    $res = pg_query($dataB, $query);
    echo $room;
} else {
    $query = "SELECT participantes from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
    $res = pg_query($dataB, $query);
    $participants = pg_fetch_all($res);
    for ($i = 0; $i < sizeof($participants); $i++) {
        $isThereMod = false;
        $query = "SELECT no_salaa from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
        $res = pg_query($dataB, $query);
        $room = pg_fetch_all($res);
        $query = "SELECT count(ingreso_sa) from public.ingreso_sa WHERE salaa = '". $room[$i]['no_salaa'] ."' AND rol = 'Moderador'";
        $res = pg_query($dataB, $query);
        $mod = pg_fetch_result($res, 0, 0);
        if ($mod > 0) {
            $isThereMod = true;
        }
        if (($participants[$i]['participantes'] < 5 && $data['Rol'] != 'Moderador') || (($participants[$i]['participantes'] < 6 && $isThereMod && $data['Rol'] != 'Moderador')) || ($participants[$i]['participantes'] < 6  && !$isThereMod && $data['Rol'] == 'Moderador')) {
            $query = "SELECT count(ingreso_sa) from public.ingreso_sa WHERE salaa = '". $room[$i]['no_salaa'] ."' AND id_usuario = '". $id ."'";
            $res = pg_query($dataB, $query);
            $already = pg_fetch_all($res);
           if (!$already && !$isThereMod) {
//            if (!$isThereMod) {
                $query = "INSERT into public.ingreso_sa (id_usuario, rol, salaa, estatus_isa) VALUES (" . $id . ", '" . $data['Rol'] . "', " . $room[$i]['no_salaa'] . ", true)";
                $res = pg_query($dataB, $query);
                $newParticipants = $participants[$i]['participantes'] + 1;
                if ($data['Rol'] == 'Moderador') {
                    $query = "UPDATE public.sala_aleatoria SET participantes = ". $newParticipants .", moderador = true WHERE no_salaa = " . $room[$i]['no_salaa'];
                } else {
                    $query = "UPDATE public.sala_aleatoria SET participantes = ". $newParticipants ." WHERE no_salaa = " . $room[$i]['no_salaa'];
                }
                $res = pg_query($dataB, $query);
                $query = "UPDATE public.usuario SET estado = 'Aleatoria' WHERE id_usuario = ". $id;
                $res = pg_query($dataB, $query);
                $notNew = true;
                break;
           }
        }
    }
   if (!$already) {
        if (!$notNew) {
            if ($data['Rol'] === 'Moderador') {
                $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, participantes, status_sa) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', true, 1, true) RETURNING no_salaa";
                $res = pg_query($dataB, $query);
                $room = pg_fetch_result($res, 0, 0);
                $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa, estatus_isa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .", true)";
            } else {
                $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, participantes, status_sa) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', false, 1, true) RETURNING no_salaa";
                $res = pg_query($dataB, $query);
                $room = pg_fetch_result($res, 0, 0);
                $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa, estatus_isa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .", true)";
            }
            $res = pg_query($dataB, $queryIn);
            $query = "UPDATE public.usuario SET estado = 'Aleatoria' WHERE id_usuario = ". $id;
            $res = pg_query($dataB, $query);
            echo $room;
        } else {
            echo $room[$i]['no_salaa'];
        }
   } else {
       echo null;
   }
}
