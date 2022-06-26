import React, { Component } from 'react';
import './App.css';

class CandidateCard extends Component {
  
  render() {
    return (
        
        <div className='candidateCard'>
            <p></p>
            <h4>{this.props.candidate.id.toString()}. {this.props.candidate.candidateName} </h4>
            <ul>
                <li> Identifiable Ethereum Address - {this.props.candidate.candidateAddress}</li>
                <li> No. of Votes so far - {this.props.candidate.voteCount.toString()}</li>
            </ul> 
            {/* this.props.purchaseProduct(event.target.name, event.target.value) */}
            
            <button 
                name={this.props.candidate.id}
                onClick={(event) => {
                    this.props.voteForCandidate(event.target.name, this.props.candidate.candidateAddress)
                    console.log('clicked')
                }}
            >
            Vote for Candidate
            </button> { this.props.candidate.candidateAddress != this.props.account ? null
                : <p className='disclaimer'> *Note you will get a metamask error if you try to vote for yourself </p>
            }
            
            
            
        </div>
    );
  }
}

export default CandidateCard;
