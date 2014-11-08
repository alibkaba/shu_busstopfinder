/**
 * Created by Marlon on 11/8/2014.
 */
/*
describe("Test Get Bus Stops", function(){
    it("should check it receives an array", function () {
        expect(Bus_Stop1.Get_Bus_Stop_info()).toContain('20 scofield place');
    });
});
*/
describe("Test Creating New Bus Stop Objects", function(){
    it("a new Bus Stop Object can be created by passing required data", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object("1", "9:00", "20 Main St Norwalk CT", null, "-1", "-1")

        expect(New_Bus_Stop.Stop_Address).toContain('20 Main St Norwalk CT');
        expect(New_Bus_Stop.Distance_to_Stop).toBeNull();
    });
    it("a new Bus Stop Object will not be created if missing data", function () {
        var New_Bus_Stop = Create_Bus_Stop_Object("1", "9:00", "20 Main St Norwalk CT", null, "-1")

        expect(New_Bus_Stop.Stop_Address).toContain('20 Main St Norwalk CT');
        expect(New_Bus_Stop.Distance_to_Stop).toBeNull();
    });


});

describe("Test Create Array of Bus Stops Objects", function(){
    var New_Array = []

    it("array can be empty", function () {
        var New_Bus_Array = Create_Array_of_Bus_Stop_Objects(New_Array, null);
        expect(New_Bus_Array.length).toBe(0);
    });
    it("can add Bus Stop object entries if there is an address", function(){
        var New_Bus_Array = []
        var New_Bus_Stop = Create_Bus_Stop_Object("1", "9:00", "20 Main St Norwalk CT", null, "-1", "-1")
        New_Bus_Array = Create_Array_of_Bus_Stop_Objects(New_Array, New_Bus_Stop);
        expect(New_Bus_Array.length).toBe(1);

    });

    it("will not add Bus Stop object to array if it is missing the address", function(){
        var New_Bus_Array = []
        var New_Bus_Stop = Create_Bus_Stop_Object("1", "9:00", "20 Main St Norwalk CT", null, "-1", "-1")
        New_Bus_Array = Create_Array_of_Bus_Stop_Objects(New_Array);
        expect(New_Bus_Array.length).toBe(1);

    });


});


/*
describe("test", function(){
    it("test rue", function () {
        expect(test()).toBeTruthy();

    });
});

describe("Some feature", function(){
    describe("#somefunction", function() {
        it("should return true when called", function() {
            expect(someFunction()).toBeTruthy();

        });
        it("returns an array of names", function() {
            expect(anotherFunction()).toContain('marlon');
            expect(anotherFunction()).not.toContain('Gababy');
        });
    });
});

describe("user", function(){
    it("should ensure that the user is 21 or older", function () {
        expect(User.getAge()).toBeGreaterThan(20);

    });
});*/