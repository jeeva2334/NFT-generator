import { useState } from "react";
import { ethers } from "ethers";
import './home.css';

function WalletBalance(){

    const [balance,setBalance] = useState();
    const getBalance= async ()=>{
        const [account] = await window.ethereum.request({method: 'eth_requestAccounts'});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    }

    return(
        <div>
            <div>
                <h5>Balance:{balance}</h5>
            </div>
            <div>
                <button onClick={()=>getBalance()} className='balanceBtn'>Show the balance</button>
            </div>
        </div>
    )

}

export default WalletBalance;