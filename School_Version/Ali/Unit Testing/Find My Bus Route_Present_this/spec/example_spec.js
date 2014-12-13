/**
 * Created by Marlon on 11/8/2014.
 */
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
});