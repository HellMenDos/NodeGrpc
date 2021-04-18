const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("data.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const dataPackage = grpcObject.dataPackage;

const server = new grpc.Server();

server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(dataPackage.data.service,
    {
        "addData": addData,
        "readData":readData,
        "deleteData":deleteData,
        "putData":putData
    });

server.start();

var users = []

function addData(call, callback) {
    let id = users.length
    user = {
        id:id,
        name:call.request.name,
        pass:call.request.password
        }
    
    users.push(user)
    callback(null, user);
}


function readData(call, callback) {
    console.log(users)
    callback(null, {"items": users})   
}

function deleteData(call, callback) {
    users = users.filter((user)=> user.id != call.request.id)
    console.log(users)
    callback(null, null);
}

function putData(call, callback) {
    user = users.map((user)=> user.id == call.request.id)
    user.name = call.request.name
    user.password = call.request.password
    console.log(user)
    callback(null,user)

}