import { expect } from 'chai';
import { timer } from './time';
import env from '../env';

describe("timer", function () {

    it("timer", function () {
        let time = new Date();
        expect(timer()).to.eql({hours: time.getHours(), minutes: time.getMinutes(), seconds: time.getSeconds()});
    });

    it("add hour check", function () {
       let time = timer();
       let date = new Date();
        expect(time.hours+1).to.equal(date.getHours()+1);
    });


    it("should load test environment variables", function () {
        expect(env.name).to.equal('test');
        expect(env.description).to.equal('Add here any environment specific stuff you like.');
    });

});
