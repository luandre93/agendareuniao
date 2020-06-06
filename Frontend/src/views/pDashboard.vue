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
              <div class="form-row border-bottom">
                <span class="fa fa-search fa-lg fw pb-2 pt-2 mt-1"></span>
                <input
                  type="text"
                  class="form-control bg-white border-0 pl-3 pr-3"
                  aria-describedby="helpId"
                  placeholder="Procurar..."
                  style="width: 200px"
                />
              </div>
            </div>

            <!--- Botão Adicionar -->
            <div class="form-row float-right mr-4">
              <button
                class="btn btn-outline-success border waves-effect"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >Publicar Reunião</button>
            </div>
          </div>

          <div class="py-4 mx-0 border-bottom border-color-light"></div>
          <!--- Inicio dos Cartões -->

          <div class="mx-4">
            <div class="row">
              <div v-for="todo in todos" :key="todo.id">
                <div
                  class="card m-3 shadow-sm border-top-0 border rounded px-1"
                  style="width: 21rem; height: 20rem; border-color:#ebeef5!important"
                >
                  <div
                    class="px-2 form-row border card-header rounded"
                    style="border-color:#ebeef5!important"
                  >
                    <div class="form-row col">
                      <div class="col">
                        <span class="fa fa-comments-o fa-lg fa-fw"></span>
                        <a class="ml-2 font-weight-bold">{{todo.titulo}}</a>
                      </div>
                    </div>
                  </div>
                  <div class="card-body p-3">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item border-bottom py-2 px-1 pb-2">
                        <span class="fa fa-bars fa-lg fa-fw mr-2"></span>
                        <a class="text-center">{{todo.categoria}}</a>
                      </li>
                      <li class="list-group-item border-bottom py-2 px-1 pb-2">
                        <span class="fa fa-map-o fa-lg fa-fw mr-2"></span>
                        <a class="text-center">{{todo.localizacao}}</a>
                      </li>
                      <li class="list-group-item border-bottom py-2 px-1 pb-2">
                        <span class="fa fa-clock-o fa-lg fa-fw mr-2"></span>
                        <a class="text-center">{{todo.hora_inicial}} ~ {{todo.hora_final}}</a>
                      </li>
                      <li class="list-group-item border-bottom py-2 px-1 pb-2">
                        <span class="fa fa-calendar fa-lg fa-fw mr-2"></span>
                        <a class="text-center">{{todo.data}}</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer bg-white border-0">
                    <small class="text-success float-right">
                      <span class="fa fa-clock-o fa-fw"></span>
                      {{todo.data}}
                    </small>
                  </div>
                </div>
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
              <div class="modal-content rounded-0">
                <form @submit.prevent="novaReuniao">
                  <div class="modal-header border-0">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                      <span class="fa fa-edit fa-lg fw"></span> Adicionar Reunião
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body">
                    <div class="form-row mt-2 p-3">
                      <div class="col-auto p-2">
                        <span class="fa fa-user fa-lg fa-fw"></span>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          v-model="reuniao.id_usuario"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder="id_usuario"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                    <div class="form-row mt-2 p-3">
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
                    <div class="form-row p-3">
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

                    <div class="form-row p-3">
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
                    <div class="form-row p-3">
                      <div class="col-auto p-2">
                        <span class="fa fa-calendar fa-lg fa-fw"></span>
                      </div>
                      <div class="col">
                        <input
                          type="date"
                          v-model="reuniao.data"
                          class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                          placeholder="Localização"
                          aria-describedby="helpId"
                        />
                      </div>
                    </div>
                    <div class="form-row p-3">
                      <div class="col-auto py-2">
                        <span class>Inicio</span>
                      </div>
                      <div class="col">
                        <input
                          type="time"
                          v-model="reuniao.hora_inicial"
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
                  </div>
                  <div class="modal-footer border-0">
                    <button
                      type="submit"
                      class="btn btn-block btn-primary"
                      @click="redirect('/')"
                    >Publicar</button>
                  </div>
                </form>
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
        id_usuario: "",
        titulo: "",
        data: "",
        categoria: "",
        localizacao: "",
        hora_inicial: "",
        hora_final: "",
        cancelada: ""
      },
      todos: []
    };
  },
  mounted() {
    this.listarReunioes();
  },

  methods: {
    redirect(link) {
      window.location.href = link;
    },

    novaReuniao() {
      reunioes
        .addReuniao(this.reuniao)
        .then(() => {
          //  this.listarReunioes();
        })
        .catch(() => {
          alert("Erro ao adicionar !");
        });
    },
    listarReunioes() {
      reunioes.ListarReuniao().then(resposta => {
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