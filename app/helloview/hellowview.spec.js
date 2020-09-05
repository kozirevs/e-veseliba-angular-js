'use strict';

describe('myApp.helloview module', function() {

    beforeEach(module('myApp.helloview'));

    describe('helloview controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var helloviewCtrl = $controller('HelloviewCtrl');
            expect(helloviewCtrl).toBeDefined();
        }));

    });
});
