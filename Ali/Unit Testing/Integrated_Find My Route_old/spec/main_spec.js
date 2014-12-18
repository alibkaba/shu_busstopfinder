
describe("Test Validate_Text_Fields", function() {
    it("valid data", function () {
        var State_Name = "Connecticut";
        var Names = ["State Name"];
        var Values = [State_Name];
        var Test_Validate_Text_Fields = new Validate_Text_Fields(Names, Values);
        spyOn(Test_Validate_Text_Fields(Names, Values), "New");
        expect(Test_Validate_Text_Fields(Names, Values), "New").toHaveBeenCalled();
    });
});