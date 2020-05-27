<template>
  <div class="app">
    <div>
      <div>
        <div class="col-md-10">
          <h1 class="text-left border-bottom mb-4">
            <i class="fa fa-list-alt mr-3"></i>Painel de Reuniões
          </h1>
          <div class="container-fluid">
            <div class="row">
              <div class="card border mx-2" style="width: 19rem; height: 20rem;">
                <div class="card-body p-3 d-flex flex-row">
                  <span class="fa fa-comments-o fa-3x rounded-circle mr-3"></span>
                  <div>
                    <h4 class="card-title font-weight-bold mb-2">Reunião de Teste</h4>
                    <p class="card-text text-left text-success">
                      <i class="fa fa-clock-o pr-2"></i>07/24/2018
                    </p>
                  </div>
                </div>
                <div class="card-footer border-top bg-white"></div>
              </div>
            </div>
          </div>
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

td {
  font-size: 10pt;
}

input:focus,
button:focus,
select:focus {
  box-shadow: none;
}

.shadow-custom {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>