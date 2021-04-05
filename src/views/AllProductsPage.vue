<template>
	<b-container class="all-products-page">
		<b-row class="my-4">
			<b-col sm="6">
				<b-form-input
					size="sm"
					class="mr-sm-2 my-3"
					placeholder="Search for an item..."
					v-model="searchByValue"
					name="search"
				></b-form-input>
			</b-col>
			<b-col sm="6" class="my-0">
				<AllProductsFilterOptions v-on:filter-change="updateFilters" />
			</b-col>
		</b-row>
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
		<b-row>
			<AllProductsPagination v-bind:currentPageValue="currentPage" />
		</b-row>
	</b-container>
</template>

<script>
	import axios from "axios";
	import AllProductsCard from "../components/AllProductsComponents/AllProductsCard";
	import AllProductsPagination from "../components/AllProductsComponents/AllProductsPagination";
	import AllProductsFilterOptions from "../components/AllProductsComponents/AllProductsFilterOptions";

	export default {
		name: "AllProductsPage",
		components: {
			AllProductsCard,
			AllProductsPagination,
			AllProductsFilterOptions,
		},
		data() {
			return {
				loading: false,
				products: null,
				error: null,
				baseAPIUrl: "https://api.stifirestop.com/products?",
				loadImagesParameter: "load[]=images",
				currentPage: 1,
				sortByValue: "",
				sortOrderValue: "asc",
				limitPerPageValue: false,
				searchByValue: null,
			};
		},
		async created() {
			await this.fetchAllProductsFromAPI();
		},
		watch: {
			$route: "fetchAllProductsFromAPI",
			searchByValue: "fetchProductsBySearchValue",
		},
		methods: {
			async fetchAllProductsFromAPI() {
				axios
					.get(this.baseAPIUrl + "&load[]=images")
					.then((res) => {
						this.products = res.data.data;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";
					})
					.catch((err) => (this.error = err));
			},
			fetchProductsBySearchValue() {
				this.baseAPIUrl += `&search=${this.searchByValue}`;

				axios
					.get(this.baseAPIUrl + "&load[]=images")
					.then((res) => {
						this.products = res.data.data;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";
					})
					.catch((err) => (this.error = err));
			},

			updateFilters(filterOptions) {
				const { productsPerPage, sortBy, sortOrder } = filterOptions;
				this.limitPerPageValue =
					productsPerPage === false ? "10" : productsPerPage;
				this.sortByValue = sortBy === false ? "popularity" : sortBy;
				this.sortOrderValue = sortOrder === false ? "asc" : sortOrder;

				this.fetchProductsByFilters();
			},

			fetchProductsByFilters() {
				if (this.sortByValue !== false) {
					this.baseAPIUrl += `sort=${this.sortOrderValue}&sortby=${this.sortByValue}`;
				}

				if (this.limitPerPageValue !== false) {
					this.baseAPIUrl += `&limit=${this.limitPerPageValue}`;
				}

				axios
					.get(this.baseAPIUrl + "&load[]=images")
					.then((res) => {
						this.products = res.data.data;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";
					})
					.catch((err) => (this.error = err));
			},
		},
	};
</script>

<style scoped>
	.product-card-column {
		margin-bottom: 25px;
	}
</style>
