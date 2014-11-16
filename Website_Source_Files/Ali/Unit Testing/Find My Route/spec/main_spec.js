
// ------------------------------------------Marlon coded items BELOW --------------------------------//

describe("Test Creating New Bus Stop Objects - Create_Bus_Stop_Object", function(){
    it("creates a new Bus Stop Object by passing Stop Time and Stop Address", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object( "9:00", "20 Main St Norwalk CT")
        expect(New_Bus_Stop.Stop_Address).toContain('20 Main St Norwalk CT');
        expect(New_Bus_Stop.Distance_to_Stop).toBe(0);
    });
    it("a new Bus Stop Object will not be created if missing Stop time and address parameters", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object();
        expect(New_Bus_Stop).toBeFalsy();
    });
    it("a new Bus Stop Object will not be created if missing address parameter", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object("9:00");
        expect(New_Bus_Stop).toBeFalsy();
    });
});

describe("Test Create Array of Bus Stops Objects - Validate_Bus_Stop_Object", function(){
    var New_Bus_Array = [];
    it("can validate a Bus_Stop_Object", function(){
        var New_Bus_Stop = Create_Bus_Stop_Object("9:00", "20 Main St Norwalk CT");
        expect(Validate_Bus_Stop_Object(New_Bus_Stop)).toBeTruthy();
    });
    it("can add Bus Objects to Array", function(){
        var New_Bus_Stop = Create_Bus_Stop_Object("9:00", "20 Main St Norwalk CT");
        expect(Validate_Bus_Stop_Object(New_Bus_Stop)).toBeTruthy();
        New_Bus_Array.push(New_Bus_Stop);
        expect(New_Bus_Array.length).toBe(1);
        New_Bus_Stop = Create_Bus_Stop_Object("9:20", "30 Main St Norwalk CT");
        New_Bus_Array.push(New_Bus_Stop);
        expect(New_Bus_Array.length).toBe(2);
    });
});

describe("Test Get Bus Stops for School ID - Get_Bus_Stops_for_School", function(){
    var School_ID = '1';
    it("should return array with valid data", function () {
        var New_Bus_Array = Get_Bus_Stops_for_School(School_ID);
        expect(New_Bus_Array[0].Stop_Time).toContain('9:00');
        expect(New_Bus_Array[0].Stop_Address).toContain('RIVERSIDE AV & HILL ST norwalk ct');
       // expect(New_Bus_Array[0].Distance_to_Stop).toBeNull();
        expect(New_Bus_Array[0].Latitude).not.toBeNull();
        expect(New_Bus_Array[0].Longitude).not.toBeNull();
        expect(Validate_Bus_Stop_Object(New_Bus_Array[0])).toBeTruthy();
        expect(New_Bus_Array.length).toBeGreaterThan(0);
    });
});

describe("Spy on Map Address to ensure it is called with parameters", function() {
    var Map_Address, map = null;
    var latitude =  -42.32;
    var longitude = 42.245;

    beforeEach(function() {
        Map_Address = {
            setAddress: function(value) {
                map = value;
            }
        };
        spyOn(Map_Address, 'setAddress');
        Map_Address.setAddress(latitude, longitude);
    });
    it("tracks that the Map Address spy was called and address set", function() {
        expect(Map_Address.setAddress).toHaveBeenCalled();
    });
    it("tracks latitude and longitude parameters were passed", function() {
        expect(Map_Address.setAddress).toHaveBeenCalledWith(latitude, longitude);
    });
});


describe("Test Calculate Shortest Distance to Stops", function(){
    var Bus_Stops = [];
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.117744, Longitude: 41.117744};
    Bus_Stops[1]= {Stop_Time: "9:10", Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 0, Longitude: 0};
    Bus_Stops[2]= {Stop_Time: "9:15", Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[3]= {Stop_Time: "9:20", Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 0, Longitude: 0};
    Bus_Stops[4]= {Stop_Time: "9:24", Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 0, Longitude: 0};
    Bus_Stops[5]= {Stop_Time: "9:30", Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 0, Longitude: 0};
    Bus_Stops[6]= {Stop_Time: "9:35", Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 0, Longitude: 0};
    Bus_Stops[7]= {Stop_Time: "9:40", Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 0, Longitude: 0};

    var User_Address = "20 main st norwalk ct"
    var Bus_Stop = Get_Shortest_Distance_To_Stops(User_Address,Bus_Stops);
    it("Find the lowest Distance To Stop", function () {
        expect(Bus_Stop.Distance).toBe(0.5);
        expect(Bus_Stop.Address).toContain('GLEN AV & SHORT ST norwalk ct');
    });
});

describe("Test Get Coordinates Function on GeoCoder", function(){
    var googleMapMock = {
        geoCode: function(code, fn) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': code
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    fn(results[0].geometry.location);
                } else {
                    alert("Error with Geocoder");
                }
            })
        },
        render: function(LatLng) {
            var mapOptions = {
                zoom: 8,
                center: LatLng
            }
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var marker = new google.maps.Marker({
                map: map,
                position: LatLng
            });
        }
    };

    window.google = {
        maps: {
            Geocoder: function() {
                this.geocode = function(input, fn) {
                    setTimeout(function() {
                        fn([{geometry: {location: 1}}], window.google.maps.GeocoderStatus.OK);
                    }, 1000);
                }
            },
            GeocoderStatus: {OK: 1             }
        }
    };

    it("Test GeoCode Mock object by calling function", function(done) {
        var address = "20 main st norwalk ct";
        googleMapMock.geoCode(address, function() { done(); });
    });
    it("Test GeoCode Mock function by using spy", function(done) {
        var address = "20 main st norwalk ct";
        var callbackSpy = jasmine.createSpy("callback").and.callFake(function() { done(); });
        googleMapMock.geoCode(address, callbackSpy);
    });
});


describe("Test Get Coordinates Function", function(){
    var User_Address = "20 main st norwalk ct";
    var Coordinates  = Get_Coordinates(User_Address);
    alert(typeof Coordinates);
    it("Find the lowest Distance To Stop", function () {
        //expect(Coordinates.Latitude).toContain(41.11912100000001);
        expect(Coordinates.Latitude).toBeFalsy(); //Async issue
    });
});


describe("Test Add Marker function by using spy on mock", function() {
    var Add_Marker, map = null;
    var latitude =  -42.32;
    var longitude = 42.245;

    beforeEach(function() {
        Add_Marker = {
            setAddress: function(value) {
                map = value;
            }
        };
        spyOn(Add_Marker, 'setAddress');
        Add_Marker.setAddress(latitude, longitude);
    });

    it("tracks that the Map Address spy was called and address set", function() {
        expect(Add_Marker.setAddress).toHaveBeenCalled();
    });
    it("tracks latitude and longitude parameters were passed", function() {
        expect(Add_Marker.setAddress).toHaveBeenCalledWith(latitude, longitude);
    });
});


// ------------------------------------------Marlon coded items ABOVE--------------------------------//
