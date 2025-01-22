<template>
  <div id="app">
    <nav>
      <ul>
        <li v-for="link in $site.themeConfig.nav" :key="link.text">
          <a :href="link.link">{{ link.text }}</a>
        </li>
      </ul>
    </nav>
    <main>
      <slot />
    </main>
    <footer>
      <p>© 2025 My Static Site. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout'
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  background: var(--background-color);
  padding: 1rem;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-right: 1.5rem;
}

main {
  flex: 1;
  padding: 2rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background: var(--background-color);
}
</style>
