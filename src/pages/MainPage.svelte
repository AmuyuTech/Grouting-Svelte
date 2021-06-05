<script>
    import Navbar from "../components/Navbar.svelte";
    import Router from 'svelte-spa-router'
    import routes from "../routes";
    let prefix = ''
</script>
<Navbar/>
<main>
    <Router {routes} {prefix}/>
</main>
