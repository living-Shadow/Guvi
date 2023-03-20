<?php
    require './vendor/autoload.php';
    $client = new MongoDB\Client();
    $db = $client->companydb;
    $emp=$db->empCollection;
    // check if already present
    $criteria=array(
        'id'=>$_POST['id'],
    );
    $doc=$emp->findOne($criteria);
    if(!empty($doc))
    {
        $emp->updateOne(
            ['_id' => $_POST['id']],
            ['$set' => $_POST]
        );
        $data=$_POST;
        $parse=json_encode($data);
        echo json_encode(['token'=>$parse]);
        
     //   echo json_encode("new change success");
    }
    else
    {
        $data=$_POST;
        $data["_id"]=$_POST["id"];
        $result=$emp->insertOne($data);
        $parse=json_encode($_POST);
        echo json_encode(['token'=>$parse]);
      //  echo json_encode("change success");
    }
?>