const Wheels = artifacts.require('Wheels')

contract('Wheels', (accounts) => {
  let inst

  before(async () => {
    inst = await Wheels.deployed()
  })

  it('should have empty offers list initially', async () => {
    let l = await inst.getOffersCount.call()
    assert.equal(l, 0)
  })

  it('should add new offer', async () => {
    await inst.newOffer('0xf017112200d511ee9a3ab4e52e8e2bc40fd2669d9c44b89164107e9898cd9698c1506c5aa', { from: accounts[0] })
    let l = await inst.getOffersCount.call()
    assert.equal(l, 1)

    let offer = await inst.offers.call(0)
    let owner = offer[1]
    assert.equal(accounts[0], owner)
  })
})
