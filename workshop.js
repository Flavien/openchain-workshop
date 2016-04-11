var openchain = require("openchain");
var bitcore = require("bitcore-lib");
 
var seed = "your seed here";

// Load a private key from a seed 
var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
var address = privateKey.publicKey.toAddress();
 
// Calculate the accounts corresponding to the private key
var sourceAssetPath = "?";
var issuancePath = "?";
var assetPath = issuancePath;
var fromPath = "?";
var storagePath = "/storage/";
var issuedPath = "/issued/";

console.log("Issuance path: " + issuancePath);
console.log("From path: " + fromPath);
 
// Create an Openchain client and signer 
var client = new openchain.ApiClient("https://demo.openchain.io/");
var signer = new openchain.MutationSigner(privateKey);
 
// Initialize the client 
client.initialize().then(function () {
    
});