describe("Coordinates", function(){
    var action;
    var Coordinates_ID;
    var Address;
    var Latitude;
    var Longitude;
    var Write_Coordinates;
    var Read_Coordinates;
    var Coordinates_Data;
    var Delete_Coordinates;
    beforeEach(function() {
        Address = "Address";
        Latitude = "Latitude";
        Longitude = "Longitude";
    });
    afterEach(function() {
        action = null;
        Coordinates_ID = null;
        Address = null;
        Latitude = null;
        Longitude = null;
        Write_Coordinates = null;
        Read_Coordinates = null;
        Coordinates_Data = null;
        Delete_Coordinates = null;
    });
    it("Write_Coordinates", function (){
        action = "Write_Coordinates";
        expect(action).toContain("Write_Coordinates");
        expect(Address).toContain("Address");
        expect(Latitude).toContain("Latitude");
        expect(Longitude).toContain("Longitude");
    });
    it("Read_Coordinates", function (){
        action = "Read_Coordinates";
        expect(action).toContain("Read_Coordinates");
    });
    it("Delete_Coordinates", function (){
        action = "Delete_Coordinates";
        Coordinates_ID = "1";
        expect(action).toContain("Delete_Coordinates");
        expect(Coordinates_ID).toContain("1");
    });
});

describe("Distances", function(){
    var action;
    var Distances_ID;
    var Bus_Number;
    var Bus_Stop_Time;
    var Bus_Stop_Address;
    var User_Address;
    var Distances;
    var Write_Distances;
    var Read_Distances;
    var Distances_Data;
    var Delete_Distances;
    beforeEach(function() {
        Bus_Number = "Bus_Number";
        Bus_Stop_Time = "Bus_Stop_Time";
        Bus_Stop_Address = "Bus_Stop_Address";
        User_Address = "User_Address";
        Distances = "Distances";
    });
    afterEach(function() {
        action = null;
        Distances_ID = null;
        Bus_Number = null;
        Bus_Stop_Time = null;
        Bus_Stop_Address = null;
        User_Address = null;
        Distances = null;
        Write_Distances = null;
        Read_Distances = null;
        Delete_Distances = null;
        Distances_Data = null;
    });
    it("Write_Distances", function (){
        action = "Write_Distances";
        expect(action).toContain("Write_Distances");
        expect(Bus_Number).toContain("Bus_Number");
        expect(Bus_Stop_Time).toContain("Bus_Stop_Time");
        expect(Bus_Stop_Address).toContain("Bus_Stop_Address");
        expect(User_Address).toContain("User_Address");
        expect(Distances).toContain("Distances");
    });
    it("Read_Distances", function (){
        action = "Read_Distances";
        expect(action).toContain("Read_Distances");
    });
    it("Delete_Distances", function (){
        action = "Delete_Distances";
        Distances_ID = "1";
        expect(action).toContain("Delete_Distances");
        expect(Distances_ID).toContain("1");
    });
});