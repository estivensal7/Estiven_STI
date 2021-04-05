<template>
	<div class="text-center loading-spinner-div">
		<b-spinner type="grow" label="Spinning" class="loading-spinner"></b-spinner>
	</div>
</template>

<style scoped>
	.loading-spinner-div {
		min-width: 100vw;
		min-height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1000;
		margin: 0px;
		display: flex;
	}

	.loading-spinner {
		margin: auto;
	}
</style>
