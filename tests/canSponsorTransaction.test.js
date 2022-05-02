const { ethers } = require('hardhat')

const contracts = {}
let owner
let allowedUser1
let forbiddenUser1

beforeEach(async function () {
  [owner, allowedUser1, forbiddenUser1, user3, user4, user5] = await ethers.getSigners()

  const NFT = await ethers.getContractFactory('NFT')
  contracts.nft = await NFT.deploy()

  const ExampleLogic = await ethers.getContractFactory('ExampleLogic')
  contracts.logic = await ExampleLogic.deploy([allowedUser1.address], contracts.nft.address)

})


describe('canSponsorTransactionFor(sender, recipient, data)', () => {
  it('supports all hard coded list of recipient', async () => {
    const canSponsor = await contracts.logic.canSponsorTransactionFor(owner.address, allowedUser1.address, '0x')
    expect(canSponsor).toEqual(true)
  })

  it('returns true for nft owners', async () => {
    await contracts.nft.connect(user3).mint()
    const canSponsor = await contracts.logic.canSponsorTransactionFor(user3.address, forbiddenUser1.address, '0x')
    expect(canSponsor).toEqual(true)
  })

  it('returns false for none-nft owners', async () => {
    const canSponsor = await contracts.logic.canSponsorTransactionFor(user3.address, forbiddenUser1.address, '0x')
    expect(canSponsor).toEqual(false)
  })

  it('returns false if user is not in allowed list', async () => {
    const canSponsor = await contracts.logic.canSponsorTransactionFor(owner.address, forbiddenUser1.address, '0x')
    expect(canSponsor).toEqual(false)
  })
})