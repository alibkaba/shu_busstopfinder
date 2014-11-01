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
		<select id="select_state_id" onchange="Get_Districts(State.value)">
			<option value="">Select your state</option>
			<option value=""></option>
		</select>
	</form>
	<form id="district_form_id" style="display:block">
	<h3>Select a District:</h3>
		<select id="select_district_id" onchange="Get_Schools(District.value)">
			<option value="">Select your District</option>
			<option value="districtid">district name</option>
		</select>
	</form>
	<form id="school_form_id" style="display:block">
	<h3>Select a School:</h3>
		<select id="select_school_id" onchange="Get_Bus_Routes(School.value)">
			<option value="">Select your School</option>
			<option value="schoolid">school name</option>
		</select>
	</form>
	<form id="school_form_id" style="display:block">
	<h3>Select a bus rout:</h3>
		<select id="select_busstop_id" onchange="busRoutSelect()">
			<option value="">Select your Bus</option>
			<option value="Rout401">Rout 401</option>
		</select>
	</form>
</div>
</body>
</html>