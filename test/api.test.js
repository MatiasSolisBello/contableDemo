const request = require("supertest");

//usamos la variable de inicializacion de express
const app = require("../index");

//-------------------------------------------------
//Testing get all products endpoint
//-------------------------------------------------
describe("GET /api/producto", () => {
    it("responde con un json la lista de productos", (done) => {
        request(app)
            .get("/api/producto")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    });
});

//-------------------------------------------------
//Testing post products endpoint
//-------------------------------------------------
describe("POST /api/producto", () => {
    // 403 - Sin token
    // 401 - Token no válido
    //

    //403, sin token
    it("responde con un 403, sin token", (done) => {
        const data = {
            "nombre": "Cristal Texano",
            "descripcion": "2 gr.",
            "precio": 50000,
            "stock": "30000",
            "imagen": "",
            "bodega": "618abbe6ac6f793288e4d0c0"
        }
        request(app)
            .post("/api/producto")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(403)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    
    /*
    //401, Token no válido
    it("responde con un 401, Token no válido", (done) => {
        let token = "sffeec"
        const data = {
            "nombre": "Cristal Texano",
            "descripcion": "2 gr.",
            "precio": 50000,
            "stock": "30000",
            "imagen": "",
            "bodega": "618abbe6ac6f793288e4d0c0"
        }
        request(app)
            .post("/api/producto")
            .send(token)
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            //.expect(401)
            .end((err, res) => {
                if (err) return done(err);
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });

    
    //400, json vacio
    it("respond with 400 on bad request", (done) => {
        const data = {
            
        };
        request(app)
            .post("/api/producto")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(500)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });*/


})

//-------------------------------------------------
//Testing post products endpoint
//-------------------------------------------------