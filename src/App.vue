<template>
  <div id="app" class="app">
    <Index />
  </div>
</template>

<script>
import "./css/app.css";
import Index from "./pages/Index";

export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  min-width: 768px;
  max-width: 1600px;
}
</style>
