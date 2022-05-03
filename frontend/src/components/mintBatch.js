import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import abi from "./contract/abi.json";
const contractAddress = "0x4AC988f87203dbe8e67BE9B4200446595040E8EC";

const Send = () => {
	const [address, setAddress] = useState();
	const [quantity, setQuantity] = useState();

	const mint = async () => {
		let signer;
		let tx;
		let contract;
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			signer = provider.getSigner();

			try {
				contract = new ethers.Contract(contractAddress, abi, signer);

				try {
					let transaction = await contract.mintBatch(
						address,quantity
					);
					console.log(transaction);

					tx = await transaction.wait();
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}

		let event = tx.events[0];
		let value = event.args[2];
	};

	return (
		<div>
			<h1 className='heading__primary'>Minting Section</h1>
            <input
                type='text'
                value={address}
                placeholder='To'
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
            />
            <input
                type='number'
                value={quantity}
                placeholder='Quantity'
                onChange={(e) => {
                    setQuantity(e.target.value)
                }}
            />
			<button className="btn" onClick={mint}>Mint in Batch</button>
            <br></br>
            <hr></hr>
		</div>
	);
};

export default Send;
