/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ONESmashnado = artifacts.require('ONESmashnado')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, ETH_AMOUNT_H } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ONESmashnado.link(hasherContract, hasherInstance.address)
    const smashnado = await deployer.deploy(ONESmashnado, verifier.address, ETH_AMOUNT_H, MERKLE_TREE_HEIGHT, accounts[0])
    console.log('ONE Smashnado\'s address ', smashnado.address)
  })
}
