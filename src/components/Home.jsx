import React, { useEffect, useState } from "react";
import WalletBalance from "./WalletBalance";
import {ethers} from 'ethers';
import NFT from './NFT.sol/NFT.json'
import './home.css'
import { ImageList } from "@mui/material";


const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send('eth_requestAccounts', [])

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress,NFT.abi,signer)

function Home(){
    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
      getCount();
    }, []);
  
    const getCount = async () => {
      const count = await contract.count();
      console.log(parseInt(count));
      setTotalMinted(parseInt(count));
    };
  
    return (
      <div>
          <WalletBalance />
  
          {Array(totalMinted + 1)
          .fill(0)
          .map((_, i) => (
              <div key={i}>
              <NFTImage tokenId={i} getCount={getCount} />
              </div>
          ))}
      </div>
    );
}

function NFTImage({ tokenId, getCount }) {
    const contentId = 'QmStkYjM1ukTbHJyqJjq2Xu1MGdTkKR3tEhwiM1xJRjdFj';
    const metadataURI = `${contentId}/${tokenId}.json`;
    const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  
    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
      getMintedStatus();
    }, [isMinted]);
  
    const getMintedStatus = async () => {
      const result = await contract.isContentOwned(metadataURI);
      console.log(result)
      setIsMinted(result);
    };
  
    const mintToken = async () => {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.payToMint(addr, metadataURI, {
        value: ethers.utils.parseEther('0'),
      });
  
      await result.wait();
      getMintedStatus();
      getCount();
    };
  
    async function getURI() {
      const uri = await contract.tokenURI(tokenId);
      alert(uri);
    }
    return (
      <div>
        <img src={isMinted ? imageURI : './img/placeholder.png'}></img>
          <h5>ID #{tokenId}</h5>
          {!isMinted ? (
            <button onClick={mintToken} className='button'>
              Mint
            </button>
          ) : (
            <button onClick={getURI}>
              Taken! Show URI
            </button>
          )}
      </div>
    );
  }


export default Home