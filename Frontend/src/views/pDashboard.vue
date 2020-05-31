<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <!-- Cabeçalho -->
        <div class="border-bottom mb-4 border-color-light">
          <h3 class="text-left font-custom px-2">
            <i class="fa fa-list-alt mr-3"></i>Painel de Reuniões
          </h3>
        </div>

        <div class="col">
          <!-- Procurar -->
          <div class>
            <div class="form-inline float-right mb-4">
              <div class="form-group border-bottom float-right bg-white mr-3">
                <span class="fa fa-search fa-lg fw pb-2 pt-2 mt-1"></span>
                <input
                  type="text"
                  class="col form-control bg-white border-0 pl-3 pr-3"
                  aria-describedby="helpId"
                  placeholder="Procurar..."
                  style="width: 200px"
                />
              </div>
              <button class="btn btn-success waves-effect rounded-0 mr-2">OK</button>
            </div>
            <!--- Botão Adicionar -->
            <div class="form-inline mb-4 float-left">
              <div class="form-group">
                <button class="btn btn-success waves-effect rounded-0">Adicionar Reunião</button>
              </div>
            </div>
          </div>

          <!--- Inicio dos Cartões -->
          <div class="row col px-2">
            <div
              role="card"
              class="card shadow-sm mx-2 border-color-light"
              style="width: 19rem; height: 20rem;"
            >
              <div class="card-header p-1 border-0">
                <span class="fa fa-comments-o fa-2x text-accent-1 fa-fw"></span>
                <a
                  class="px-2 font-weight-bold text-accent-1 align-text-bottom"
                  type="button"
                >Reunião de Teste</a>
              </div>
              <div class="card-body"></div>
              <div class="card-footer bg-white border-0">
                <p class="card-text text-left text-success text-right" style="font-size:12px">
                  <i class="fa fa-clock-o pr-2"></i>07/24/2018
                </p>
              </div>
            </div>
          </div>
          <!--- Fim dos Cartões -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},

  methods: {},

  computed: {}
};
</script>

<style scoped>
h1 {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.table th,
.table td {
  vertical-align: text-bottom;
}

@media (max-width: 991px) {
  [role="card"] {
    width: 100% !important;
  }
}

td {
  font-size: 10pt;
}

.shadow-custom {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.fab {
  position: fixed;
  bottom: 10px;
  right: 10px;

  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 30px;

  border: none;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 24px;
  color: white;
}
</style>