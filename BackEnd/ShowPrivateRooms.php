<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db -> connect();
$data = file_get_contents('php://input');
$query = "SELECT * FROM public.sala_personalizada";
$res = pg_query($dataB, $query);
$data = json_encode(pg_fetch_all($res));
echo $data;