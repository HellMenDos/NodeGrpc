const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("data.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const dataPackage = grpcObject.dataPackage;


const client = new dataPackage.data("localhost:40000", grpc.credentials.createInsecure())

// POST
client.addData({
    "name": Math.random().toString(36).substring(7),
    "password": Math.random().toString(36).substring(7)
}, (err, response) => {
    console.log(response)
})

// GET
client.readData(null, (err, response) => {
    console.log(response)
})


/*
UPDATE
client.putData({
    "id":2,
    "name": "dsfsf",
    "password": "dsfsf"
}, (err, response) => {
    console.log(response)
})
*/

/*
DELETE
client.deleteData({
    "id":2
}, (err, response) => {
    console.log(response)
})
*/

