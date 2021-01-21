const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

// // testing chain, block, transactions methods

// bitcoin.createNewBlock(234, "OIKSDF9800SDFS", "SDF90SDFSDF9");


// //bitcoin.createNewBlock(3456, "H3J3J4K5K5", "JJWL3L5L6K6J5");

// bitcoin.createNewTransaction(100, "123BOB", "456JOE");


// bitcoin.createNewBlock(2556, "SDFSD78909SDF", "SDFSDF890FDGD");

// bitcoin.createNewTransaction(200, "123BOB", "456JOE");
// bitcoin.createNewTransaction(300, "123BOB", "456JOE");

// bitcoin.createNewBlock(237784, "KL54434J3L5", "JKL56KJ5J4J3K");

// //console.log(bitcoin);

// console.log(bitcoin.chain[2]);


// //testing hashing method

// const previousBlockHash = "SDFSAFD90SDFG0DFG";
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: "Jill",
//         recipient: "Joe"
//     },
//     {
//         amount: 30,
//         sender: "Sally",
//         recipient: "Sam"
//     },
//     {
//         amount: 200,
//         sender: "Bob",
//         recipient: "Matt"
//     }
// ];

// const nonce = 100;

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));



// //testing proof of work method

// const previousBlockHash = "SDFSAFD90SDFG0DFG";
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: "Jill",
//         recipient: "Joe"
//     },
//     {
//         amount: 30,
//         sender: "Sally",
//         recipient: "Sam"
//     },
//     {
//         amount: 200,
//         sender: "Bob",
//         recipient: "Matt"
//     }
// ];

// //console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 1662));


//testing chainIsValid

const jc1 = {
    "chain": [
    {
    "index": 1,
    "timeStamp": 1611208058415,
    "transactions": [],
    "nonce": 9,
    "hash": "Welcome to the",
    "previousBlockHash": "Genesis Block"
    },
    {
    "index": 2,
    "timeStamp": 1611242221768,
    "transactions": [],
    "nonce": 7008,
    "hash": "00008c570a621171dd7e8400de63321da3bda173084e3ed5f3ab256d18f6480e",
    "previousBlockHash": "Welcome to the"
    },
    {
    "index": 3,
    "timeStamp": 1611242286894,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "Mining Reward",
    "recipient": "2b50a4e05bac11ebb80443f2ad82e031",
    "transactionId": "b6631dc05bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 399,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "c5039f805bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 40,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "cecc81805bfb11ebb80443f2ad82e031"
    }
    ],
    "nonce": 10217,
    "hash": "0000d1b321249166169f58bd59d88df861dba16c808ff52886ceed198d6e762f",
    "previousBlockHash": "00008c570a621171dd7e8400de63321da3bda173084e3ed5f3ab256d18f6480e"
    },
    {
    "index": 4,
    "timeStamp": 1611242338305,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "Mining Reward",
    "recipient": "2b50a4e05bac11ebb80443f2ad82e031",
    "transactionId": "dd1742205bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 87,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "ee9122a05bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 100,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "f16a81605bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 38,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "f321ce505bfb11ebb80443f2ad82e031"
    },
    {
    "amount": 69,
    "sender": "adgfa",
    "recipient": "hjthj",
    "transactionId": "f50757305bfb11ebb80443f2ad82e031"
    }
    ],
    "nonce": 119309,
    "hash": "000074e2592046892807649736ef5913ad19f0fc1090bef613c42d7fe640a99b",
    "previousBlockHash": "0000d1b321249166169f58bd59d88df861dba16c808ff52886ceed198d6e762f"
    },
    {
    "index": 5,
    "timeStamp": 1611242346712,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "Mining Reward",
    "recipient": "2b50a4e05bac11ebb80443f2ad82e031",
    "transactionId": "fbbae2e05bfb11ebb80443f2ad82e031"
    }
    ],
    "nonce": 8422,
    "hash": "00005052e76d9852cf6ac618f602117fbed1be339471fab76531665b352da4cd",
    "previousBlockHash": "000074e2592046892807649736ef5913ad19f0fc1090bef613c42d7fe640a99b"
    },
    {
    "index": 6,
    "timeStamp": 1611242349223,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "Mining Reward",
    "recipient": "2b50a4e05bac11ebb80443f2ad82e031",
    "transactionId": "00bdb1505bfc11ebb80443f2ad82e031"
    }
    ],
    "nonce": 29127,
    "hash": "00007258f3a702420718f052b4f97f29f32dae7d5146330668b9feff8378c347",
    "previousBlockHash": "00005052e76d9852cf6ac618f602117fbed1be339471fab76531665b352da4cd"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "Mining Reward",
    "recipient": "2b50a4e05bac11ebb80443f2ad82e031",
    "transactionId": "023d25605bfc11ebb80443f2ad82e031"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    };

console.log("Valid: ", bitcoin.chainIsValid(jc1.chain));