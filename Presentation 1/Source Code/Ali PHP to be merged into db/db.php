<?php
/* error_reporting(E_ALL); */
/* ini_set('display_errors', '1'); */
$h = "localhost";
$u = "djkabau1_admin";
$p = "k?h4F=g4Ra{O";
$db = "djkabau1_BUSTOP";
$mysqliconn = new mysqli($h, $u, $p, $db);
$PDOconn = new PDO('mysql:host=localhost;dbname=djkabau1_BUSTOP', $u, $p);
$PDOconn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
if ($mysqliconn->connect_errno) {
    echo "Oops some thing went wrong, failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}


//-----------------------Marlon created template functions for Ali to use-----------------------------------//
/* ----DB Unit test Section----  */
function DB_Unit_Test_Read_From_DB(){

}

function DB_Unit_Test_Write_To_DB(){

}

function DB_Unit_Test_Update_DB(){

}

function DB_Unit_Test_Delete_From_DB(){

}
/* ----DB Unit test Section----  */



function Get_States(){
//new States Array
//Query PHP

return States
}


function Get_Districs(State){
//New Districts Array

return Districts
}



function Get_Schools(District){
//New Schools Array

return Schools
}

function Get_Bus_Routes(School){
//New Bus_Routes Object Array. each Object will have  {Stop_Time:null, Stop_Address:"address", Distance_to_Stop:null, latitude: null, longitude: null}

return Bus_Routes
}



//-----------------------Marlon created template functions for Ali to use-----------------------------------//











?>