import { expect } from 'chai';
import testUtils from './utils';
import path from 'path';
import fs from 'fs';


describe('application launch', function () {

    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it('shows current time text on screen after launch', function () {
        var me = this;
        var date = new Date();
        return this.app.client.waitUntilTextExists('#time', testUtils.timeFormate(date.getHours())+":"+
            testUtils.timeFormate(date.getMinutes()) + ":" + testUtils.timeFormate(date.getSeconds()), 10000);
        });
});
