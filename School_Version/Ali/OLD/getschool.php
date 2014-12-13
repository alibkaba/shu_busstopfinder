<?php
//http://www.w3schools.com/php/php_ajax_database.asp
include('db.php');
// Gets the value from the URL (will change to POST later on)
$District_ID_Value = $_GET["districtid"];

// DB Query (create stored procedure)
$getSchool = $PDOconn->prepare('SELECT SCHOOL_ID, SCHOOL_NAME FROM SCHOOLS where DISTRICT_ID = :District_ID_Value');
$getSchool->bindParam(':District_ID_Value', $District_ID_Value, PDO::PARAM_INT);
$getSchool->execute();

// Drop down
echo "<br><select onchange=\"SchoolThisValue(this.value)\">";
$options = array();
$options[] = "<option value=''>Select your school</option>";
$rows = $getSchool->fetchAll();
foreach ($rows as $row){
	$options[] = "<option value='{$row['SCHOOL_ID']}'>{$row['SCHOOL_NAME']}</option>";
}
echo implode("\n", $options);
echo "</select>";
// Closes DB connection
$PDOconn = null;
?>