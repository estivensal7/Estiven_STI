<template>
	<b-container class="all-products-page">
		<b-row>
			<b-col
				class="product-card-column"
				v-for="product in products"
				v-bind:key="product.id"
				cols="12"
				sm="6"
				md="4"
				lg="3"
				align="center"
			>
				<AllProductsCard v-bind:product="product" />
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import axios from "axios";
	import AllProductsCard from "../components/AllProductsComponents/AllProductsCard";

	export default {
		name: "AllProductsPage",
		components: { AllProductsCard },
		data() {
			return {
				loading: false,
				products: null,
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
					.get("https://api.stifirestop.com/products?load[]=images")
					.then((res) => {
						this.products = res.data.data;
					})
					.catch((err) => (this.error = err));
			},
		},
	};
</script>

<style scoped>
	@import "../assets/Styles/AllProductsPageStyle.css";
</style>
