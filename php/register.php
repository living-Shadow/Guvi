<?php

$conn = mysqli_connect("localhost:3306","root","Ak6385561116","guvi");

$name=$_POST["username"];
$email=$_POST["email"];
$pass=$_POST["password"];
$cpass=$_POST["cpassword"];

if($pass!=$cpass)
{
    echo json_encode('password mismatch');
    exit;
}
else{
    register();
}
function register()
{
    global $conn;
    global $name;
    global $email;
    global $pass;
    
    if(empty($name) || empty($email) || empty($pass))
    {
        echo json_encode('please fill the form');
        exit;
    }

    $user=mysqli_query($conn,"SELECT * FROM tb_user WHERE email='$email'");
    if(mysqli_num_rows($user)>0)
    {
        echo json_encode("This email has Already registered");
        exit;
    }

    $query="INSERT INTO tb_user (username,email,password) VALUES(?,?,?);";
    $stmt=mysqli_prepare($conn,$query);
    mysqli_stmt_bind_param($stmt,"sss",$name,$email,$pass);
    $stmt->execute();
    echo json_encode('register Success');
}

?>