<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=320, initial-scale=1">
<link rel="stylesheet" type="text/css" href="main.css">
<meta charset = "UTF-8" />
<title>Bus Routes User</title> 
</head>
<body>
<?php
// Report all errors
error_reporting(E_ALL);
include('db.php');
/* include('session.php'); */
/* var_dump($); */
/* $sessionid = $_SESSION['sessionid']; */
?>
<br>
<br>
Registration Test - NOT WORKING
<br>
<br>
<form action="#" method='post'>
	Email: <input type="text" name="email"><br>
	Password: <input type="password" name="password">
	<input type="submit" value="Register" name="register">
</form>
<br>
<br>
Login Test - WORKING (sessions aren't setup)
<br>
<br>
<form action="#" method='post'>
	Email: <input type="text" name="email"><br>
	Password: <input type="password" name="password">
	<input type="submit" value="Login" name="login">
<?php
	/* LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN */
	if(isset($_POST['login'])){
		if (!empty($_POST['email']) && !empty($_POST['password'])){
			/* email and password sent from form */
			$email = $_POST['email']; 
			$password = $_POST['password'];
			$email = stripslashes($email);
			$password = stripslashes($password);
			echo "<br>email:" .$email;
			echo "<br>password:".$password;
			/* Password check */
			//$cost = 12;
			//$salt = sprintf("$2y$07$3xdmUfn39Jd.l2.8dAxl", $cost) . $salt;
			//$hash = crypt($password, $salt);
			echo "<br>hashed:".$hash;
			$loginQuery = "CALL LOGIN ('$email', '$password')";
			$result = $PDOconn->exec($loginQuery);
			if ($result){
				echo "<script type='text/javascript'>alert('Login works.');</script>";
			}
			else{
				echo "<script type='text/javascript'>alert('login failed.');</script>";
			}
		}
		else{
			echo "<script type='text/javascript'>alert('email and/or password field is empty.');</script>";
		}
	}
?>
</form>
<br>
<br>
Drop Down (Hard Coded) + Text Field Test - Print selected option + written field - WORKING
<br>
<br>
<form action="#" method='post'>
	<select name='selectedoption'>
		<option value='State'>State</option>
		<option value='District'>District</option>
		<option value='School'>School</option>
	</select>
	Name: <input type="text" name="name"><br>
	<input type="submit" value="Add" name="add">
<?php
	if(isset($_POST['add'])){
		if (!empty($_POST['name'])){
			$name = $_POST['name'];
			$selectedoption = $_POST['selectedoption'];
			$name = stripslashes($name);
			echo "<br>name:" .$name;
			echo "<br>selected option:" .$selectedoption;	
		}
		else{
			echo "<script type='text/javascript'>alert('the name field is empty.');</script>";
		}
	}
?>
</form>
<br>
<br>
Drop Down Test - Add a State into the DB - WORKING 
<br>
<br>
<form action="#" method='post'>
	Abbreviation: <input type="text" name="name1"><br>
	Full Name: <input type="text" name="name2"><br>
	<input type="submit" value="Add State" name="addstate">
<?php
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
Drop Down Test - Add a District into the DB - WORKING 
<br>
<br>
<form action="#" method='post'>
	State: <input type="text" name="name1"><br>
	District Name: <input type="text" name="name2"><br>
	<input type="submit" value="Add State" name="addstate">
<?php
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
				$addstateQuery = "CALL ADDDISTRICT ('$name1', '$name2')";
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
Drop Down Test - Add a School into the DB - WORKING 
<br>
<br>
<form action="#" method='post'>
	Abbreviation: <input type="text" name="name1"><br>
	Full Name: <input type="text" name="name2"><br>
	<input type="submit" value="Add State" name="addstate">
<?php
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
Get State Test - Print States on page
<br>
<br>
<?php
$Query1 = 'SELECT STATE_NAME FROM STATES';
foreach ($PDOconn->query($Query1) as $row) {
	echo $row['STATE_NAME'] . "\n";
}
?>
<br>
<br>
Get State + ABBV Drop Down Test - Put it in a drop down
<br>
<br>
<?php
echo "<select>";
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query2 = 'SELECT STATE_NAME FROM STATES';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['STATE_NAME']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select>";
echo "<select>";
$options = array();
$options[] = "<option value=''>Select your STATE_ABBV</option>";
$Query2 = 'SELECT STATE_ABBV FROM STATES';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['STATE_ABBV']}'>{$row['STATE_ABBV']}</option>";
	}
