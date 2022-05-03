import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import MintBatch from "./mintBatch";

import abi from "./contract/abi.json";
const contractAddress = "0x4AC988f87203dbe8e67BE9B4200446595040E8EC";

const Send = () => {
	const [addresses, setAddresses] = useState([]);
	const [tokensleft, setTokenleft] = useState(-1);

	const getAddress = async () => {
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
					let transaction = await contract.TransferToAddresses(addresses);
					console.log(transaction);

					tx = await transaction.wait();
					console.log(tx)
					//send mail
					const res = await axios.post("/api/sendMail", {
						message: `https://mumbai.polygonscan.com/tx/${transaction.hash}`,
					});
					console.log(res.data);
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchAddress = async () => {
		const { data } = await axios.get("/api/wallet");
		console.log(data);
		var addArr = [];
		data.forEach((e) => {
			addArr.push(e.address);
		});
		setAddresses(addArr);
		console.log(addresses);
	};

	const removeAddress = async () => {
		const { data } = await axios.delete("/api/wallet");
		console.log(data);
	};

	const fetchTokenLeft = async () => {
		let signer;
		let contract;
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			signer = provider.getSigner();

			try {
				contract = new ethers.Contract(contractAddress, abi, signer);

				try {
					let transaction = await contract.TokensLeft();
					console.log(transaction._hex);
					setTokenleft(parseInt(transaction._hex, 16));
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<MintBatch />
			<h1 className='heading__primary'>{`Total addresses: ${addresses.length}`}</h1>
			<button className='btn' onClick={fetchAddress}>
				Fetch Addresses
			</button>
			<button className='btn' onClick={getAddress}>
				Send Tokens
			</button>
			<button className='btn' onClick={removeAddress}>
				remove Tokens
			</button>
			<hr />
			<h1 className='heading__primary'>{`Total usable Tokens left : ${tokensleft}`}</h1>
			<button className='btn' onClick={fetchTokenLeft}>
				Fetch Tokens
			</button>
		</div>
	);
};

export default Send;
