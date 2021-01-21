//Import sha256 library
const sha256 = require("sha256");

//Import uuid library
const { v1: uuid } = require("uuid"); 

//Importing node URLs from package.json
const currentNodeUrl = process.argv[3];

// Create Blockchain and its methods

class Blockchain {
    constructor() {
        //creating data structure of the blockchain
        this.chain = [];
        this.pendingTransactions = [];

        //assigning network node URLs to the blockchain
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];

        //Genesis block
        this.createNewBlock(9, "Genesis Block", "Welcome to the");
    }

    createNewBlock(nonce, previousBlockHash, hash) {
        //creating data structure of block
        const newBlock = {
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce: nonce,
            hash: hash,
            previousBlockHash: previousBlockHash
        };

        //pending transactions are collected
        this.pendingTransactions = [];

        //adding block of pending transactions to blockchain
        this.chain.push(newBlock);

        //clearing pushed block for new transactions
        return newBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    createNewTransaction(amount, sender, recipient) {
        const newTransaction = {
            //creating data structure of new transaction
            amount: amount,
            sender: sender,
            recipient: recipient,
            transactionId: uuid().split("-").join("")
        };

        return newTransaction;
    }

    //take transaction object and add it to pendingTransactions to enable this update for broadcast for all nodes in network
    addTransactionToPendingTransactions(transactionObj) {
        this.pendingTransactions.push(transactionObj);
        return this.getLastBlock()["index"] + 1;
    }

    hashBlock(previousBlockHash, currentBlockData, nonce) {
        //creates 1 hash by combining parameters in method; creates strings from non-string data
        const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);

        //using sha256 library to create and return hash of stringified data in "dataAsString"
        const hash = sha256(dataAsString);
        return hash;
    }

    proofOfWork(previousBlockHash, currentBlockData) {
        //repeatedly run hashBlock method until correct hash is produced - one starting with 0000

        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

        //continuously change nonce value until correct hash is found and return the correct nonce
        while (hash.substring(0, 4) !== "0000") {
            nonce++;
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
        }

        return nonce;
    }

    //validation of chain
    chainIsValid(blockchain) {
        let validChain = true;
        for (var i = 1; i < blockchain.length; i++) {
            const currentBlock = blockchain[i];
            const previousBlock = blockchain[i -1];
            //re-hash every block to ensure hash beginning (and hash's data) is the same
            const blockHash = this.hashBlock(
                previousBlock["hash"], 
                { transactions: currentBlock["transactions"], index: currentBlock["index"] }, 
                currentBlock["nonce"]);
            
            if (blockHash.substring(0, 4) !== "0000") validChain = false;


            if (currentBlock["previousBlockHash"] !== previousBlock["hash"]) validChain = false;
        };

        //validate Genesis block
        const genesisBlock = blockchain[0];
        const correctNonce = genesisBlock["nonce"] === 9;
        const correctPreviousBlockHash = genesisBlock["previousBlockHash"] === "Genesis Block";
        const correctHash = genesisBlock["hash"] === "Welcome to the";
        const correctTransactions = genesisBlock["transactions"].length === 0;

        if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

        return validChain;
    }

    //iterate through blockchain, search for block hash and return the block
    getBlock(blockHash) {
        let correctBlock = null;
        this.chain.forEach(block => {
            if (block.hash === blockHash) correctBlock = block;
        });
        return correctBlock;
    }

    //iterate through blockchain, search for transaction Id and return the transaction
    getTransaction(transactionId) {
        let correctTransaction = null;
        let correctBlock = null;
        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if (transaction.transactionId = transactionId) {
                    correctTransaction = transaction;
                    correctBlock = block;
                };
            });
        });

        return {
            transaction: correctTransaction,
            block: correctBlock
        };
    }

    //iterate through blockchain, search for address Id and return the transactions of the address along with current balance
    getAddressData(address) {
        const addressTransactions = [];
        this.chain.forEach(block => {
            block.transactions.forEach(transaction => {
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction);
                };
            });
        });

        //calculate balance
        let balance = 0;
        addressTransactions.forEach(transaction => {
            if (transaction.recipient === address) balance += transaction.amount;
            else if (transaction.sender === address) balance -+ transaction.amount;
        });
        return {
            addressTransactions: addressTransactions,
            addressBalance: balance
        };
    }
}


module.exports = Blockchain;