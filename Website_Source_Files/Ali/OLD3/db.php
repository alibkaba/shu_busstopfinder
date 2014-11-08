<?php
// Start: Database Connection
$dsn = "mysql:host=localhost;dbname=djkabau1_BUSTOP";
$u = "djkabau1_admin";
$p = "k?h4F=g4Ra{O";
$PDOconn = new PDO($dsn, $u, $p);
try {
    $PDOconn = new PDO($dsn, $u, $p);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
// End: Database Connection

// Start: Get_District()
// Start: State_ID_For_District From User.php
if (isset($_POST['State_ID_For_District'])){
	// Stripslashes
	$State_ID_For_District = stripslashes($_POST["State_ID_For_District"]);
	
	// DB Query
	$Get_District_ID_Query = 'select DISTRICT_ID, DISTRICT_NAME from DISTRICTS where STATE_ID = :State_ID_For_District';
	$Get_District_ID = $PDOconn->prepare($Get_District_ID_Query);
	$Get_District_ID->bindParam(':State_ID_For_District', $State_ID_For_District, PDO::PARAM_INT);
	$Get_District_ID->execute();
	$Districts_Data_From_Single_State_ID = $Get_District_ID->fetchAll();
	echo json_encode($Districts_Data_From_Single_State_ID);
	//$Districts_Data_From_Single_State_ID_Array = array();
	//foreach ($Districts_Data_From_Single_State_ID as $row){
	//	$Districts_Data_From_Single_State_ID_Array[] = $row['DISTRICT_ID'] . "&" .$row['DISTRICT_NAME'] ;
	//}
	//echo implode("\n", $Districts_Data_From_Single_State_ID_Array);
// End: State_ID_For_District From User.php
}
// End: Get_District()
?>