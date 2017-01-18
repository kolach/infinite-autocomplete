import { InfiniteAutocomplete } from '../../src/Components/InfiniteAutocomplete';
import { TestUtils } from '../Utils/index';
import { Promise as es6Promise } from 'es6-promise';

describe(`Options Default implementation: `, function() {

    it(`One single option list should be rendered`, function() {
        var infinite = document.createElement('div');
        new InfiniteAutocomplete(infinite);
        expect(infinite.querySelectorAll('ul').length).toBe(1);
    });


    it(`The options list should be initialized as hidden`, function() {
        var infinite = document.createElement('div');
        new InfiniteAutocomplete(infinite);
        var optionsList = infinite.querySelector('ul');
        if(optionsList) {
            expect(optionsList.style.display)
                .toBe(`none`);
        } else {
            throw `Can't find the options list HTMLElement`;
        }
    });

    
    describe(`Options results based on static data`, function() {

        beforeEach(function() {
            //Default jasmine timeout
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        });
        
        
        it(`should not show the items when they don't match the search`, 
            async function (done):es6Promise<void> {
                var infinite = document.createElement('div');
                var iniElm = new InfiniteAutocomplete(infinite);

                iniElm.setConfig({data: [
                    { text: 'first', value: 1},
                    { text: 'second', value: 2},
                    { text: 'theird', value: 3},
                    { text: 'fourth', value: 4},
                    { text: 'fivth', value: 5}
                ]});

                var input = <HTMLInputElement> infinite.querySelector(`input`);
                TestUtils.typeLetter(input, 'x');
                await TestUtils.sleep(0);
                var options = <NodeListOf<HTMLElement>> infinite.querySelectorAll(`li`);
                expect(options.length).toBe(0);
                var optionsList = <HTMLElement> infinite.querySelector(`ul`);
                expect(optionsList.style.display)
                    .toBe(`none`);
                done();
        });


        it(`should bind the value of options into the DOM node element as 'data'`, 
            async function (done):es6Promise<any> {
                var infinite = document.createElement('div');
                var iniElm = new InfiniteAutocomplete(infinite);

                iniElm.setConfig({data: [
                    { text: 'first', value: 1},
                    { text: 'second', value: 2},
                    { text: 'theird', value: 3},
                    { text: 'fourth', value: '4'},
                    { text: 'fivth', value: {a: 1, b: 2}}
                ]});

                var input = <HTMLInputElement> infinite.querySelector(`input`);
                TestUtils.typeLetter(input, 'f');
                await TestUtils.sleep(0);
                var options = <NodeListOf<HTMLElement>> infinite.querySelectorAll(`li`);
                if(options.length === 0) {
                    throw `options shouldn't be empty!`;
                }
                expect((options[0] as any).data.value)
                    .toBe(1);
                expect((options[1] as any).data.value)
                    .toBe('4');
                expect((options[2] as any).data.value)
                    .toEqual({a:1, b: 2});
                done();
        });


        it(`should show the items when they match the search`, async function(done):es6Promise<void> {
            var infinite = document.createElement('div');
            var iniElm = new InfiniteAutocomplete(infinite);

            iniElm.setConfig({data: [
                { text: 'first', value: 1},
                { text: 'second', value: 2},
                { text: 'theird', value: 3},
                { text: 'fourth', value: 4},
                { text: 'fivth', value: 5}
            ]});

            var input = <HTMLInputElement> infinite.querySelector(`input`);
            TestUtils.typeLetter(input, 'f');
            await TestUtils.sleep(0);
            var options = <NodeListOf<HTMLElement>> infinite.querySelectorAll(`li`);
            if(options.length === 0) {
                throw `options shouldn't be empty!`;
            }
            for( var i = 0; i < options.length; i++) {
                expect(options[i].innerText)
                    .toContain('f');
            }

            var optionsList = <HTMLElement> infinite.querySelector(`ul`);
            expect(optionsList.style.display)
                .toBe(``);

            TestUtils.typeLetter(input, 'i');
            await TestUtils.sleep(0);
            var options = <NodeListOf<HTMLElement>> infinite.querySelectorAll(`li`);
            if(options.length === 0) {
                throw `options shouldn't be empty!`;
            }
            for( var i = 0; i < options.length; i++) {
                expect(options[i].innerText)
                    .toContain('fi');
            }

            var optionsList = <HTMLElement> infinite.querySelector(`ul`);
            expect(optionsList.style.display)
                .toBe(``);

            done();
        });
    });
});