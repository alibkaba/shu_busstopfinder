            function initialize() {
			
			
				
	
				
				
				
				//-----------load SQL values here--------------
								
				var state = "CT"
				var School_District= "Norwalk Public School";
				var School_District_Lat= 41.117744;
				var School_District_Lng = -73.4081575;
				
				BUS_Stops = Get_Bus_Stops()
				
				Map_Address(School_District_Lat, School_District_Lng, null)
				Display_Stops_Pannel(BUS_Stops)
				
				/*
				var browserSupportFlag =  new Boolean();
				//Check to see if geolocation can be detected
				  if(navigator.geolocation) {
					browserSupportFlag = true;
					navigator.geolocation.getCurrentPosition(function(position) {
					  initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					  map.setCenter(initialLocation);
					}, function() {
					  handleNoGeolocation(browserSupportFlag);
					});
				  }
				  // Browser doesn't support Geolocation
				  else {
					browserSupportFlag = false;
					handleNoGeolocation(browserSupportFlag);
				  }

				  function handleNoGeolocation(errorFlag) {
					if (errorFlag == true) {
					  alert("Geolocation service failed.");
					  initialLocation = newyork;
					} else {
					  alert("Your browser doesn't support geolocation. We've placed you in New York.");
					  initialLocation = newyork;
					}
					map.setCenter(initialLocation);
				  }
				*/
				
				
				
				//DISPLAY ADDRESSES
				
	

            };
			
			function Get_Bus_Stops(){
			
			//Query number of bus stops for School
			// Will use a linked list for second iteration
			

				BUS_Stops = Array(8);
				BUS_Stops[0]= "RIVERSIDE AV & HILL ST norwalk ct";
				BUS_Stops[1]= "PONUS AV & ELLS ST norwalk ct";			
				BUS_Stops[2]= "PONUS AV & CORNWALL RD norwalk ct";
				BUS_Stops[3]= "GLEN AV & SHORT ST norwalk ct";		
				BUS_Stops[4]= "LEDGEWOOD DR & STYLES LA norwalk ct";
				BUS_Stops[5]= "STYLES AV & PENNY LA norwalk ct";
				BUS_Stops[6]= "PONUS AV & LANCASTER DR norwalk ct";
				BUS_Stops[7]= "MAHER DR & STEPPINGSTONE PL norwalk ct";
				
				return BUS_Stops;
			
			
			
			};
			
			function Map_Address(latitude, longitude, address){
				alert(latitude);
				alert(longitude);
				
				var directionsDisplay;				
				var map;
				directionsDisplay = new google.maps.DirectionsRenderer();
				var New_Map = new google.maps.LatLng(latitude, longitude);
				
				var mapOptions = {
				zoom:13,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: New_Map
				}
				
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				directionsDisplay.setMap(map);
				
				return map;
				
			};
			
			function Map_Address_Mark_Bus_Stops(){
			
			
			
			
			};
			
			function Display_Stops_Pannel(BUS_Stops){
			
			
				var AddressPanel = document.getElementById('addresses_panel');
				AddressPanel.innerHTML = '';
				// For each address, display summary information.
				for (var i = 0; i < 8; i++) {
					AddressPanel.innerHTML += BUS_Stops[i] + '</b><br>';
                  }
			
			};

			
			function callback(response, status) {
			
				if(status=="OK") {
					 var distance = response.rows[0].elements[0].distance.text;
					 alert(distance)
	
				} else {
					alert("Error: " + status);
				}
				
				
				
				
			}



            function calcRoute(User_Address) {
				//alert("1");
				var latitude= 41.117744;
				var longitude = -73.4081575;
				var shortest_route_distance = 9999999999;
				var shortest_route_value;
				var summaryPanel = document.getElementById('directions_panel');
				
				var directionsDisplay;	
				var directionsService = new google.maps.DirectionsService();				
				var map;
				//alert("2");
				
				directionsDisplay = new google.maps.DirectionsRenderer();
				var New_Map = new google.maps.LatLng(latitude, longitude);
				
				  var mapOptions = {
					zoom: 15,
					center: New_Map
				  }
			
				//alert("3");
				map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
				directionsDisplay.setMap(map);
				
				//alert("4");
				
				//for loop
				
				var flag;
				BUS_Stops = BUS_Stops= Get_Bus_Stops();
				//initialize();
				 
				 
				
				for (var x = 0; x < BUS_Stops.length; x++) {
				
				var origin = User_Address
					var	destination = BUS_Stops[x]
				
				 
				var request = {
					origin: origin,     
					destination: destination,
					travelMode: google.maps.DirectionsTravelMode.WALKING,
					UnitSystem: google.maps.UnitSystem.IMPERIAL
				};
				var directionsService = new google.maps.DirectionsService(); 
				directionsService.route(request, function(response, status){                    
					if(status == google.maps.DirectionsStatus.OK){
						// create a new DirectionsRenderer for this route
						var dirRenderer = new google.maps.DirectionsRenderer({map: map});
						dirRenderer.setDirections(response);
						directionRenderers.push(dirRenderer);   // track the renderers
						
						
						
					}
				});
				
				
				
				/*
					var start = User_Address;
					var end = BUS_Stops[x]
					var min
					
					var origin = User_Address
					var	destination = BUS_Stops[x]
					
					var	service = new google.maps.DistanceMatrixService();

					service.getDistanceMatrix(
							{
								origins: [origin],
								destinations: [destination],
								travelMode: google.maps.TravelMode.DRIVING,
								UnitSystem: google.maps.UnitSystem.IMPERIAL,
								avoidHighways: false,
								avoidTolls: false
								
								
							}, 
							callback
							
						);
						
					alert(x)
						
					
							*/	
























								
											
					/*
					
					
					var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.TravelMode.DRIVING
					};
					
					//need to change this section with Direction matrix part of API due to async nature of process
					  directionsService.route(request, function(response, status) {
					  var min = 9999999;
						if (status == google.maps.DirectionsStatus.OK) {
						 
						  var distance = response.routes[0].legs[0].distance.text;
						  var directions = response.routes[0];
						 				  
						  directionsDisplay.setDirections(response);
						  
						var route = response.routes[0];
						var summaryPanel = document.getElementById('directions_panel');
					
						// For each route, display summary information.
						for (var i = 0; i < route.legs.length; i++) { //should be one only
						//i=0;
						//alert(route.legs.length);
							var routeSegment = i + 1;
						   	summaryPanel.innerHTML += ' Distance From: ' + route.legs[i].start_address + '   ';
							summaryPanel.innerHTML += 'To: ' + route.legs[i].end_address + '     ';
							var distance = parseFloat(route.legs[i].distance.text)
							summaryPanel.innerHTML += ' is : ' + distance + '<br>';
						
							if (distance < min){
								min = route.legs[i].distance.text;
								alert(min);
								localStorage.setItem("shortest_route_distance", min);
								
								flag = x;	
											
								}
						}
							  
					
					
						  
						}
						
					  });
					  
				*/
				
				}
				alert("final");
				alert(localStorage.getItem("shortest_route_distance"));
			summaryPanel.innerHTML += 'Lowest distance: ' + localStorage.getItem("shortest_route_distance") + ' <br><br>';
            };
			
			function Calc(start) {
				alert(start);
				
			};
			
			function Map_Address2(address){
				alert(address);
				var geocoder;
				var map;
				
				function initialize() {
				  geocoder = new google.maps.Geocoder();
				  var latlng = new google.maps.LatLng(-34.397, 150.644);
				  var mapOptions = {
					zoom: 15,
					center: latlng
				  }
				  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				}

				function codeAddress() {
				  //var address = document.getElementById('address').value;
				  geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					  map.setCenter(results[0].geometry.location);
					  var marker = new google.maps.Marker({
						  map: map,
						  position: results[0].geometry.location
					  });
					} else {
					  alert('Geocode was not successful for the following reason: ' + status);
					}
				  });
				}
					
	
			
			};
			
			function LinkedList() {
				this._length = 0;
				this._head = null;
			}
						
			
			
			
			
			
			
			
			
			
			
			
			
			
			
            google.maps.event.addDomListener(window, 'load', initialize);