import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import CandidateCard from './CandidateCard'
import InputForm from './InputForm'
import VotingApp from '../abis/VotingApp.json'




class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // how to detect metamask and our account 
  async loadWeb3() {
      // Modern dapp browsers window.ethereum metadata (e.g. chrome)
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    // Non-dapp browsers, i.e. no meta mask installed in browser
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;


    //load metamask wallet account and save it in state
    const accounts = await web3.eth.getAccounts();

    this.setState({account: accounts[0]})
    // find which blockchain you are on
    const networkId = await web3.eth.net.getId()

    // ensure you have migrated data from your truffle migrate
    const networkData = VotingApp.networks[networkId]

    if (networkData) {
      // load our smart contract. Smart contract loading needs an contract address + abi (json of smart contract)
      const abi = VotingApp.abi
      // log contract address on ganache/ether 
      const address = networkData.address
      // this is the smart contract of our Voting app loaded from the blockchain
      const votingApp = web3.eth.Contract(abi,address)
      this.setState({ votingApp: votingApp})
      // web3 functions have two methods (call() or send()). Send does something, call reads data
      const candidateCount = await votingApp.methods.candidateCount().call()
      // note we need candidate count as there's no way to know how long solidity mappings' are of our 'products'. This is why we counted the product count in votingApp.sol
      this.setState({candidateCount})
      // then we loop through candidates until the product count has been counted
      for (var i = 1; i <= candidateCount; i++) {
        // read each product from blockchain every loop
        const candidate = await votingApp.methods.candidates(i).call()
        // read set state each loop to i) current products in prior loops + this product from this loops
        this.setState({
          // es6 spread operator to take an key and add it to existing array 
          candidates: [...this.state.candidates, candidate]
        }) 
      }
      console.log(this.state.candidateCount.toNumber())
      console.log(this.state.candidates)
      // const readerAddress = window.ethereum.request({ method: 'eth_requestAccounts' })

    } else {
      window.alert('VotingApp contract not deployed to detected network')
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      account: '',
      candidateCount: 0,
      candidates: [],
    }
    // // need to bind function to the component (let react access it) and pass it as a prop
    this.createCandidate = this.createCandidate.bind(this)
    this.voteForCandidate = this.voteForCandidate.bind(this)
  }

  createCandidate(name) {
    console.log(this.state.account)
    this.state.votingApp.methods.createCandidate(name)
      .send({from:this.state.account})
  }

  voteForCandidate(id, candidateAddress) {
    this.state.votingApp.methods.voteForCandidate(id, candidateAddress)
      .send({from:this.state.account})
  }
  
  
  render() {
    return (
      <div>
        <Navbar account={this.state.account} /> 
        <div className= "bodyContainer">
          <div className = 'formContainer'>  
            <InputForm createCandidate={this.createCandidate}  />
          </div>
          {/* <div className='row'> 
            <CandidateCard account={this.state.account} voteForCandidate={this.voteForCandidate}/>  
          </div> */}
          <div className = 'candidateContainer'> 
            <h2>List of Candidates</h2>
            {this.state.candidates.map((candidate, key) => {
              return(
                <div key={key}>
                  {/* // key is critical as otherwise react will complain that identical parts of our looped code. */}
                  <CandidateCard account={this.state.account} voteForCandidate={this.voteForCandidate} candidate={candidate}/>  
                </div>
              )
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
