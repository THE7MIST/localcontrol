const express = require('express')
const app = express()

app.use(express.json());
const cors = require("cors")


app.use(cors(
  {
    origin: "*",}
))

const port = 3000
require("dotenv").config();



const ethers = require('ethers')
const API_URL = process.env.API_URL;
let PRIVATE_KEY;
let contractAddress;

let provider;
let signer;

let contractInstance;

// contractInstance.transaction({ value: ethers.utils.parseEther("0.004")})
// contractInstance.setValue(1000000000000000*1).then(
    // const {
    //     abi,
    //   } = require("./artifacts/contracts/Lock.sol/DeployPlace.json");
    //   const contractInstance = new ethers.Contract(contractAddress, abi, signer);
//  )

app.post('/InitApi/:contractAddr/:ApiKey', (req, res) => {
    contractAddress  = req.params.contractAddr
     PRIVATE_KEY = req.params.ApiKey
  
   const {abi,} = req.body

    try{provider = new ethers.providers.JsonRpcProvider(API_URL);
    signer = new ethers.Wallet(PRIVATE_KEY, provider);
    contractInstance = new ethers.Contract(contractAddress,abi,signer);
    console.log(contractAddress,PRIVATE_KEY)
    res.send('200')}
    catch(error){
        res.send('500')
    }
  })


  app.get('/getOwnerAddrres s', (req, res) => {
    
    try {
        contractInstance.getOwnerAddress().then(val=>res.send(val))
    } catch (error) {
       res.send('500') 
    }
  })
  

  app.get('/setValue/:value', (req, res) => {

try {
         contractInstance.setValue(1000000000000000*parseInt(req.params.value)).then(res.send(200))
    
} catch (error) {
    res.send('500')
}  })
  app.get('/historyOwnership', (req, res) => {

   try {
      contractInstance.getOwnerHistory().then(val=>res.send(val))
   } catch (error) {
    res.send('500')
   }
    
    })

  
  app.get('/transaction', (req, res) => {
   try {
     contractInstance.transaction().then(res.send(200))
   } catch (error) {
    res.send('500')
   }
}
     
     )

  
  

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
// contractInstance.getOwnerAddress().then(res=>console.log(res))
