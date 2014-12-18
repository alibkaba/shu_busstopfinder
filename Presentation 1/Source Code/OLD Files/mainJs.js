var busRout401 =[["Bus #","Time","Location"],
				["401","6:51","Riverside AV (southbound) & Hill ST"],
				["401","6:54","Pontus AV & Ells ST"],
				["401","6:56","Pontus AV & Cornwall RD"],
				["401","7:00","Glen AV & Short ST"],
				["401","7:01","Ledgewood DR & Styles LA"],
				["401","7:02","Styles LA & Penny LA"],
				["401","7:03","Pontus AV & Lancaster DR"],
				["401","7:05","Maher DR & Steppingstone PL"],
				["401","7:15","Brien McMahon"]];

var busRout402 =[["Bus #","Time","Location"],
				["402","6:50","Richards AV & Geneva RD"],
				["402","6:51","Richards AV & Fillow ST"],
				["402","6:56","Nursery ST & Nursery CT"],
				["402","6:57","Pontus AV & Nursery ST"],
				["402","6:58","Huckleberry DR SO & Fox Run RD"],
				["402","6:59","Huckleberry DR N & Douglas DR"],
				["402","7:00","Weed AVE & Grey Squirrel DR"],
				["402","7:01","Weed AV & Old Rock LN"],
				["402","7:03","Old Rock LN & Princess Pine RD"],
				["402","7:05","249 1/2 W Norwalk RD"],
				["402","7:06","W Norwalk RD & Rising RD"],
				["402","7:07","W Norwalk RD & Ravenwood Rd"],
				["402","7:07","W Norwalk RD & Morehouse LA"],
				["402","7:08","W Norwalk RD & W Ceder ST"],
				["402","7:09","West Cedar ST & Richards AV"],
				["402","7:10","Richards AV & Mallards Landing"],
				["402","7:11","Keeler AV & Spitzer CT"],
				["402","7:11","West Cedar ST & Keeler AV"],
				["402","7:15","Brien McMahon"]];
var busRout404 =[["Bus #","Time","Location"],
				["404", "7:12", "SO Norwalk Station & State ST"]];

function addToRout(){
	var number = document.getElementById("bus_number").value;
	var time = document.getElementById("bus_time").value;
	var location = document.getElementById("bus_stop").value;
	busRout404.push([number, time, location]);
	alert("stop added: "+ number + " " + time + " " + location );
}				

function createTable(tableData) {
  var table = document.createElement('table'), tableBody = document.createElement('tbody');
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function checkCred(){
	var userEmail = document.getElementById('usersEmail').value;
	var userPass = document.getElementById('usersPassWord').value;
	if (userEmail == "admin@gmail.com"){
		if (userPass == "open"){
			document.adminLoginForm.action="Admin.html";
		}
		else
			alert("1ncorrect username or password");
		}
	else
		alert("Incorrect username or password");
}

/* This is where you would have the District information load for selected state*/
function stateSelect() {
    var x = document.getElementById("State").value;
	if (x == "CT"){
	document.getElementById('districtForm').style.display = 'block';
	}
}
/* This is where you would have the school information load for selected district*/
function districtSelect() {
    var x = document.getElementById("District").value;
	if (x == "Fairfield"){
	document.getElementById('schoolForm').style.display = 'block';
	}
}
/* This is where you would have the bus information load for selected schools*/
function schoolSelect() {
    var x = document.getElementById("School").value;
	if (x == "Ludlow"){ 
	document.getElementById('busForm').style.display = 'block';
	}
	else if (x == "Ward"){
	document.getElementById('busForm').style.display = 'block';
	}
	else if (x == "Middle"){
	document.getElementById('busForm').style.display = 'block';
	}
	else {
	
	}
}
/* google info goes here with selected schools */
function busRoutSelect() {
    var x = document.getElementById("Bus").value;
	if (x == "Rout401"){ 
	createTable(busRout401);
	document.getElementById('addStop').style.display = 'block';
	}
	else if (x == "Rout402"){
	createTable(busRout402);
	document.getElementById('addStop').style.display = 'block';
	}
	else if (x == "Rout404"){
	createTable(busRout404);
	document.getElementById('addStop').style.display = 'block';
	}
	else {
	
	}
}