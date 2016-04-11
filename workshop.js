var openchain = require("openchain");
var bitcore = require("bitcore-lib");
 
var seed = "your seed here";

// Load a private key from a seed 
var privateKey = bitcore.HDPrivateKey.fromSeed(seed, "openchain");
var address = privateKey.publicKey.toAddress();
 
// Calculate the accounts corresponding to the private key
var sourceAssetPath = "/asset/p2pkh/XvFZfScne2h1KkWjuqTjZzzKEcaFbGWx4d/";
var issuancePath = "/asset/p2pkh/" + address + "/";
var assetPath = issuancePath;
var fromPath = "/p2pkh/" + address + "/";
var storagePath = "/storage/";
var issuedPath = "/issued/";

console.log("Issuance path: " + issuancePath);
console.log("From path: " + fromPath);
 
// Create an Openchain client and signer 
var client = new openchain.ApiClient("https://demo.openchain.io/");
var signer = new openchain.MutationSigner(privateKey);
 
// Initialize the client 
client.initialize().then(function () {
    
    client.getAccountRecord(fromPath, sourceAssetPath).then(function(result) {
        var amount = result.balance;
        console.log("Balance: " + amount.toString());
        
        return new openchain.TransactionBuilder(client)
            // Add the key to the transaction builder 
            .addSigningKey(signer)
            // Add some metadata to the transaction 
            .setMetadata({ "memo": "Coinsilium workshop!" })
            .updateAccountRecord(fromPath, sourceAssetPath, -amount)
            .then(function (transactionBuilder) {
                return transactionBuilder.updateAccountRecord(storagePath, sourceAssetPath, amount);
            }).then (function (transactionBuilder) {
                return transactionBuilder.updateAccountRecord(issuancePath, assetPath, -amount);
            }).then (function (transactionBuilder) {
                return transactionBuilder.updateAccountRecord(issuedPath, assetPath, amount);
            }).then (function (transactionBuilder) {
                return transactionBuilder.submit();
            })
            .then(function (result) { console.log(result); }, function (result) { console.error(result); }); 
    });
});