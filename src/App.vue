<template>
  <div id="app">
    <Home/>
    <!-- <Test></Test> -->
  </div>
</template>

<script>
import Home from './components/Home'
import Test from './components/Test'

export default {
  name: 'App',
  components: {
    Home, Test
  }
}
</script>

<style>
body, html {
  margin: 0;
  height: 100%;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
</style>
