/* eslint-env node, mocha */

let should = require("should");
let Client = require("../common/Client");

let knex = require("knex")({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
});

describe("Client", function() {

    before("Reset database and initialize test data", function(done) {
        this.timeout(5 * 1000);
        knex("client").select("*").del().asCallback((err) => {
            should(err).not.be.ok();
            done();
        })
    });

    let client_id = null;

    describe("create", function() {
        it("should create a new client in the database", function(done) {
            Client.create({
                name: "test1",
                build_success: true
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.name).equal("test1");
                client_id = client.id;
                done();
            });
        });
        it("should create a new client in the database", function(done) {
            Client.create({
                name: "test2",
                build_success:true
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.name).equal("test2");
                done();
            });
        });

        it("should create a new client in the database", function(done) {
            Client.create({
                name: "test3",
                build_success:true
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.name).equal("test3");
                done();
            });
        });

        it("should not create a client with an invalid language", function(done) {
            Client.create({
                name: "test4",
                language: "cpp1"
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });

        it("should not create a client with a given id", function(done) {
            Client.create({
                id: 1,
                name: "test4",
            }, (err) => {
                should(err).be.ok();
                done();
            });
        });
    });

    describe("updateById", function() {
        it("should update a client based on its id", function(done){
            Client.updateById(client_id, {
                language: "cpp",
            }, (err, client) => {
                should(err).not.be.ok();
                should(client.id).equal(client_id);
                should(client.language).equal("cpp");
                done();
            });
        });
    });
});
