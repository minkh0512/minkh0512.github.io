const Browser = require('zombie');
const assert = require('chai').assert;

let browser;

suite('Cross-Page Tests', function(){
    setup(function(){
        browser = new Browser();
    });

    test('requesting a group rate from the hood river tour page shold populate the referrer field', function(done){
        const  referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === referrer);
                //browser.assert.text('h1','Request Group Rate');
                done();
            });
        });
    });

    test('requesting a group rate from the hood oregon coast tour page shold populate the referrer field', function(done){
        const  referrer = 'http://localhost:3000/tours/oregon-coast';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });

    test('visiting the "request group rate" page directly shold result in an empty referrer field', function(done){
        const  referrer = 'http://localhost:3000/tours/request-group-rate';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === '');
                done();
            });
        });
    });
});