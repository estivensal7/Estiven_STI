import Vue from "vue";
import VueRouter from "vue-router";
import AllProductsPage from "../views/AllProductsPage.vue";
import SingleProductPage from "../views/SingleProductPage.vue";
import FourOFour from "../views/FourOFour.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "AllProductsPage",
		component: AllProductsPage,
	},
	{
		path: "/single-product-page/:slug",
		name: "SingleProductPage",
		component: SingleProductPage,
	},
	{
		path: "*",
		name: "FourOFour",
		component: FourOFour,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
