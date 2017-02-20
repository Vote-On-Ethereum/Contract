var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");

var Incrementer = artifacts.require("./Incrementer.sol");
var Poll = artifacts.require("./Poll.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  deployer.deploy(Incrementer);
  deployer.deploy(Poll);
};
