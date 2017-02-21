// var Migrations = artifacts.require("./Migrations.sol");
var Poll = artifacts.require("./Poll.sol");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
  deployer.deploy(Poll, "Who is the BEST?");
};
