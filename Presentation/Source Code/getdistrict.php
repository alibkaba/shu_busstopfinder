<?php
//http://www.w3schools.com/php/php_ajax_database.asp
include('db.php');
// Gets the value from the URL (will change to POST later on)
$State_ID_Value = $_GET["stateid"];

// DB Query (create stored procedure)
$getDistrict = $PDOconn->prepare('SELECT DISTRICT_ID, DISTRICT_NAME FROM DISTRICTS where STATE_ID = :State_ID_Value');
$getDistrict->bindParam(':State_ID_Value', $State_ID_Value, PDO::PARAM_INT);
$getDistrict->execute();

// Drop down
echo "<br><select onchange=\"DistrictThisValue(this.value)\">";
$options = array();
$options[] = "<option value=''>Select your district</option>";
$rows = $getDistrict->fetchAll();
foreach ($rows as $row){
	$options[] = "<option value='{$row['DISTRICT_ID']}'>{$row['DISTRICT_NAME']}</option>";
}
echo implode("\n", $options);
$x ='test'
return $x;

// Closes DB connection
$PDOconn = null;
?>