//Import sha256 library
const sha256 = require("sha256");

// Create Blockchain and its methods

class Blockchain {
    constructor() {
        //creating data structure of the blockchain
        this.chain = [];
        this.pendingTransactions = [];

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
            recipient: recipient
        };

        //adding each transaction to pendingTransactions array
        this.pendingTransactions.push(newTransaction);

        //adding transaction to new block which appends the last one in the chain 
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
}


module.exports = Blockchain;