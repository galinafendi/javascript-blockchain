# javascript-blockchain
Creating local blockchain and new cryptocurrency called Javacoin using Javascript

Credit: https://www.udemy.com/course/build-a-blockchain-in-javascript

To run the "javacoin" blockchain in your local:

1. Download Postman - https://www.postman.com/downloads/ (this will ask you to sign up for free, you can click on the faint "skip" at the bottom)
2. Open repository and install npm
3. The blockchain has 5 nodes, run them on separate command lines. For example, $npm run node_1 in one command window and $npm run node_2 in another command window. Do this for all 5 nodes.
4. Inputs to the blockchain API will be managed through Postman using JSON to hit the endpoints (from file networkNodes.js)
5. In Postman, send a request with these parameters in order to register nodes with each other:

- Type: POST

- URL: http://localhost:3001/register-and-broadcast-node

- Click on Body (found below the url input) -> raw (in the first dropdown after selecting Body) -> JSON (in the second dropdown next to raw)

- In the actual body JSON section where you can type inputs, copy and paste this JSON object:
    {
    "newNodeUrl": "http://localhost:3002"
    }
    
- Click on Send

- Change the port number in the JSON object to 3003 and hit Send again.

- Change the port number in the JSON object to 3004 and hit Send again.

- Change the port number in the JSON object to 3005 and hit Send again.

- In your internet browser window, open the blockchain in each node's URL in a separate tab (i.e. http://localhost:3001/blockchain)

- For each node, you will see a list of all of the registered nodes in the network (ports 3001-3005)

6. Back in Postman, let's create transactions:

- Open a new tab for another request

- Type: POST

- URL: http://localhost:3001/transaction/broadcast (the port number can be any of the registered ports, feel free to play around by creating transactions with the different port numbers)

- Click on Body (found below the url input) -> raw (in the first dropdown after selecting Body) -> JSON (in the second dropdown next to raw)

- In the actual body JSON section where you can type inputs, copy and paste this JSON object:
  
  {
      "amount": 94,
      "sender": "DKDLF394",
      "recipient": "LGORIE8392"
  }

- You may input anything you would like for the parameters, the above is one example. 

- Click Send

- When you refresh each tab (which hosts the different nodes), you will see this transaction in the pendingTransactions object.

- You can submit transactions with different parameter values and on different port numbers within the JSON object template shared above. After you hit send for each transaction, refresh each node to see it in the queue.

7. Mining a block:

- After you have submitted transactions and would like to mine a block, choose any node's URL and append it with /mine. For example, go to http://localhost:3003/mine

- This will mine the block on port 3003 and give a mining reward
  
8. Consensus:

- For each node to accept the new block, run each port with /consensus appended. For example, go to  http://localhost:3005/consensus
- Navigate back to /blockchain
- The new block will show in the chain and the pendingTransactions object will be cleared (except for the mining reward of course).



9. Block Explorer:

- Each node contains a copy of the Block Explorer dashboard which queries the Block Hash, Transaction ID, and Address of the blockchain. 
- To access the dashboard append the URL with /block-explorer. For example, go to http://localhost:3001/block-explorer
- Paste in the related values (found in the blockchain) of whichever query you would like to perform. Select the query type from the dropdown. 

  
Hope you enjoy javacoin! 
  
