var Poll = artifacts.require("./Poll.sol");

contract('Poll', function() {
  it("is owned", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.owner();
    })
    .then(function(_owner) {
      let owner = _owner.valueOf();
      assert(owner, "owner is empty");
    })
  })

  it("add proposal", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.addProposal("proposal first");
    })
    .then(function() {
      return instance.addProposal("proposal second");
    })

    .then(function() {
      return instance.proposalsCount();
    })
    .then(function(_proposalsCount) {
      let proposalsCount = _proposalsCount.valueOf();
      assert.equal(proposalsCount, 2, "number of proposals is not 2");
    })

    .then(function() {
      return instance.proposals(0);
    })
    .then(function(proposal) {
      let name = proposal[0];
      assert.equal(name, "proposal first", "name of proposal 0 is not the same");
    })

    .then(function() {
      return instance.proposals(1);
    })
    .then(function(proposal) {
      let name = proposal[0];
      assert.equal(name, "proposal second", "name of proposal 1 is not the same");
    })
  })

  it("numberOfVote should start at 0", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.numberOfVote();
    })
    .then(function(_numberOfVote) {
      let numberOfVote = _numberOfVote.valueOf();
      // console.log(numberOfVote + " total votes");
      assert.equal(numberOfVote, 0, "numberOfVote is not 0");
    })
  })

  it("should vote", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.addProposal("proposal first");
    })
    .then(function() {
      return instance.addProposal("proposal second");
    })

    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 1);
    })

    .then(function() {
      return instance.votersHash(0);
    })
    .then(function(_voter) {
      let voter = _voter.valueOf();
      // console.log(_voter, voter);
      assert.equal(voter, "0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", "voter hash is not equal");
    })

    .then(function() {
      return instance.numberOfVote();
    })
    .then(function(_numberOfVote) {
      let numberOfVote = _numberOfVote.valueOf();
      // console.log(numberOfVote + " total votes");
      assert.equal(numberOfVote, 1, "numberOfVote is not 1");
    })

    .then(function() {
      return instance.numberOfVoteForProposal(1);
    })
    .then(function(numberOfVoteForProposal) {
      // let name = new Buffer(proposal[0].valueOf().substr(2), 'hex').toString('utf8');
      let voteCount = numberOfVoteForProposal.valueOf();
      assert.equal(voteCount, 1, "voteCount is not 1");
    })
  });

  it("should modify vote", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.addProposal("proposal first");
    })
    .then(function() {
      return instance.addProposal("proposal second");
    })

    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 1);
    })
    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 1);
    })
    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 0);
    })

    .then(function() {
      return instance.numberOfVote();
    })
    .then(function(_numberOfVote) {
      let numberOfVote = _numberOfVote.valueOf();
      assert.equal(numberOfVote, 1, "numberOfVote is not 1");
    })

    .then(function() {
      return instance.numberOfVoteForProposal(0);
    })
    .then(function(numberOfVoteForProposal) {
      let voteCount = numberOfVoteForProposal.valueOf();
      assert.equal(voteCount, 1, "voteCount is not 1");
    })
  });

  it("get voter data", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.addProposal("proposal first");
    })
    .then(function() {
      return instance.addProposal("proposal second");
    })

    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 1);
    })

    .then(function() {
      return instance.voters("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271");
    })
    .then(function(voter) {
      let voted = voter[0].valueOf();
      let proposalVoted = voter[1].valueOf();
      let votersHashIndex = voter[2].valueOf();
      assert.equal(voted, true, "voted is not true");
      assert.equal(proposalVoted, 1, "proposalVoted is not 1");
    })

    .then(function() {
      return instance.votersHash(0);
    })
    .then(function(_voterAdresse) {
      let voterAdresse = _voterAdresse.valueOf();
      return voterAdresse;
    })
    .then(function(voterAdresse) {
      return instance.voters(voterAdresse);
    })
    .then(function(voter) {
      let voted = voter[0].valueOf();
      let proposalVoted = voter[1].valueOf();
      let votersHashIndex = voter[2].valueOf();
      assert.equal(voted, true, "voted is not true");
      assert.equal(proposalVoted, 1, "proposalVoted is not 1");
    })
  });

  it("numberOfVotePerProposal", function() {
    var instance;
    return Poll.new("question?")
    // return Poll.deployed()
    .then(function(_instance) {
      instance = _instance
    })

    .then(function() {
      return instance.addProposal("proposal first");
    })
    .then(function() {
      return instance.addProposal("proposal second");
    })

    .then(function() {
      return instance.vote("0xb18aaa6c6b929b866051b69a785a6cdce5bdd564d41be247c7d5ef7c2e2e2271", 0);
    })
    .then(function() {
      return instance.vote("0xd38681074467c0bc147b17a9a12b9efa8cc10bcf545f5b0bccccf5a93c4a2b79", 1);
    })
    .then(function() {
      return instance.vote("0x026ad9b14a7453b7488daa0c6acbc258b1506f52c441c7c465474c1a564394ff", 1);
    })

    .then(function() {
      return instance.numberOfVotePerProposal();
    })
    .then(function(numberOfVotePerProposal) {
      let numberOfVote0 = numberOfVotePerProposal[0].valueOf();
      let numberOfVote1 = numberOfVotePerProposal[1].valueOf();
      assert.equal(numberOfVote0, 1, "numberOfVote0 is not 1");
      assert.equal(numberOfVote1, 2, "numberOfVote1 is not 2");
    })
  })
});
