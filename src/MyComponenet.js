import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CryptoJS from 'crypto-js';

function MyComponent() {
  const [result, setResult] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);
  const [playText, setPlayText] = useState(null);
  const [bet, setBet] = useState(null);

  async function connectToContract() {
    // Create an instance of the web3 provider using the MetaMask provider
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // Request access to MetaMask

    // Create an instance of the smart contract
    //const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'; // Replace with the address of your smart contract
    const contractAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788'; // Replace with the address of your smart contract
    const abi_ = [
      {
        "inputs": [],
        "name": "BET_MIN",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "REVEAL_TIMEOUT",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "bothPlayed",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "bothRevealed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getFinalOutput",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getOutcome",
        "outputs": [
          {
            "internalType": "enum RockPaperScissors.Outcomes",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getPlayOutput",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRegisterValue",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRevealOutput",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "initialBet",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "listOfPlayers",
        "outputs": [
          {
            "internalType": "address",
            "name": "MyAddr",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "OppAddr",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "bet",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "encryptedMove",
            "type": "bytes32"
          },
          {
            "internalType": "enum RockPaperScissors.Moves",
            "name": "movePlayer",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "encrMove",
            "type": "bytes32"
          }
        ],
        "name": "play",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "register",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "clearMove",
            "type": "string"
          }
        ],
        "name": "reveal",
        "outputs": [
          {
            "internalType": "enum RockPaperScissors.Moves",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "revealTimeLeft",
        "outputs": [
          {
            "internalType": "int256",
            "name": "",
            "type": "int256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "whoAmI",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]


    const contract = new web3.eth.Contract(abi_, contractAddress);
    setContract(contract);
    const addresses = await web3.eth.getAccounts();
    setAddress(addresses[0]);
    // await contract.methods.setData(10).send({
    //     from: addresses[0]   
    // });

    // Call a function on the smart contract
    
  }
  




  async function register(){

    // const result = await contract.methods.revealTimeLeft().call();
    
    const result = await contract.methods.register().send({from: address, value:bet});
    console.log(result);
    const call_result = await contract.methods.getRegisterValue().call();
    setResult(call_result);
  }


  function generateSHA256Hash(string) {
    const hash = CryptoJS.SHA256(string);
    return hash.toString(CryptoJS.enc.Hex);
  }

  async function play(){
    const hash = generateSHA256Hash(playText);
    // "0-hello" -> "0x8c57ac1c7a6832f4422e69043826479e40efad928394bc0b400330acf2e5bad3"
    const result = await contract.methods.play(`0x${hash}`).send({from: address});
    const call_result = await contract.methods.getPlayOutput().call();
    setResult(call_result);
  }

  async function getContractBalance(){
    const result = await contract.methods.getContractBalance().call({from: address});
    setResult(result.toString());
  }
  
  async function getOutcome(){
    const result = await contract.methods.getOutcome().send({from: address});
    console.log(result);
    const call_result = await contract.methods.getFinalOutput().call();
    setResult(call_result.toString());
  }
  
  async function reveal(){
    const result = await contract.methods.reveal(playText).send({from: address});
    console.log(result);
    const call_result = await contract.methods.getRevealOutput().call();
    setResult(call_result);
  }
  
  async function minimumBet(){
    // const result = await contract.methods.minimumBet().call({from: address});
    setResult("10000000000000000");
  }
  
  async function bothPlayed(){
    const result = await contract.methods.bothPlayed().call({from: address});
    setResult(result.toString());
  }

  async function bothRevealed(){
    const result = await contract.methods.bothRevealed().call({from: address});
    setResult(result.toString());
  }
  
  // async function initialBet(){
  //   const result = await contract.methods.minimumBet().send({from: address});
  //   setResult(result);
  // }
  
  // async function revealTimeLeft(){
  //   const result = await contract.methods.revealTimeLeft().call();
  //   setResult(result.toString());
  // }
  
  // async function revealTimeOut(){
  //   const result = await contract.methods.minimumBet().send({from: address});
  //   setResult(result);
  // }
  
  async function whoAmI(){
    const result = await contract.methods.whoAmI().call({from: address});
    setResult(result.toString());
  }

  useEffect(() => {
    connectToContract();
  }, []);

  function onPlayTextChange(event){
      console.log(event.target.value);
      setPlayText(event.target.value);
  }

  function onRegister(event){
    console.log(event.target.value);
    setBet(event.target.value);
}
  //async function resetGame(){
  //   const res = await contract.methods.reset_().send({from: address});
  //   console.log(res);
  // }

  return (
    <div>
      <br/>
      <br/>
      <button onClick={minimumBet}>Minimum Bet</button>
      <br/>
      <br/>
      <input onChange={onRegister}></input>
      <button onClick={register}>Register</button>
      <br/>
      <br/>
      <button onClick={whoAmI}>Who Am I</button>
      <br/>
      <br/>
      <input onChange={onPlayTextChange}></input>
      <button onClick={play}>Play</button>
      <br/>
      <br/>
      <button onClick={reveal}>Reveal</button>
      <br/>
      <br/>
      <button onClick={bothPlayed}>Both Played</button>
      <br/>
      <br/>
      <button onClick={bothRevealed}>Both Revealed</button>
      <br/>
      <br/>
      <button onClick={getContractBalance}>Get Contract Balance</button>
      <br/>
      {/* <br/>
      <button onClick={initialBet}>Initial Bet</button>
      <br/>
      <br/>
      <button onClick={revealTimeOut}>Reveal Time out</button>
      <br/>
      <br/> */}
      {/* <button onClick={revealTimeLeft}>Reveal Time Left</button>
      <br/> */}
      {/* <br/>
      <button onClick={resetGame}>Reset</button>
      <br/> */}
      <br/>
      <button onClick={getOutcome}>Get OutCome</button>
      {result && (<div><p>The result is: {JSON.stringify(result)}</p>
        {/* <p>The result is: {result}</p> */}
      </div>
      )
      }
    </div>
  );
}

export default MyComponent;
