const {expect} = require('chai')
const {ethers} = require('hardhat');

describe("NFT",function(){
    it("Deployment test",async function(){
        const [owner] = await ethers.getSigners();
        const NFT = await ethers.getContractFactory('NFT');
        const nft = await NFT.deploy();
        await nft.deployed();

        const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
        const metadataURI = 'cid/test.png';

        let balance = await nft.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await nft.payToMint(recipient,metadataURI,{
            value: ethers.utils.parseEther('0')
        })

        await newlyMintedToken.wait();

        balance = await nft.balanceOf(recipient)
        expect(balance).to.equal(1);

        expect(await nft.isContentOwned(metadataURI)).to.equal(true)

    })
})