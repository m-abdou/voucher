const  userRepository = require('../../../src/repositories').UserRepository;
let  userExample = require("../../resources/examples/user");

let  {omit}  = require('lodash');
let  {cloneDeep}  = require('lodash');
let user;

describe('validate on user repository', () => {
    let repository = new userRepository();
    test('test create user', async () => {
        let res = await repository.create(userExample);
        user = cloneDeep(res);
        expect(res).toHaveProperty(['_id']);
        omit(res, ['_id']);
        expect(res).toEqual(userExample);

    });

    test('test find user', async () => {
        let res = await repository.findBy({"_id": user._id});
        expect(res[0]).toEqual(user);
    });

    test('test update user', async () => {
        user.email = "test@gmail.com";
        let res = await repository.update(user);
        expect(res).toEqual(1);
    });
});