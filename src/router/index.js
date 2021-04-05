import Vue from "vue";
import VueRouter from "vue-router";
import AllProductsPage from "../views/AllProductsPage.vue";
import SingleProductPage from "../views/SingleProductPage.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "AllProductsPage",
		component: AllProductsPage,
	},
	{
		path: "/single-product-page",
		name: "SingleProductPage",
		component: SingleProductPage,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
