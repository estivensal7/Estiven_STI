import axios from "axios";

export default {
	fetchAllProducts: function() {
		axios
			.get("https://api.stifirestop.com/products")
			.then((res) => {
				return res;
			})
			.catch((err) => console.log(err));
	},
};
