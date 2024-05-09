process.env.NODE_ENV = "test";

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let item = {'name': 'ice cream', 'price': .99}

beforeEach(() => {
    items.push(item);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("get all items", async() =>{
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [item]});
    });
});

describe("GET /items/:name", () => {
    test("get specific items", async() =>{
        const res = await request(app).get("/items/ice%20cream");
        console.log(res)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item});
    });
});

describe("POST /items", () => {
    test("create a new item", async() => {
        const res = await request(app).post("/items").send({name: 'chicken leg', price: 2.99});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added:{"name": "chicken leg", "price": 2.99}});
    });
});

describe("PATCH /items/:name", () => {
    test("update an item", async() => {
        const res = await request(app).patch("/items/ice%20cream").send({name: 'popsicle', price: 1.50});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({updated:{"name": "popsicle", "price": 1.50}});
    });
});

describe("DELETE /items/:name", () => {
    test("update an item", async() => {
        const res = await request(app).delete("/items/ice%20cream")
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
    });
});