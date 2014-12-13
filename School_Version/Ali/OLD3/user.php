<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset=utf-8" />
<meta name="viewport" content="width=320, initial-scale=1">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
<script src="js/main.js"></script>
<title>Welcome to Bus Stops</title> 
</head>
<body>
<form id="state_form_id" method="post">
<?php
include'db.php';
$Get_All_States_Query = 'select STATE_ID, STATE_NAME from STATES';
echo "<select id=\"select_state_id\">";
$All_States_Array = array();
$All_States_Array[] = "<option value=''>Select your state</option>";
	foreach ($PDOconn->query($Get_All_States_Query) as $row) {
		$All_States_Array[] = "<option value='{$row['STATE_ID']}'>{$row['STATE_NAME']}</option>";
	}
echo implode("\n", $All_States_Array);
echo "</select>";
?>
<input type='submit' name='submit'/>
</form>
<div id="DistrictPlaceHolder"></div>
</body>
</html>