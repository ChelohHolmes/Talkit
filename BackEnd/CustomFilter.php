<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = json_decode(file_get_contents('php://input'), true);
$query = "SELECT * FROM public.sala_personalizada";
$changed = false;
if ($data["Topics"] != 'null') {
    $query = $query . " WHERE tema = '". $data["Topics"] ."'";
    $changed = true;
} if ($data["Languages"] != 'null' && !$changed) {
    $query = $query . " WHERE lengua = '". $data["Languages"] ."'";
    $changed = true;
} elseif ($data["Languages"] != 'null') {
    $query = $query . " AND lengua = '". $data["Languages"] ."'";
} if ($data["Level"] != 'null' && !$changed) {
    $query = $query . " WHERE nivel = '". $data["Level"] ."'";
    $changed = true;
} elseif ($data["Level"] != 'null') {
    $query = $query . " AND nivel = '". $data["Level"] ."'";
} if ($data["Chats"] != 'null' && !$changed) {
    $query = $query . " WHERE tipo_conv = '" . $data["Chats"] . "'";
} elseif ($data["Chats"] != 'null') {
    $query = $query . " AND tipo_conv = '". $data["Chats"] ."'";
}
$res = pg_query($dataB, $query);
$data = json_encode(pg_fetch_all($res));
echo $data;
