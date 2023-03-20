<?php

require './vendor/autoload.php';
$redis = new Predis\Client();
$redis->connect('127.0.0.1', 6379);
$conn = mysqli_connect("localhost:3306","root","Ak6385561116","guvi");


login();
function login()
{
    global $conn;
    global $redis;
    $email=$_POST["email"];
    $pass=$_POST["password"];
    if(empty($email) || empty($pass))
    {
        echo json_encode('please fill the form');
        exit;
    }
    $data['email']=$email;
    $user=mysqli_query($conn,"SELECT * FROM tb_user WHERE email='$email'");
    if(mysqli_num_rows($user)>0)
    {
        $row=mysqli_fetch_assoc($user);
        $data['username']=$row['username'];
        $data['id']=$row['id'];
        if($pass == $row['password'])
        {
            $token=json_encode($data);
            $redtok=json_encode($data['id']);
            $redata=json_encode($row);
		    $redis->set($redtok,$redata);
            echo json_encode(['token'=>$token]);
        }
        else
        {
            echo json_encode('enf');
        }
    }
    else{
        echo json_encode('unr');
        exit;
    }
}
?>