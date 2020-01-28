<?php
include 'Header.php';
include_once 'Database.php';

$db = new Database();
$dataB = $db->connect();
$data = file_get_contents('php://input');
$query = "Delete from usuario where username = ". $data;
$res = pg_query($dataB, $query);
echo $res;