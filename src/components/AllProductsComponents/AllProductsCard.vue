<template>
	<b-card
		class="mb-2 all-products-card h-100"
		:title="`${product.name}`"
		:img-src="`${product.images[0].urls.sm}`"
		:img-alt="`${product.name} Image`"
		img-top
		style="max-width: 20rem;"
	>
		<!-- Product Description is cut off at 100 characters -->
		<b-card-text>
			{{ product.description.substring(0, 99) + "..." }}
		</b-card-text>

		<!-- 'View More Details' Button redirects to SingleProductPage -->
		<b-link
			:to="`/single-product-page/${product.slug}`"
			class="more-details-button"
			variant="secondary"
		>
			View More Details
		</b-link>
	</b-card>
</template>

<script>
	export default {
		name: "AllProductsCard",
		props: ["product"],
	};
</script>

<style scoped>
	.more-details-button {
		color: white;
		background-color: #444;
		padding: 7.5px;
		border-radius: 2px;
	}

	.card-title {
		min-height: 80px;
	}

	.card-text {
		min-height: 140px;
	}
</style>
