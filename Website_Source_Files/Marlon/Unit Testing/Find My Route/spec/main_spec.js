/**
 * Created by Marlon on 11/8/2014.
 */
//------------------------Unit Test----By Marlon Bermudez-------------------------------//

describe("Test Creating New Bus Stop Objects", function(){
    it("creates a new Bus Stop Object by passing Stop Time and Stop Address", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object( "9:00", "20 Main St Norwalk CT")
        expect(New_Bus_Stop.Stop_Address).toContain('20 Main St Norwalk CT');
        expect(New_Bus_Stop.Distance_to_Stop).toBeNull();
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

describe("Test Create Array of Bus Stops Objects", function(){
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

describe("Test Get Bus Stops for School ID", function(){
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

describe("Test Calculate Shortest Distance to Stops", function(){
    var Bus_Stops = Get_Bus_Stops();
    var User_Address = "20 main st norwalk ct"
    var Bus_Stop = Get_Shortest_Distance_To_Stops(User_Address,Bus_Stops);
    it("Find the lowest Distance To Stop", function () {
        expect(Bus_Stop.Distance).toBe(0.5);
        expect(Bus_Stop.Address).toContain('GLEN AV & SHORT ST norwalk ct');
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

describe("Spy on Get Coordinates to ensure Data is passed properly to Google Maps API", function() {
    var Get_Coordinates, map = null;
    var User_Address =  "20 main st norwalk ct";
    beforeEach(function() {
        Get_Coordinates = {
            setAddress: function(value) {
                map = value;
            }
        };

        spyOn(Get_Coordinates, 'setAddress');
        Get_Coordinates.setAddress(User_Address);
    });

    it("tracks Get Coordinates spy was called", function() {
        expect(Get_Coordinates.setAddress).toHaveBeenCalled();
    });

    it("tracks the user address was passed to Get Coordinates function", function() {
        expect(Get_Coordinates.setAddress).toHaveBeenCalledWith(User_Address);
    });

});

//----------------------------By Marlon Bermudez-------------------------------//
