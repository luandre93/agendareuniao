<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <!-- Cabeçalho -->
        <div class="border-bottom mb-2 border-color-light">
          <h3 class="text-left font-custom px-2">
            <i class="fa fa-list-alt mr-3"></i>Painel de Reuniões
          </h3>
        </div>

        <div class="col-auto px-0">
          <!-- Procurar -->
          <div class="col float-right">
            <div class="form-row mr-3 float-right">
              <span class="fa fa-search fa-lg fw pb-2 pt-2 mt-1"></span>
              <input
                type="text"
                class="form-control bg-white border-0 pl-3 pr-3"
                aria-describedby="helpId"
                placeholder="Procurar..."
                style="width: 200px"
              />
              <button class="btn btn-success waves-effect rounded-0">OK</button>
            </div>

            <!--- Botão Adicionar -->
            <div class="form-row float-left ml-2">
              <button
                class="btn btn-success waves-effect rounded-0"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >Adicionar Reunião</button>
            </div>
          </div>

          <div class="py-4 mx-0 border-bottom border-color-light"></div>
          <!--- Inicio dos Cartões -->
          <div class="row col mx-1 mt-4">
            <div
              role="card"
              class="card shadow-sm border-color-light mx-0"
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

          <!-- Modal Adicionar reuniao -->
          <div
            class="modal fade bd-example-modal-lg"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">
                    <span class="fa fa-edit fa-lg fw"></span> Adicionar Reunião
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="novaReuniao">
                    <div class="form-row">
                      <div class="col-auto p-2">
                        <span class="fa fa-comments-o fa-lg fa-fw"></span>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          v-model="reuniao.titulo"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0 mb-2"
                          placeholder="Titulo"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-auto p-2">
                        <span class="fa fa-bars fa-lg fa-fw"></span>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          v-model="reuniao.categoria"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder="Categoria"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>

                    <div class="form-row mt-2">
                      <div class="col-auto p-2">
                        <span class="fa fa-map-o fa-lg fa-fw"></span>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          v-model="reuniao.localizacao"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder="Localização"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                    <div class="form-row mt-2">
                      <div class="col-auto py-2">
                        <span>Inicio</span>
                      </div>
                      <div class="col">
                        <input
                          type="time"
                          v-model="reuniao.hora_inicio"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder
                          aria-describedby="helpId"
                        />
                      </div>
                      <div class="col-auto py-2">
                        <span>Final</span>
                      </div>
                      <div class="col">
                        <input
                          type="time"
                          v-model="reuniao.hora_final"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder="Localização"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-block btn-primary">Publicar</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Fim Modal -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import reunioes from "@/services/reunioes";

export default {
  data() {
    return {
      reuniao: {
        id: "",
        titulo: "",
        categoria: "",
        localizacao: "",
        hora_inicio: "",
        hora_final: ""
      },
      todos: []
    };
  },
  mounted() {
    this.listarReunioes();
  },

  methods: {
    novaReuniao() {
      reunioes
        .addReuniao(this.reuniao)
        .then(() => {
          this.listarUsuario();
        })
        .catch(() => {
          alert("Erro ao adicionar !");
        });
    },
    listarReunioes() {
      reunioes.ListarReuniao().then(resposta => {
        console.log(resposta.data);
        this.todos = resposta.data;
      });
    }
  },

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