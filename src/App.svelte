<script>
	import Router from "svelte-spa-router";
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import MainPage from "./pages/MainPage.svelte";
	import Login from "./pages/Login.svelte";
	import NotFound from "./pages/NotFound.svelte";
	import { FirebaseApp } from "sveltefire";
	import firebase from "firebase/app";
	import "firebase/auth";
	import "firebase/firestore";
	import "firebase/database";
	
	const routes = {
		"/": MainPage,
		"/Login": Login,
		"/*": MainPage,
		"*": NotFound,
		//'/':,
	};

	
</script>

<FirebaseApp {firebase}>
	<Router {routes} />
	<SvelteToast />
</FirebaseApp>

<style global>
	:global(:root) {
		font-size: 16px;
		--text-prymary: #b6b6b6;
		--text-secondary: #ececec;
		--bg-primary: #23232e;
		--bgsecondary: #141418;
		--nav-transition-speed: 600ms;
		--resposive-flag: 600px;
	}
	:global(body) {
		color: black;
		background-color: white;
		margin: 0;
		padding: 0;
	}

	:global(body::-webkit-scrollbar) {
		width: 0.25rem;
	}

	:global(body::-webkit-scrollbar-track) {
		background: #1e1e24;
	}

	:global(body::-webkit-scrollbar-thumb) {
		background: #6649b8;
	}

	:global(main) {
		padding: 1rem;
	}
	@media only screen and (min-width: 600px) {
		:global(main) {
			margin-left: 5rem;
		}
	}
	@media only screen and (max-width: 600px) {
		:global(main) {
			margin-left: 0;
		}
	}
</style>
