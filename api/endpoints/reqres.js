const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.API_REQRES_URL);

const getOneMember = (id) => api.get(`/api/users/${id}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

const getListMember = (param) => api.get(`/api/users/`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .query(param);

module.exports = {
    getOneMember,
    getListMember
}