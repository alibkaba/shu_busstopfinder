describe("Populating State Drop Down", function(){
    var action;
    var Ajax_Data;
    var Outgoing_Ajax;
    var States_Data;
    var Incoming_Ajax_Data;
    var Ajax_Data;
    beforeEach(function() {
        action = "Read_States";
        Incoming_Ajax_Data = "Incoming_Ajax_Data";
        Ajax_Data = "Ajax_Data";
    });
    afterEach(function() {
        action = null;
        Incoming_Ajax_Data = null;
        Ajax_Data = null;
    });
    it("Read_States()", function (){
       var New_States = Read_States()
    });
    it("Outgoing_Ajax(Ajax_Data)", function (){
        var New_Outgoing_Ajax = Outgoing_Ajax(Ajax_Data)
        expect(Ajax_Data).ToHaveBeenCalled();
    });
});