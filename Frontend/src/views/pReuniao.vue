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
            <div class="form-row border-bottom">
              <div class="col form-row">
                <div class="col-1 py-3">
                  <a class="h5" style="font-size:16px">Descrição:</a>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-bars fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{todo.categoria}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-map-o fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{todo.localizacao}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-clock-o fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{todo.hora_inicial}} ~ {{todo.hora_final}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-calendar fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{ transformarData(todo.data)}}</span>
                </div>
                <div class="col mt-2">
                  <div class="form-row border-left">
                    <div
                      class="ml-2 float-right nav-link px-2 py-2 rounded-pill waves-effect waves-ripple"
                      data-toggle="modal"
                      style="background: #eee"
                      data-target="#exampleModalCenter"
                    >
                      <span class="fa fa-plus text-success fa-fw"></span>
                      <span class="pr-2 font-weight-bold">Iniciar</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--- Botão Adicionar -->
            <div class="form-row float-left mr-4"></div>
          </div>

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
import functions from "@/libs/transformardata";

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
    transformarData(x) {
      return functions.transformarData(x);
    },

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