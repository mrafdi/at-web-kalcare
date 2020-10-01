const assert = require('chai').expect;
const ep = require('../endpoints/reqres.js');
const schema = require('../data/reqres_member_schema.json');
var chai = require('chai');
chai.use(require('chai-json-schema'));

const testCase = {
    "positive" : {
       "getMember" : "As a User, I want to get the info of a member",
    }
};

describe(`Reqres API test`, () => {
    it(`${testCase.positive.getMember}`, async () => {
        const param = {
            page: '2',
        };
        console.log(param.page)
        const response = await ep.getListMember(param);
        assert(response.status).to.equal(200);
        assert(response.body).to.be.jsonSchema(schema);
        // console.log(response.body)
    });
});