<?php
require_once('config.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();

    $username = $_POST['username'];
    $password = $_POST['password'];
    $remember = $_POST['remember'];

    if($username && $password) {
        try{
            $query = $pdo->query("SELECT * FROM api_users WHERE username = '$username'");
            $res = $query->fetchAll(PDO::FETCH_ASSOC);

            if (count($res) == 0) {
                echo json_encode(array('status'=>true, 'success'=>false, 'msg'=>'Invalid account.'));
            }else{
                $saved_password = $res[0]['password'];
                if (password_verify($password, $saved_password)) {
                    if($remember == 1) {
                        setcookie('USERNAME', $username, time()+86400*30);
                        setcookie('PASSWORD', $username, time()+86400*30);
                    }
                    $_SESSION['USERNAME'] = $username;
                    $_SESSION['PASSWORD'] = $password;
                    echo json_encode(array('status'=>true, 'success'=>true));
                }else {
                    echo json_encode(array('status'=>true, 'success'=>false, 'msg'=>'Invalid account.'));
                }
        }
        }catch (Exception $e){
            echo json_encode(array('status'=>false));
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    session_start();

    session_destroy();
}
