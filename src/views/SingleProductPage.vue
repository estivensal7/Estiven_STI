<template>
	<div class="single-products-page">
		<h3>Single Product Page</h3>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "SingleProductPage",
		components: {},
		data() {
			return {
				loading: false,
				product: null,
				error: null,
			};
		},
		async created() {
			await this.fetchAllProductsFromAPI();
		},
		watch: {
			$route: "fetchAllProductsFromAPI",
		},
		methods: {
			async fetchAllProductsFromAPI() {
				axios
					.get("https://api.stifirestop.com/products")
					.then((res) => {
						this.products = res.data.data;
					})
					.catch((err) => (this.error = err));
			},
		},
	};
</script>
