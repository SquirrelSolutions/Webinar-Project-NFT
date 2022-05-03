import React from "react";

import "./ErrorModal.scss";

const ErrorModal = (props) => {
	return (
		<div className='backdrop'>
			<div className='errmodal'>
				<header className='errmodal__header'>
					<h2>{props.title}</h2>
				</header>
				<div className='errmodal__main'>
					<p>{props.message}</p>
				</div>
				<footer className='errmodal__footer'>
					<button onClick={props.onClose}>Okay</button>
				</footer>
			</div>
		</div>
	);
};

export default ErrorModal;
