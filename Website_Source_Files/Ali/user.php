<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />
<meta name="viewport" content="width=320, initial-scale=1">
<link rel="stylesheet" type="text/css" href="main.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script src="js/main.js"></script>
<title>Welcome to Bus Stops</title> 
</head>
<body>
<form id="state_form_id">
<?php
include'db.php';
$Get_All_States_Query = 'select STATE_ID, STATE_NAME from STATES';
echo "<select id=\"select_state_id\" onchange=\"Get_District(this.value)\">";
$All_States_Array = array();
$All_States_Array[] = "<option value=''>Select your state</option>";
	foreach ($PDOconn->query($Get_All_States_Query) as $row) {
		$All_States_Array[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $All_States_Array);
echo "</select>";
?>
</form>
<div id="DistrictPlaceHolder"></div>
<form id="district_form_id">
	<select id="select_district_id">
		<option value="">Select your District</option>
	</select>
</form>
<form id="school_form_id">
	<select id="select_school_id">
		<option value="">Select your School</option>
	</select>
</form>
<form id="busstop_form_id">
	<select id="select_busstop_id">
		<option value="">Select your Bus</option>
	</select>
</form>
</body>
</html>