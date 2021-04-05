<template>
	<b-pagination
		v-model="currentPage"
		:per-page="perPage"
		:total-rows="rows"
	></b-pagination>
</template>

<script>
	export default {
		name: "AllProductsPagination",
		props: ["currentPageValue", "limitPerPageValue"],
		data() {
			return {
				currentPage: 1,
				perPage: 10,
			};
		},
		computed: {
			rows() {
				return Math.ceil(64 / this.perPage);
			},
		},
	};
</script>
