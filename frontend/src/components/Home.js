import { useState } from "react";
import ErrorModal from "./Modal/ErrorModal";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

const Home = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState("");

	const onClose = () => {
		setShowModal(false);
	};

	const handleName = (e) => {
		// console.log(e.target.value);
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const getWalletAddress = async () => {
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			signer
				.getAddress()
				.then(async (x) => {
					try {
						const walletAddress = { address: x, name: name, email: email };
						const res = await axios.post("/api/wallet", walletAddress);
						console.log(res.data);
						setShowModal(true);
						setError(
							"Thanks, we got your response. Please wait while we send you your NFT."
						);
					} catch (error) {
						console.log("here 0");
						console.log(error.response.data.message);
						setError(error.response.data.message);
						setShowModal(true);
					}
				})
				.catch((err) => {
					console.log("Here 1");
				});
		} catch (error) {
			console.log("Here 2");
			console.log(error.message);
		}
	};

	return (
		<div className='header'>
			<div className='header__logo-box'>
				<img src='/assets/img/logo1.webp' alt='Logo' className='header__logo' />
			</div>
			{showModal && (
				<ErrorModal
					title={
						error ===
						"Thanks, we got your response. Please wait while we send you your NFT."
							? "Success!"
							: "Oops!"
					}
					message={error}
					onClose={onClose}
				/>
			)}

			<div className='header__text-box'>
				<h1 className='heading__primary'>Welcome to metaverse!</h1>
				<div className='heading__form'>
					<input
						type='text'
						name='name'
						value={name}
						placeholder='Enter your full name'
						onChange={handleName}
						required={true}
					/>
					<input
						type='email'
						name='name'
						value={email}
						placeholder='Enter your email'
						onChange={handleEmail}
						required={true}
					/>
				</div>
				<a className='btn-15' onClick={getWalletAddress}>
					Sign In with Wallet
				</a>
			</div>
		</div>
	);
};

export default Home;
