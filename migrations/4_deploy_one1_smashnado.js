/* global artifacts */
require('dotenv').config({ path: '../.env' })
const ETHSmashnado = artifacts.require('ONESmashnado')
const Verifier = artifacts.require('Verifier')
const hasherContract = artifacts.require('Hasher')


module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { MERKLE_TREE_HEIGHT, ETH_AMOUNT_O } = process.env
    const verifier = await Verifier.deployed()
    const hasherInstance = await hasherContract.deployed()
    await ETHSmashnado.link(hasherContract, hasherInstance.address)
    const smashnado = await deployer.deploy(ETHSmashnado, verifier.address, ETH_AMOUNT_O, MERKLE_TREE_HEIGHT, accounts[0])
    console.log('ONE Smashnado\'s address ', smashnado.address)
  })
}