echo implode("\n", $options);
echo "</select>";
?>
<br>
<br>
Get State + Districts + Schools into Drop Downs - WORKING 
<br>
<br>
<?php
echo "<select>";
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query2 = 'SELECT STATE_NAME FROM STATES';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select><br><br>";
echo "<select>";
$options = array();
$options[] = "<option value=''>Select your district</option>";
$Query3 = 'SELECT DISTRICT_ID, DISTRICT_NAME FROM DISTRICTS';
	foreach ($PDOconn->query($Query3) as $row) {
		$options[] = "<option value='{$row['DISTRICT_ID']}'>{$row['DISTRICT_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select><br><br>";
echo "<select>";
$options = array();
$options[] = "<option value=''>Select your school</option>";
$Query4 = 'SELECT SCHOOL_ID, SCHOOL_NAME FROM SCHOOLS';
	foreach ($PDOconn->query($Query4) as $row) {
		$options[] = "<option value='{$row['SCHOOL_ID']}'>{$row['SCHOOL_NAME']}</option>";
	}
echo implode("\n", $options);
echo "</select><br><br>";
?>
<br>
<br>
Drop Down - echo selected option - WORKING
<br>
<br>
<select id="Selected_Option">
<?php
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query5 = 'SELECT STATE_ID, STATE_NAME FROM STATES';
	/* State loop */
	foreach ($PDOconn->query($Query5) as $row) {
		$options[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
?>
</select>
<script type="text/javascript">
var select = document.getElementById("Selected_Option");
select.onchange = function(){
	var sOption = select.options[select.selectedIndex].value;
	alert(sOption);
}
</script>
<br>
<br>
Drop Down - echo selected option - WORKING
<br>
<br>
<select onchange="GetState1(this.value)">
<?php
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query5 = 'SELECT STATE_ID, STATE_NAME FROM STATES';
	/* State loop */
	foreach ($PDOconn->query($Query5) as $row) {
		$options[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
?>
</select>
<script type="text/javascript">
function GetState1(District_Value1) {
    alert("State ID is " + District_Value1);
}
</script>
<br>
<br>
Get State + Districts + Schools into Drop Downs - WORKING 
<br>
<br>
<select onchange="GetState(this.value)">
<?php
$options = array();
$options[] = "<option value=''>Select your state</option>";
$Query2 = 'SELECT STATE_ID, STATE_NAME FROM STATES';
	foreach ($PDOconn->query($Query2) as $row) {
		$options[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $options);
?>
</select><br><br>
<select onchange="GetDistrict(this.value)">
<?php
$options = array();
$options[] = "<option value=''>Select your district</option>";
$Query3 = 'SELECT DISTRICT_ID, DISTRICT_NAME FROM DISTRICTS';
	foreach ($PDOconn->query($Query3) as $row) {
		$options[] = "<option value='{$row['DISTRICT_ID']}'>{$row['DISTRICT_NAME']}</option>";
	}
echo implode("\n", $options);
?>
</select><br><br>
<select onchange="GetSchool(this.value)">
<?php
$options = array();
$options[] = "<option value=''>Select your school</option>";
$Query4 = 'SELECT SCHOOL_ID, SCHOOL_NAME FROM SCHOOLS';
	foreach ($PDOconn->query($Query4) as $row) {
		$options[] = "<option value='{$row['SCHOOL_ID']}'>{$row['SCHOOL_NAME']}</option>";
	}
echo implode("\n", $options);
?>
</select><br><br>
<script type="text/javascript">
function GetState(District_Value) {
    alert("State ID is " + District_Value);
}

function GetDistrict(School_Value) {
    alert("District ID is " + School_Value);
}

function GetSchool(Route_Value) {
    alert("School ID is " + Route_Value);
}
</script>
<?php
$con->close();
$PDOconn = null;
?>
</body>
</html>



















