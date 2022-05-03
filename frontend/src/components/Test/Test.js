import React from "react";
import axios from "axios";

const Test = () => {
	const handleClick = async () => {
		try {
			const res = await axios.post("/api/sendMail", {
				message: "https://www.youtube.com/",
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Testing page</h1>
			<button onClick={handleClick}>Send</button>
		</div>
	);
};

export default Test;
