/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const jayStakingPoolABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "_balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenURIs",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const jayTokenABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_decimals",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "_initialSupply",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const stakingPoolAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const Home = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [poolId, setPoolId] = useState(1);  // Assuming 1 pool exists

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        // Check if MetaMask or an Ethereum provider is available
        if (typeof window.ethereum === 'undefined') {
          throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
        }
  
        const _provider = new ethers.providers.Web3Provider(window.ethereum); // Ensure ethers is imported
        const _signer = _provider.getSigner();
        const _contract = new ethers.Contract(stakingPoolAddress, jayStakingPoolABI, _signer);
        
        setProvider(_provider);
        setSigner(_signer);
        setContract(_contract);
  
        const address = await _signer.getAddress();
        setWalletAddress(address);
  
        const userBalance = await _provider.getBalance(address);
        setBalance(ethers.utils.formatEther(userBalance));
  
        const staked = await _contract.getStakedBalance(poolId, address);
        setStakedBalance(ethers.utils.formatEther(staked));
      } catch (error) {
        console.error('Error initializing Ethereum provider:', error.message);
        toast(error.message); 
      }
    };
  
    init();
  }, [poolId]);
  

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // window.location.reload();
        navigate('/createpool');
      } catch (err) {
        console.error('Error connecting to wallet:', err);
      }
    } else {
      toast.error('Please install MetaMask');
    }
  };

  const stakeTokens = async (data) => {
    const stakingAmount = ethers.parseEther(data.amountToStake);
    const stakingTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const stakingTokenContract = new ethers.Contract(stakingTokenAddress, jayTokenABI, signer);
    
    await stakingTokenContract.approve(stakingPoolAddress, stakingAmount);
    await contract.stake(poolId, stakingAmount);
    window.location.reload();
  };

  const claimReward = async () => {
    await contract.claimReward(poolId);
    window.location.reload();
  };

  const withdrawTokens = async () => {
    await contract.withdraw(poolId, ethers.parseEther(stakedBalance));
    window.location.reload();
  };

  return (
    <div className='bg-gradient-to-tr from-blue-500 via-blue-700 to-blue-400 w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className="bg-white w-full sm:w-3/4 md:w-2/4 lg:w-1/3 h-[95vh] rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6">Jay Staking Pool</h1>

        {walletAddress ? (
          <div className="text-center">
            <p>Connected Wallet: <strong>{walletAddress}</strong></p>
            <p>Your Wallet Balance: <strong>{balance} ETH</strong></p>
            <p>Your Staked Balance: <strong>{stakedBalance} Tokens</strong></p>
          </div>
        ) : (
          <button 
            className="bg-blue-600 w-full md:w-3/4 md:ml-12 hover:bg-purple-950 text-white font-semibold px-4 py-2 rounded-xl" 
            onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <form className="mt-8 text-center " onSubmit={handleSubmit(stakeTokens)}>
          <input
            type="text"
            placeholder="Amount to stake"
            className="border placeholder:text-center bg-slate-200 border-gray-300 p-2 rounded-lg mb-4 w-full"
            {...register('amountToStake', { required: 'Amount to stake is required', pattern: { value: /^[0-9]*[.]?[0-9]+$/, message: 'Please enter a valid number' } })}
          />
          {errors.amountToStake && <p className="text-red-500">{errors.amountToStake.message}</p>}

          <button 
            className="bg-green-500 md:w-3/4  text-white hover:bg-green-800 px-8 py-2 w-full rounded-xl" 
            type="submit">
            Stake
          </button>
        </form>
    
        <div className="py-8 mt-10 text-center flex flex-col items-center justify-center gap-4">
          <button 
            className="bg-blue-600 w-full hover:bg-purple-950 text-white px-4 py-2 rounded-xl" 
            onClick={claimReward}>
            Claim Reward
          </button>
          <button 
            className="bg-green-500 w-full text-white px-4 py-2 rounded-xl hover:bg-green-800" 
            onClick={withdrawTokens}>
            Withdraw Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
