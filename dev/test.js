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


//testing genesis block

console.log(bitcoin);