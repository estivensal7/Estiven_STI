<template>
	<b-container class="all-products-page">
		<!-- Loading Component will be rendered if 'isLoading' is set to true -->
		<Loading v-if="isLoading" />

		<b-row class="my-4">
			<!-- Search Input Component -->
			<b-col sm="6">
				<b-form-input
					size="sm"
					class="mr-sm-2 my-3"
					placeholder="Search for an item..."
					v-model="searchByValue"
					name="search"
				></b-form-input>
			</b-col>

			<!-- Filter Options Component -->
			<b-col sm="6" class="my-0">
				<AllProductsFilterOptions v-on:filter-change="updateFilters" />
			</b-col>
		</b-row>

		<!-- Product Cards -->
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

		<!-- Pagination Component -->
		<b-row>
			<b-col class="my-3" v-if="loadPagination">
				<b-pagination
					v-model="currentPage"
					:total-rows="totalRows"
					:per-page="limitPerPageValue"
					align="center"
					v-on:input="fetchProductsByPage"
				></b-pagination>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import axios from "axios";
	import AllProductsCard from "../components/AllProductsComponents/AllProductsCard";
	import AllProductsFilterOptions from "../components/AllProductsComponents/AllProductsFilterOptions";
	import Loading from "../components/layout/Loading";

	export default {
		name: "AllProductsPage",
		components: {
			AllProductsCard,
			AllProductsFilterOptions,
			Loading,
		},
		data() {
			return {
				loading: false,
				products: null,
				error: null,
				baseAPIUrl: "https://api.stifirestop.com/products?",
				prevAPIUrl: "",
				sortByValue: "",
				sortOrderValue: "asc",
				limitPerPageValue: "15",
				searchByValue: null,
				loadPagination: false,
				currentPage: 1,
				totalRows: 64,
				isLoading: true,
			};
		},
		async created() {
			await this.fetchAllProductsFromAPI(); //Load data on component-created
		},
		watch: {
			$route: "fetchAllProductsFromAPI",
			searchByValue: "fetchProductsBySearchValue", //watch for changes in the searchByValue state, then update the fecth products from API based on the selected parameters
		},
		methods: {
			async fetchAllProductsFromAPI() {
				this.isLoading = true;
				axios
					.get(this.baseAPIUrl + "&limit=10&load[]=images")
					.then((res) => {
						const data = res.data.data;

						// setting state values once data is loaded
						this.products = data;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";
						this.prevAPIUrl = "https://api.stifirestop.com/products?"; //prev API will be used to persist filter options after a search is completed

						this.loadPagination = true; // Show the Pagination Component
						this.isLoading = false; // Hide the Loading Component
					})
					.catch((err) => (this.error = err));
			},
			// Fetching products by search value, this request will run when the Search input changes
			fetchProductsBySearchValue() {
				// Constructing API Path
				this.baseAPIUrl += `&search=${this.searchByValue}`;

				this.prevAPIUrl = this.baseAPIUrl;
				this.isLoading = true; //Showing Loading component

				axios
					.get(this.baseAPIUrl + "&load[]=images")
					.then((res) => {
						const data = res.data.data;
						this.products = data;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";

						this.isLoading = false;
					})
					.catch((err) => (this.error = err));
			},

			// this function receives parameters from the AllProductsFilterOptions component which are $emitted up when there is a change in the child components's state
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

				this.isLoading = true;

				axios
					.get(this.baseAPIUrl + "&load[]=images")
					.then((res) => {
						const data = res.data.data;
						this.products = data;
						this.prevAPIUrl = this.baseAPIUrl;
						this.baseAPIUrl = "https://api.stifirestop.com/products?";

						this.isLoading = false;
					})
					.catch((err) => (this.error = err));
			},

			// Utilized in the pagination component, we retrieve the previous API url to persist the filters, and return the desired page of data from the API
			fetchProductsByPage() {
				this.isLoading = true;

				const refinedAPIUrl =
					this.prevAPIUrl === "https://api.stifirestop.com/products?"
						? this.prevAPIUrl + `page=${this.currentPage}&load[]=images`
						: this.prevAPIUrl + `&page=${this.currentPage}&load[]=images`;

				axios
					.get(refinedAPIUrl)
					.then((res) => {
						const data = res.data.data;
						this.products = data;

						this.prevAPIUrl = refinedAPIUrl;
						this.isLoading = false;
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
