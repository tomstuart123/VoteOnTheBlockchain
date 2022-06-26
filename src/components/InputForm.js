import React, { Component } from 'react';
import './App.css';

class InputForm extends Component {
  
  render() {
    return (
    <div className = 'form'>
      <h2>Submit your Candidacy here</h2>
      <form 
            onSubmit= {(e) => {
              e.preventDefault()
              const candidateName = this.candidateName.value;
              this.props.createCandidate(candidateName);
            }}
      >
        <div className="form-group mr-sm-2">
            <input
              id="candidateName"
              type="text" 
              ref= {(input) => {this.candidateName = input }} 
              className="form-control"
              placeholder="Candidate Name"
              required />
        </div>
        <div>
          <button type="submit" className="btn btn-primary"> Submit my Candidacy </button>

        </div>
      </form>
            
    </div>
    );
  }
}

export default InputForm;
