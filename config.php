<?php
$server = '127.0.0.1';
$db_user = 'root';
$db_password = '123456';
$db_name = 'db_knowledge';

try {
    $pdo = new PDO("mysql:dbname=$db_name;host=$server;charset=utf8", "$db_user", "$db_password");
} catch (Exception $e) {
    echo 'Failed to connect to MySQL' .$e;
    die;
}