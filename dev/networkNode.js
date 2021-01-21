//Creating API (aka node) for the blockchain

//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const { v1: uuid } = require("uuid"); 
const port = process.argv[2]; //access port variable in package.json file
const requestPromise = require("request-promise");


//Creating node addresses with unique strings
const nodeAddress = uuid().split("-").join("");

//New instance of Blockchain constructor aka new cryptocurrency
const javacoin = new Blockchain();

//Use body-parse library to parse data coming in JSON or form format to read/use in any of the endpoints
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Endpoints

//return entire blockchain
app.get("/blockchain", function (req, res) {
    res.send(javacoin);
});

//create new transaction in node and put in pendingTransactions
app.post("/transaction", function (req, res) {
    const newTransaction = req.body;
    const blockIndex = javacoin.addTransactionToPendingTransactions(newTransaction);
    res.json({ note: `Transaction will be added in block ${blockIndex}`});

});

//add broadcast for new transaction to all nodes
app.post("/transaction/broadcast", function (req, res) {
    //create new transaction
    const newTransaction = javacoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    //add to pendingTransactions array on current node
    javacoin.addTransactionToPendingTransactions(newTransaction);
    //push all requests into array for processing
    const requestPromisesArray = [];
    //broadcast transaction to other nodes
    javacoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + "/transaction",
            method: "POST",
            body: newTransaction,
            json: true
        };
        requestPromisesArray.push(requestPromise(requestOptions));
    });
    //run all requests
    Promise.all(requestPromisesArray)
    .then(data => {
        res.json({ note: "Transaction created and broadcast successfully" });
    });
});

//mine new block for javacoin
app.get("/mine", function (req, res) {
    //get previous block
    const lastBlock = javacoin.getLastBlock();
    //get previous block's hash
    const previousBlockHash = lastBlock["hash"];
    //define current block's data
    const currentBlockData = {
        transactions: javacoin.pendingTransactions,
        index: lastBlock["index"] + 1
    };
    //return calculated nonce
    const nonce = javacoin.proofOfWork(previousBlockHash, currentBlockData);
    //create hash for new block
    const blockHash = javacoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    //create new block
    const newBlock = javacoin.createNewBlock(nonce, previousBlockHash, blockHash);

    //broadcast new block to all nodes
    const requestPromisesArray = [];
    javacoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + "/receive-new-block",
            method: "POST",
            body: { newBlock: newBlock },
            json: true
        };

        requestPromisesArray.push(requestPromise(requestOptions));
    });
    Promise.all(requestPromisesArray)
    .then(data => {
        //call to /transactions/broadcast endpoint with mining reward data passed in
        const requestOptions = {
            uri: javacoin.currentNodeUrl + "/transaction/broadcast",
            method: "POST",
            body: {
                amount: 12.5,
                sender: "Mining Reward",
                recipient: nodeAddress
            },
            json: true
        };

        //send request
        return requestPromise(requestOptions);
    })
    .then(data => {
    //send response of mined block
    res.json({
        note: "New block mined and broadcast successfully",
        block: newBlock
    });
    });

});


//receive the new block that is being broadcast
app.post("/receive-new-block", function (req, res) {
    const newBlock = req.body.newBlock;
    //check if previous block hash on new block is equal to hash on last block in chain
    const lastBlock = javacoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock["index"] + 1 === newBlock["index"];
    if (correctHash && correctIndex) {
        javacoin.chain.push(newBlock);
        javacoin.pendingTransactions = [];
        res.json({ 
            note: "New block received and accepted",
            newBlock: newBlock
        });
    } else {
        res.json({ 
            note: "New block rejected",
            newBlock: newBlock
        });
    }
});


//Registering nodes in the endpoints

