<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    session_start();

    if (isset($_SESSION['USERNAME']) && isset($_SESSION['PASSWORD'])) {
        $start = isset($_GET['start']) ? $_GET['start'] : 0;
        $perPage = isset($_GET['perpage']) ? $_GET['perpage'] : 5;;

        $query = $pdo->query("SELECT * FROM students");
        $res = $query->fetchAll(PDO::FETCH_ASSOC);

        $total_count = count($res);
        $data = array_slice($res, $start, $perPage);

        echo json_encode(array('status' => true, 'data' => $data, 'total_count' => $total_count));
    }else{
        echo json_encode(array('status' => false));
    }
}



