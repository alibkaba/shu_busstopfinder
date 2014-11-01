<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />
<meta name="viewport" content="width=320, initial-scale=1">
<link rel="stylesheet" type="text/css" href="main.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="js/main.js"></script>
<title>Welcome to Bus Stops</title> 
</head>
<body>
<div class="browsInfo" id="select_wrapper">
	<h1>Find My Bus Stop</h1>

	<form id="state_form_id" style="display:block">
		<h3>Select a State:</h3>
		<select id="State" onchange="Get_Districts(State.value)">
			<option value="">Select your state</option>
			<option value="1">New York</option>
			<option value="2">Connecticut</option>
			<option value="3">New Hampshire</option>
		</select>
	</form>

	<form id="district_form_id" style="display:block">
	<h3>Select a District:</h3>
		<select id="District" onchange="Get_Schools(District.value)">
			<option value="">Select your District</option>
			<option value="Norwalk">Norwalk</option>
			<option value="Fairfield">Fairfield</option>
			<option value="Stratford">Stratford</option>
		</select>
	</form>

	<form id="school_form_id" style="display:block">
	<h3>Select a School:</h3>
		<select id="School" onchange="Get_Bus_Routes(School.value)">
			<option value="">Select your School</option>
			<option value="Brien McMahon">Brien McMahon</option>
			<option value="Rotton">Rotton</option>
			<option value="Norwalk High">Norwalk High</option>
		</select>
	</form>
	
	<form id="school_form_id" style="display:block">
	<h3>Select a bus rout:</h3>
		<select id="Bus" onchange="busRoutSelect()">
			<option value="">Select your Bus</option>
			<option value="Rout401">Rout 401</option>
			<option value="Rout402">Rout 402</option>
			<option value="Rout404">Rout 404</option>
		</select>
	</form>
	
</div>

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