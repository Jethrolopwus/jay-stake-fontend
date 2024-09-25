
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function AddPool({ contract, signer }) {

  const [isOwner, setIsOwner] = useState(false);
  const [hasCheckedOwner, setHasCheckedOwner] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
const navigate = useNavigate();
  // Function to check if the connected wallet is the contract owner
  const checkOwner = async () => {
    try {
      const currentAddress = await signer.getAddress(); // Get connected wallet address
      const contractOwner = await contract.owner(); // Fetch the owner from contract
      if (currentAddress.toLowerCase() === contractOwner.toLowerCase()) {
        setIsOwner(true);
        toast.success('You are the contract owner.');
      } else {
        toast.error('You are not the contract owner.');
      }
    } catch (error) {
      console.error('Error checking owner status:', error);
      toast.error('You are not the contract owner.');
      navigate("/");
    }
    setHasCheckedOwner(true); // Mark that the check has been performed
  };

  // Function to add a pool (only available if the user is the owner)
  const addPool = async (data) => {
    if (!isOwner) {
      toast.error('Only the contract owner can add a pool.');
      return;
    }
    try {
      const tokenAddress = data.stakingTokenAddress;
      const rewardRate = ethers.parseEther(data.poolRewardRate);

      const tx = await contract.addPool(tokenAddress, rewardRate);
      await tx.wait();
      toast.success('Pool created successfully');
    } catch (error) {
      toast.error('Failed to create pool.');
      console.error('Error creating pool: ', error);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-blue-500 via-blue-700 to-blue-400 w-screen h-screen flex items-center justify-center">
      <div className='bg-white w-full sm:w-3/4 md:w-2/4 lg:w-1/3 h-[80vh] rounded-xl p-8'>

        <h2 className="text-3xl font-bold text-center mb-4">Add New Staking Pool</h2>

        {!hasCheckedOwner ? (
          <div className="text-center">
            <p className="mb-4">Click the button below to check if you are the contract owner.</p>
            <button
              className="bg-blue-600 mt-10 hover:bg-blue-950 text-white px-4 py-3 w-3/4 rounded-xl"
              onClick={checkOwner}>
              Check Owner
            </button>
          </div>
        ) : (
          <>
            {isOwner ? (
              <form className="text-center flex flex-col items-center justify-center gap-4 mt-6" onSubmit={handleSubmit(addPool)}>
                
                <input
                  type="text"
                  placeholder="Staking Token Address"
                  className="border border-gray-300 p-2 w-full bg-slate-200 placeholder:text-center rounded-xl"
                  {...register('stakingTokenAddress', { required: 'Staking Token Address is required' })}
                />
                {errors.stakingTokenAddress && <p className="text-red-500">{errors.stakingTokenAddress.message}</p>}

                <input
                  type="text"
                  placeholder="Reward Rate (ETH equivalent)"
                  className="border border-gray-300 p-2 w-full bg-slate-200 placeholder:text-center rounded-xl"
                  {...register('poolRewardRate', { required: 'Reward Rate is required', pattern: { value: /^[0-9]*[.]?[0-9]+$/, message: 'Please enter a valid number' } })}
                />
                {errors.poolRewardRate && <p className="text-red-500">{errors.poolRewardRate.message}</p>}

                <button
                  className="bg-blue-500 hover:bg-blue-950 text-white px-4 py-3 w-2/5 rounded-xl mt-6"
                  type="submit">
                  Create Pool
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p>You are not the contract owner and cannot create pools.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
