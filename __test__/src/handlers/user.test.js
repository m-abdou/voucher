const UserHandler = require('../../../src/handlers').User;
let userExample = require("../../resources/examples/user");

let {omit}  = require('lodash');
let {cloneDeep}  = require('lodash');

describe('test user handler', () => {
    let userHandler = new UserHandler();

    test('test create user with schema', async () => {
        let res = await userHandler.create(userExample);
        expect(res).toHaveProperty(['_id']);
        omit(res, ['_id']);
        expect(res).toEqual(userExample);

    });

    test('test fail create user with invalid schema', async () => {
        let res = await userHandler.create({name: "test"});
        expect(res).toBeInstanceOf(Error);
    });

});
