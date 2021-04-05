<template>
	<b-row>
		<b-col>
			<div>
				<b-form-select
					v-model="productsPerPage"
					:options="productsPerPageOptions"
					size="sm"
					class="mt-3 w-100"
					label=""
				></b-form-select>
			</div>
		</b-col>

		<b-col>
			<div>
				<b-form-select
					v-model="sortBy"
					:options="sortByOptions"
					size="sm"
					class="mt-3 w-100"
				></b-form-select>
			</div>
		</b-col>

		<b-col>
			<div>
				<b-form-select
					v-model="sortOrder"
					:options="sortOrderOptions"
					size="sm"
					class="mt-3 w-100"
				></b-form-select>
			</div>
		</b-col>
	</b-row>
</template>

<script>
	export default {
		name: "AllProductsFilterOptions",
		data() {
			return {
				productsPerPage: false,
				productsPerPageOptions: [
					{ value: false, text: "Products Per Page" },
					{ value: "5", text: "5" },
					{ value: "10", text: "10" },
					{ value: "25", text: "25" },
					{ value: "50", text: "50" },
				],
				sortBy: false,
				sortByOptions: [
					{ value: false, text: "Sort By" },
					{ value: "name", text: "Name" },
					{ value: "popularity", text: "Popularity" },
				],
				sortOrder: false,
				sortOrderOptions: [
					{ value: false, text: "Sort Order" },
					{ value: "asc", text: "Ascending" },
					{ value: "desc", text: "Descending" },
				],
			};
		},
		methods: {
			changeFilterValuesHandler() {
				const filterOptions = {
					productsPerPage: this.productsPerPage,
					sortBy: this.sortBy,
					sortOrder: this.sortOrder,
				};

				this.$emit("filter-change", filterOptions);
			},
		},
		watch: {
			productsPerPage: "changeFilterValuesHandler",
			sortBy: "changeFilterValuesHandler",
			sortOrder: "changeFilterValuesHandler",
		},
	};
</script>
