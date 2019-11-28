<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
      </ul>
      <div class="copyright">
        © {{year}} Desenvolvido por: Douglas Silva de Melo / Jogno
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