//register and broadcast new node to network
app.post("/register-and-broadcast-node", function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    //place (register) node in networkNodes array in Blockchain constructor if it doesn't already exist
    if (javacoin.networkNodes.indexOf(newNodeUrl) == -1)javacoin.networkNodes.push(newNodeUrl);

    //broadcast new node to network
    const registerNodesPromises = [];
    javacoin.networkNodes.forEach(networkNodeUrl => {
        //hit the register-node endpoint
        const requestOptions = {
            uri: networkNodeUrl + "/register-node",
            method: "POST",
            body: { newNodeUrl: newNodeUrl },
            json: true
        };

        registerNodesPromises.push(requestPromise(requestOptions));
    });

    //register all current nodes with the new node
    Promise.all(registerNodesPromises)
    .then(data => {
        //hit the register-nodes-bulk endpoint
        const bulkRegisterOptions = {
            uri: newNodeUrl + "/register-nodes-bulk",
            method: "POST",
            body: { allNetworkNodes: [ ...javacoin.networkNodes, javacoin.currentNodeUrl ] },
            json: true
        };

        return requestPromise(bulkRegisterOptions);
    })
    .then(data => {
        res.json({ note: "New node registered with network successfully" });
    });
});

//nodes will accept the newly registered node in the network
app.post("/register-node", function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;

    //check if node already exists in network and is not current URL, if it doesn't exist and it isn't current URL then add into the network
    const nodeNotAlreadyPresent = javacoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = javacoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) javacoin.networkNodes.push(newNodeUrl);

    res.json({ note: "New node registered successfully"} );
});

//register all nodes in network with the new node
app.post("/register-nodes-bulk", function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;

    //add new node to all existing nodes if new node is not already registerd and url is not the current node
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = javacoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = javacoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) javacoin.networkNodes.push(networkNodeUrl);
    });

    res.json({ note: "Bulk registration successful" });
});


//consensus endpoint
app.get("/consensus", function (req, res) {
    //send request to other nodes for their copies of the blockchain
    const requestPromisesArray = [];
    javacoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + "/blockchain",
            method: "GET",
            json: true
        };

        requestPromisesArray.push(requestPromise(requestOptions));
    });

    Promise.all(requestPromisesArray)
    .then(blockchains => {
        //iterate through all the blockchains on the nodes to find the longer blockchain
        const currentChainLength = javacoin.chain.length;
        let maxChainLength = currentChainLength;
        let newLongestChain = null;
        let newPendingTransactions = null;
        blockchains.forEach(blockchain => {
            if (blockchain.chain.length > maxChainLength) {
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPendingTransactions = blockchain.pendingTransactions;
            };
        });

        //if longer valid chain is found then replace chain on current node, otherwise keep current valid chain
        if (!newLongestChain || (newLongestChain && !javacoin.chainIsValid(newLongestChain))) {
            res.json({ 
                note: "Current chain has not been replaced",
                chain: javacoin.chain
            });
        } else if (newLongestChain && javacoin.chainIsValid(newLongestChain)) {
            javacoin.chain = newLongestChain;
            javacoin.pendingTransactions = newPendingTransactions;
            res.json({
                note: "This chain has been replaced",
                chain: javacoin.chain
            });
        }
    });
});


//Endpoints for querying on the dashboard

//return block with corresponding block hash
app.get("/block/:blockHash", function (req, res) {
    const blockHash = req.params.blockHash;
    const correctBlock = javacoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });
});

//retrun transaction corresponding to the transactionId
app.get("/transaction/:transactionId", function (req, res) {
    const transactionId = req.params.transactionId;
    const transactionData = javacoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block: transactionData.block
    });
});

//return transactions and current balance corresponding to an address
app.get("/address/:address", function (req, res) {
    const address = req.params.address;
    const addressData = javacoin.getAddressData(address);
    res.json({
        addressData: addressData
    });
});


//send html file for block explorer
app.get("/block-explorer", function (req, res) {
    res.sendFile("./block-explorer/index.html", { root: __dirname })
});


app.listen(port, function() {
    console.log(`Listening on port ${port}...`)
});