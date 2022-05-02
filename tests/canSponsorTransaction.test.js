const { ethers } = require('hardhat')

let contract
let owner
let allowedUser1
let forbiddenUser1

beforeEach(async function () {
  [owner, allowedUser1, forbiddenUser1, user3, user4, user5] = await ethers.getSigners()

  const ExampleLogic = await ethers.getContractFactory('ExampleLogic')
  contract = await ExampleLogic.deploy([allowedUser1.address])
})


describe('canSponsorTransactionFor(sender, recipient, data)', () => {
  it('supports all hard coded list of recipient', async () => {
    const canSponsor = await contract.canSponsorTransactionFor(owner.address, allowedUser1.address, '0x')
    expect(canSponsor).toEqual(true)
  })


  it('returns false if user is not in allowed list', async () => {
    const canSponsor = await contract.canSponsorTransactionFor(owner.address, forbiddenUser1.address, '0x51848ee80000000000000000000000000000000000000000000000000000000000000001')
    expect(canSponsor).toEqual(false)
  })
})