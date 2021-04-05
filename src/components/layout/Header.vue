<template>
	<div id="nav">
		<div>
			<b-navbar
				toggleable="lg"
				type="light"
				variant="info"
				class="header-navbar"
			>
				<b-navbar-brand href="/" class="my-auto header-navbar-brand">
					<img
						src="../../assets/Images/Logos/sti-logo-bug-2020.svg"
						class="d-inline-block align-top header-logo-img"
						alt="STI Logo"
					/>
					Specified Technologies Inc.
				</b-navbar-brand>

				<b-navbar-toggle
					target="nav-collapse"
					v-if="showLink"
				></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav v-if="showLink">
					<!-- This link will be aligned to the right of the Header component -->
					<b-navbar-nav class="ml-auto">
						<b-nav-item href="/">Back To All Products</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {
				showLink: false, //We will dynamically render the links based on this value. If the user is at the AllProductsPage, it will not render. If the user if at the SingleProductPage, it will render.
			};
		},
		watch: {
			// Checking the $route object for the value of the current path to assist in dynamically rendering the navigation link(s)
			$route: function() {
				this.$route.path === "/"
					? (this.showLink = false)
					: (this.showLink = true);
			},
		},
	};
</script>

<style scoped>
	.header-logo-img {
		max-width: 40px;
	}
	.header-navbar {
		background-color: white !important;
	}

	.header-navbar-brand {
		font-size: 30px;
		display: flex;
		align-items: center;
	}
</style>
