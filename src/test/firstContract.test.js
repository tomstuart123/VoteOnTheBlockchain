const VotingApp = artifacts.require("VotingApp");

contract('VotingApp', (accounts) => {
  let votingApp

  before(async () => {
    votingApp = await VotingApp.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await votingApp.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await votingApp.name()
      assert.equal(name, 'VotingApp')
    })

  })
})