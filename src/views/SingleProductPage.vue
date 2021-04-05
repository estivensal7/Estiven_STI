<template>
	<b-container class="single-products-page">
		<!-- Loading Component will be rendered if 'isLoading' is set to true -->
		<Loading v-if="isLoading" />

		<!-- Top Section of the page, will be rendered if we have product data from the API -->
		<b-row v-if="product">
			<b-col cols="12" sm="12" md="6" lg="6">
				<!-- Carousel Component -->
				<b-carousel
					id="carousel-1"
					v-model="slide"
					:interval="4000"
					controls
					indicators
					background="#ababab"
					img-width="320"
					img-height="320"
					@sliding-start="onSlideStart"
					@sliding-end="onSlideEnd"
				>
					<b-carousel-slide
						v-for="image in carouselImages"
						v-bind:key="image"
						:img-src="image"
					></b-carousel-slide>
				</b-carousel>
			</b-col>
			<b-col>
				<b-row>
					<!-- Brand Logo Image -->
					<b-col cols="12" sm="4" md="3" lg="3" class="my-1">
						<img
							:src="images[1].urls.sm"
							class="single-product-page-logo-image"
						/>
					</b-col>
					<!-- Product Name/Title Component -->
					<b-col align-self="center">
						<h4 cols="12" sm="8" md="9" lg="9" class="my-1">
							{{ product.name }}
						</h4>
					</b-col>
				</b-row>
				<b-row>
					<!-- Product Description Component -->
					<b-col cols="12" class="my-1">
						<p class="product-description">{{ product.description }}</p>
					</b-col>
				</b-row>
				<b-row>
					<!-- Features component -->
					<b-col cols="12" class="my-2">
						<h4>Features</h4>
						<ul class="product-features-ul" align="left">
							<li
								class="product-features-li"
								v-for="bullet_points_decoded in product.bullet_points_decoded"
								v-bind:key="bullet_points_decoded"
							>
								{{ bullet_points_decoded }}
							</li>
						</ul>
					</b-col>
				</b-row>
			</b-col>
		</b-row>

		<!-- Bottom Section of the page (Ordering Information), will be rendered if we have product data from the API -->
		<h4 class="my-3">Ordering Information</h4>
		<b-row v-if="product">
			<b-col col="12" class="my-3">
				<b-table striped hover :items="refinedOrderingItems"></b-table>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import axios from "axios";

	// Importing Component(s)
	import Loading from "../components/layout/Loading";

	export default {
		name: "SingleProductPage",
		components: {
			Loading,
		},
		data() {
			return {
				isLoading: true,
				product: null,
				error: null,
				carouselImages: null,
				features: null,
				orderingItems: null,
				images: null,
				slide: 0,
				sliding: null,
				refinedOrderingItems: [],
			};
		},
		async created() {
			await this.fetchProductDetailsFromAPI(); //Load data on component-created
		},
		watch: {
			$route: "fetchAllProductsFromAPI",
			product: "updateCarouselImages", //watch for changes in the product state, then update the carouselImages state
		},
		methods: {
			// Initial fetch for products from API
			async fetchProductDetailsFromAPI() {
				// Show the Loading Component
				this.isLoading = true;

				axios
					.get(
						`https://api.stifirestop.com/products/${this.$route.params.slug}?load[]=images&load[]=ordering_items`
					)
					.then((res) => {
						const data = res.data.data;

						// setting state values once data is loaded
						this.product = data;
						this.orderingItems = data.ordering_items;
						this.images = data.images;

						this.isLoading = false; // Hide the Loading Component
						this.refineOrderingItemObjects(); //Refining ordering information objects for proper table listing
					})
					.catch((err) => (this.error = err));
			},
			updateCarouselImages() {
				let tempCarouselImgArray = [];
				for (let i = 0; i < this.images.length; i++) {
					if (this.images[i].type === "slider") {
						tempCarouselImgArray.push(this.images[i].urls.md);
					}
				}

				this.carouselImages = tempCarouselImgArray;
			},
			// Method to refine order information objects, the refined objects will be used to render the table
			refineOrderingItemObjects() {
				let newOrderRow = {
					catalog_number: "",
					UPC_number: "",
					description: "",
					qty: "",
					case_qty: "",
					weight: "",
					image: "",
				};

				const orderingItemsArray = this.orderingItems;

				for (let i = 0; i < orderingItemsArray.length; i++) {
					newOrderRow = {
						catalog_number: orderingItemsArray[i].item_number,
						UPC_number: orderingItemsArray[i].upc,
						description: orderingItemsArray[i].description,
						qty: orderingItemsArray[i].quantity,
						case_qty: orderingItemsArray[i].case_quantity,
						weight: orderingItemsArray[i].weight,
					};

					this.refinedOrderingItems.push(newOrderRow);

					newOrderRow = {
						catalog_number: "",
						UPC_number: "",
						description: "",
						qty: "",
						case_qty: "",
						weight: "",
					};
				}
			},
			// Carousel control handlers
			onSlideStart() {
				this.sliding = true;
			},
			onSlideEnd() {
				this.sliding = false;
			},
		},
	};
</script>

<style scoped>
	.single-product-page-logo-image {
		max-width: 200px !important;
		max-height: 200px !important;
	}
</style>
