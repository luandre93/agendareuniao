<template>
  <div class="container-fluid" id="menu">
    <nav class="navbar-expand-sm navbar-dark py-1 border-bottom shadow-sm bg-dark fixed-top">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <a class="mx-5">CoAgendei.</a>
      </div>
      <cNotificacao ref="cNotificacaoOne" />
    </nav>

    <div class style="margin-top: 100px;">
      <div class="container alert alert-danger">
        <h3 class="text-center">Erro 404!</h3>
        <p class="text-center">Página não foi encontrada!.</p>
      </div>
      <center>
        <button class="btn btn-secondary mb-4 mt-4" @click="$router.back()">Voltar</button>
      </center>
    </div>
  </div>
</template>



<script>
export default {};
</script>

<style>
</style>