<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=320, initial-scale=1">
<link rel="stylesheet" type="text/css" href="main.css">
<meta charset = "UTF-8" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="js/main2.js"></script> 
<title>user page</title> 
</head>
<body>
<?php
// Report all errors
// error_reporting(E_ALL);
include('db.php');
/* include('session.php'); */
/* var_dump($); */
/* $sessionid = $_SESSION['sessionid']; */
?>
<br>
<br>
Add a State into the DB
<br>
<br>
<form action="#" method='post'>
	Abbreviation: <input type="text" name="name1"><br>
	Full Name: <input type="text" name="name2"><br>
	<input type="submit" value="Add State" name="addstate">
<?php
// Add a State into the DB
	if(isset($_POST['addstate'])){
		if (!empty($_POST['name1']) && !empty($_POST['name2'])){
			$name1 = $_POST['name1'];
			$name2 = $_POST['name2'];
			$selectedoption = $_POST['selectedoption'];
			$name1 = stripslashes($name1);
			$name2 = stripslashes($name2);
			echo "<br>Abbreviation:" .$name1;
			echo "<br>Full Name:" .$name2;
			if (strlen($name1)<3){
				$addstateQuery = "CALL ADDSTATE ('$name1', '$name2')";
				$result = $PDOconn->exec($addstateQuery);
				if ($result){
					echo "<script type='text/javascript'>alert('state was added.');</script>";
				}
				else{
					echo "<script type='text/javascript'>alert('state was not added.');</script>";
				}
			}
			else{
				echo "<script type='text/javascript'>alert('your state abbreviation is too long. needs to be only 2 characters!');</script>";
			}
		}
		else{
			echo "<script type='text/javascript'>alert('the name field is empty.');</script>";
		}
	}
?>
</form>
<br>
<br>
Delete a School from the DB
<br>
<br>
<?php
// Delete a School from the DB
echo "<select onchange=\"DeleteSchoolThisValue(this.value)\">";
$options = array();
$options[] = "<option value=''>Select your school</option>";
$Query2 = 'SELECT SCHOOL_ID, SCHOOL_NAME FROM SCHOOLS';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['SCHOOL_ID']}'>{$row['SCHOOL_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select><br>";
?>
<!-- place holders for js/main.js -->
<div id="deleteplaceholder"></div>
<br>
<br>
<br>
<br>
<?php
echo "<select onclick=\"StateThisValue(this.value)\">";
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query2 = 'SELECT STATE_ID, STATE_NAME FROM STATES';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select><br>";
?>
<!-- place holders for js/main.js -->
<div id="districtplaceholder"></div>
<div id="schoolplaceholder"></div>
<div id="busstopplaceholder"></div>

<?php
// Closes DB connection
$PDOconn = null;
?>
</body>
</html>