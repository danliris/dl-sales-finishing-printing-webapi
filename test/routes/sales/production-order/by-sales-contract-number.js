require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");

var validate = require("dl-models").validator.sales.productionOrder;
var Model = require("dl-models").sales.ProductionOrder;
var util = require("dl-module").test.data.sales.productionOrder;
var uri = "/production-orders-by-sales-contract-number";
var uriProductionOrder = "/production-orders";

var request = Request(host);
var jwt;

before("#00. get security token", function (done) {
    var getToken = require("../../../token");
    getToken()
        .then((token) => {
            jwt = token;
            done();
        })
        .catch((e) => {
            done(e);
        });
});

var createdDataLocation;
it(`#01. create new data and set header.location- [POST]${uriProductionOrder}`, function (done) {
    util.getNewData()
        .then((data) => {
            request
                .post(uriProductionOrder)
                .send(data)
                .set("authorization", `JWT ${jwt}`)
                .set("Accept", "application/json")
                .expect(201)
                .expect("Content-Type", "application/json")
                .end(function (err, response) {
                    if (err)
                        done(err);
                    else {
                        var result = response.body;
                        result.should.have.property("apiVersion");
                        result.should.have.property("message");

                        var header = response.header;
                        header.should.have.property("location");
                        createdDataLocation = header.location;

                        done();
                    }
                });
        })
        .catch((e) => {
            done(e);
        });
});

var createdData;
it(`#02. get created data from header.location [GET]${uriProductionOrder}/:id`, function (done) {
    request
        .get(createdDataLocation)
        .set("authorization", `JWT ${jwt}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property("data");
                result.data.should.instanceOf(Object);

                var data = new Model(result.data);

                createdData = data;
                done();
            }
        });
});

it(`#03. get created data from sales contract no [GET]${uri}/:salesContractNo`, function (done) {
    request
        .get(`${uri}/${encodeURIComponent(createdData.salesContractNo)}`)
        .set("authorization", `JWT ${jwt}`)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", "application/json")
        .end(function (err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property("data");
                result.data.should.instanceOf(Object);

                var data = new Model(result.data);

                done();
            }
        });
});