<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <!-- Cabeçalho -->
        <div class="border-bottom mb-2 border-color-light">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-list-alt mr-2"></i>
            Reunião - {{todo.titulo}}
          </h4>
        </div>

        <div class="col-auto">
          <div class="col float-right">
            <div class="form-row mr-3">
              <div class="col form-row">
                <div class="col pt-2">
                  <a class="h5" style="font-size:16px">Descrição:</a>
                </div>
                <div class="col pt-2">
                  <span class="fa fa-bars fa-lg fa-fw mr-2"></span>
                  <a class>{{todo.categoria}}</a>
                </div>
                <div class="col pt-2">
                  <span class="fa fa-map-o fa-lg fa-fw mr-2"></span>
                  <a class>{{todo.localizacao}}</a>
                </div>
                <div class="col pt-2">
                  <span class="fa fa-clock-o fa-lg fa-fw mr-2"></span>
                  <a class>{{todo.hora_inicial}} ~ {{todo.hora_final}}</a>
                </div>
                <div class="col pt-2">
                  <span class="fa fa-calendar fa-lg fa-fw mr-2"></span>
                  <a class>{{todo.data}}</a>
                </div>
              </div>
            </div>

            <!--- Botão Adicionar -->
            <div class="form-row float-left mr-4"></div>
          </div>

          <div class="py-4 mx-0 border-bottom border-color-light"></div>

          <div class="col"></div>

          <!-- Fim Modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reunioes from "@/services/reunioes";
import usuarios from "@/services/usuarios";

export default {
  data() {
    return {
      reuniao: {
        id: "",
        id_usuario: "",
        titulo: "",
        data: "",
        categoria: "",
        localizacao: "",
        hora_inicial: "",
        hora_final: "",
        cancelada: ""
      },
      todo: "",
      usuarios: []
    };
  },
  mounted() {
    this.listarReuniaoID(this.$route.params.id);
    this.listarUsuarios();
  },

  methods: {
    limparCampos() {},

    listarUsuarios() {
      usuarios.ListarUsuario().then(resposta => {
        this.usuarios = resposta.data;
      });
    },

    listarReuniaoID(id) {
      reunioes.ListarReuniaoID(id).then(resposta => {
        this.todo = resposta.data;
      });
    }
  },

  computed: {}
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: text-bottom;
}

@media (max-width: 991px) {
  [role="card"] {
    min-width: 100% !important;
    margin-left: 29px !important;
  }
}

td {
  font-size: 10pt;
}

.shadow-custom {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>