<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT id_usuario from public.usuario WHERE username = '". $data['user'] ."'";
$res = pg_query($dataB, $query);
$id = pg_fetch_result($res, 0, 0);
$query = "SELECT count(no_salaa) from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
$res = pg_query($dataB, $query);
$rooms = pg_fetch_result($res, 0, 0);
if ($rooms < 1) {
    if ($data['Rol'] === 'Moderador') {
        $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, tema, participantes) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', true, 'Viajes', 1) RETURNING no_salaa";
        $res = pg_query($dataB, $query);
        $room = pg_fetch_result($res, 0, 0);
        $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .")";
    } else {
        $query = "INSERT into public.sala_aleatoria (lengua, tipo_conv, moderador, tema, participantes) VALUES ('". $data['Language'] ."', '". $data['Type'] ."', false, 'Viajes', 1) RETURNING no_salaa";
        $res = pg_query($dataB, $query);
        $room = pg_fetch_result($res, 0, 0);
        $queryIn = "INSERT into public.ingreso_sa (id_usuario, rol, salaa) VALUES (". $id .", '". $data['Rol'] ."', ". $room .")";
    }
    $res = pg_query($dataB, $queryIn);
    echo 1;
} else {
    $query = "SELECT participantes from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
    $res = pg_query($dataB, $query);
    $participants = pg_fetch_all($res);
//    echo $participants[0]['participantes'];
    for ($i = 0; $i < sizeof($participants); $i++) {
        if ($participants[$i]['participantes'] < 7) {
            $query = "SELECT no_salaa from public.sala_aleatoria WHERE tipo_conv = '". $data['Type'] ."' AND lengua = '". $data['Language'] ."'";
            $res = pg_query($dataB, $query);
            $room = pg_fetch_all($res);
            $query = "INSERT into public.ingreso_sa (id_usuario, rol, salaa) VALUES (". $id .", '". $data['Rol'] ."', ". $room[$i]['no_salaa'] .")";
            $res = pg_query($dataB, $query);
            $newParticipants = $participants[$i]['participantes'] + 1;
            $query = "UPDATE public.sala_aleatoria SET participantes = ". $newParticipants ." WHERE no_salaa = ". $room[$i]['no_salaa'];
            $res = pg_query($dataB, $query);
            break;
        }
    }
    echo 1;
}