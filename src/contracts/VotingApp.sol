pragma solidity ^0.5.0;

contract VotingApp {
    
    uint public candidateCount = 0;

    string public name;

    // create for candidate
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public candidateAddresses;
    mapping(address => bool) public voterAddresses;


    //Defining the struct for our candidates
    struct Candidate {
        uint id;
        string candidateName;
        address candidateAddress;
        uint voteCount;

    }

    event CandidateCreated(
        uint id,
        string candidateName,
        address candidateAddress,
        uint voteCount
    );

    event VoteMade (
        address candidateAddress,
        address voterAddress,
        uint _totalVote
    );

    // constructor function runs first whenever contract is deployed
    constructor() public {
        name = "VotingApp Redo";
    }
    

    // save to callData as neither parameter will be altered and it's an external function 
    function createCandidate(string calldata _candidateName ) external {
        // does caller exist
        require(msg.sender != address(0), "Sender address must be valid");
        address _newAddress = address(msg.sender);
        require(!candidateAddresses[msg.sender],"this caller already submitted");
        // require(_newAddress != address(0));
        // add to counter
        candidateCount = candidateCount + 1;
        // call Candidate struct to create new candidate + to the candidates[] array
        candidates[candidateCount] = Candidate(candidateCount, _candidateName, _newAddress, 0);
        candidateAddresses[_newAddress] = true;
        emit CandidateCreated(candidateCount, _candidateName, _newAddress, 0); 
    }

    function voteForCandidate(uint _id, address _candidateAddress) external {
        require(!voterAddresses[msg.sender],"this voter already voted");
        require(msg.sender != _candidateAddress ,"you can't vote for yourself");
        // used the passed in id to access candidate object and raise voteCount by +1
        uint _currentVoteCount = candidates[_id].voteCount ++;
        // send event that this is done
        voterAddresses[msg.sender] = true;
        emit VoteMade(_candidateAddress, msg.sender, _currentVoteCount);

    }


    



}