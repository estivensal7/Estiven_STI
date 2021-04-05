<template>
	<b-card
		:title="`${product.name}`"
		:img-src="`${product.images[0].urls.sm}`"
		:img-alt="`${product.name} Image`"
		img-top
		style="max-width: 20rem;"
		class="mb-2 h-100 all-products-card"
	>
		<b-card-text>
			{{ product.description.substring(0, 99) + "..." }}
		</b-card-text>

		<b-button href="#" variant="primary">Go somewhere</b-button>
	</b-card>
</template>

<script>
	export default {
		name: "AllProductsCard",
		props: ["product"],
	};
</script>
