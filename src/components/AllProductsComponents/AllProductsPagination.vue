<template>
	<b-pagination
		v-model="currentPage"
		:total-rows="64"
		:per-page="perPage"
		align="center"
	></b-pagination>
</template>

<script>
	export default {
		name: "AllProductsPagination",
		props: ["currentPageValue", "limitPerPageValue"],
		data() {
			return {
				currentPage: this.currentPageValue,
				perPage: this.limitPerPageValue,
			};
		},
		methods: {
			emitPageChange() {
				this.$emit("update-page", this.currentPage);
			},
		},
	};
</script>
