<?php
// Start: Database Connection
$dsn = "mysql:host=localhost;dbname=djkabau1_BUSTOP";
$u = "djkabau1_busstop";
$p = "-E&805Wzy&@b";
$PDOconn = new PDO($dsn, $u, $p);
try {
    $PDOconn = new PDO($dsn, $u, $p);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
// End: Database Connection

echo $_POST['data'];
echo "<script type='text/javascript'>alert('bottom');</script>";
//Function to check if the request is an AJAX request
function is_ajax() {
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	echo "<script type='text/javascript'>alert('is_ajax');</script>";
}

if (is_ajax()) {
	if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
		$action = $_POST["action"];
		echo $action;
		switch($action) { //Switch case for value of action
			case "WriteCoordinates": WriteCoordinates();
			break;
		}
	}
}

function WriteCoordinates(){
	echo "<script type='text/javascript'>alert('WriteCoordinates');</script>";
}
?>