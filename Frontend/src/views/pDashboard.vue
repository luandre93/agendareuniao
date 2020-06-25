<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <!-- Cabeçalho -->
        <div class="border-bottom mb-2 border-color-light">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-list-alt mr-3"></i>Painel de Reuniões
          </h4>
        </div>

        <div class="col-auto">
          <!-- Procurar -->
          <div class="col">
            <div class="form-row mr-3 float-left">
              <div class="form-row border-bottom">
                <span class="fa fa-search fa-lg fw pb-2 pt-2 mt-1"></span>
                <input
                  type="search"
                  class="form-control bg-white border-0 pl-3 pr-3"
                  @keyup.enter="buscarReuniao"
                  :value="$route.query.procurar"
                  aria-describedby="helpId"
                  placeholder="Procurar..."
                  style="width: 200px"
                />
              </div>
            </div>

            <!--- Botão Adicionar -->

            <div
              class="float-right nav-link px-2 py-2 rounded-pill waves-effect waves-ripple"
              data-toggle="modal"
              style="background: #eee"
              data-target="#exampleModalCenter"
            >
              <span class="fa fa-plus text-success fa-fw"></span>
              <span class="pr-2 font-weight-bold">Publicar</span>
            </div>
          </div>

          <div class="py-4 mx-0 border-bottom border-color-light"></div>
          <!--- Inicio dos Cartões -->

          <div class="row mt-3" v-if="mostrarCards">
            <div
              v-for="todo in reunioesFiltradas"
              :key="todo.id"
              class="col-auto px-2"
              style="font-size: 13px !important;"
            >
              <div
                class="card px-0 shadow-sm border my-3 mx-1"
                role="card"
                style="width: 19rem; border-color:#ebeef5!important "
              >
                <div class="card-header rounded p-3 gradient-bg-blue">
                  <div class="text-white form-row">
                    <div class="col">
                      <div class="h5 text-truncate" style="max-width: 220px;">{{todo.titulo}}</div>
                      <div class="h6 pt-1" style="font-size: 14px;">Luandre Bernardi de Andrade</div>
                    </div>
                    <div class="col-2">
                      <router-link :to="{name: 'pReuniao', params:{id: todo.id}}">
                        <div class="btn float-right px-0">
                          <span class="fa fa-chevron-right fa-lg text-white"></span>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="card-body p-2 pb-4 px-3">
                  <div class>
                    <div class="h6 pt-2" style="font-size: 14px;">Data do inicio da reunião</div>
                    <div class="text-body">
                      <span class="fa fa-calendar fa-lg fa-fw mr-2"></span>
                      <a>{{transformarData(todo.data)}} – Inicio {{todo.hora_inicial}} até {{todo.hora_final}}.</a>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-light border-top p-1 text-justify">
                  <button class="btn nav-link px-2 rounded-pill waves-effect bg-light">Anexos</button>
                  <button
                    class="btn nav-link px-2 rounded-pill waves-effect bg-light"
                    @click="gerarAta()"
                  >Gerar Ata</button>
                  <button
                    class="btn nav-link px-2 rounded-pill waves-effect bg-light float-right"
                    @click="iniciarReuniao()"
                  >
                    <span class="fa fa-plus text-success fa-fw"></span>
                    <span class="pr-2 font-weight-bold">Iniciar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <center class="h4 my-5">Olá, não existe reuniões agendadas.</center>
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
              <div class="modal-content rounded p-3">
                <form @submit.prevent="novaReuniao">
                  <div class="modal-header border-0 p-0">
                    <a class="modal-title h5 pt-1" id="exampleModalCenterTitle"></a>
                    <button
                      type="button"
                      class="btn waves-effect font-weight-bold border-0 bg-danger"
                      style="font-size: 14px; color: white;"
                      data-dismiss="modal"
                    >X</button>
                  </div>

                  <div class="modal-body p-0">
                    <div class="form-row p-3">
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
                  <div class="modal-footer border-0 pt-3">
                    <button type="submit" class="btn btn-block waves-effect btn-primary">Publicar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- Fim Modal -->

          <!-- Button trigger modal -->
          <!-- <button
            type="button"
            class="btn btn-primary btn-lg"
            data-toggle="modal"
            data-target="#modelId"
          >Launch</button>-->

          <!-- Modal-->

          <div
            class="modal fade"
            id="modelId"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">sm</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">Body</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import reunioes from "@/services/reunioes";
import usuarios from "@/services/usuarios";
import functions from "@/libs/transformardata";

export default {
  data() {
    return {
      showModal: false,
      mostrarCards: true,
      reuniao: {
        id: "",
        id_usuario: "",
        titulo: "",
        data: "",
        categoria: "",
        localizacao: "",
        hora_inicial: "",
        hora_final: "",
        cancelada: "",
        iniciada: ""
      },
      todos: [],
      usuarios: []
    };
  },
  mounted() {
    this.listarReunioes();
    this.listarUsuarios();
  },
  computed: {
    reunioesFiltradas() {
      const procurar = this.$route.query.procurar;
      return !procurar
        ? this.todos
        : this.todos.filter(t =>
            t.titulo.toLowerCase().includes(procurar.toLowerCase())
          );
    }
  },

  methods: {
    buscarReuniao(event) {
      this.$router.push({
        path: "/dashboard",
        query: {
          procurar: event.target.value
        }
      });
    },

    transformarData(x) {
      return functions.transformarData(x);
    },
    limparCampos() {
      this.reuniao.id_usuario = "";
      this.reuniao.titulo = "";
      this.reuniao.categoria = "";
      this.reuniao.localizacao = "";
      this.reuniao.hora_inicial = "";
      this.reuniao.hora_final = "";
    },
    novaReuniao() {
      if (
        !(
          this.reuniao.titulo &&
          this.reuniao.categoria &&
          this.reuniao.localizacao &&
          this.reuniao.hora_inicial &&
          this.reuniao.hora_final &&
          this.reuniao.data
        )
      ) {
        alert("Por favor, preencha os campos obrigatórios.");
      } else {
        reunioes
          .addReuniao(this.reuniao)
          .then(() => {
            this.listarReunioes();
            this.limparCampos();
            $(".modal").modal("hide");
          })
          .catch(() => {
            alert("Erro ao adicionar !");
          });
      }
    },

    listarReunioes() {
      reunioes.ListarReuniao().then(resposta => {
        this.todos = resposta.data;
        this.todos.length == 0
          ? (this.mostrarCards = false)
          : (this.mostrarCards = true);
      });
    },

    listarUsuarios() {
      usuarios.ListarUsuario().then(resposta => {
        this.usuarios = resposta.data;
      });
    }
  }
};
</script>

<style scoped>
.a-x2 {
  font-size: 15px !important;
  font-weight: 500;
}

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

.gradient-bg-blue {
  background: rgb(96, 108, 136); /* Old browsers */
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(96, 108, 136, 1) 10%,
    rgba(63, 76, 107, 1) 86%
  ); /* FF3.6-15 */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(96, 108, 136, 1) 10%,
    rgba(63, 76, 107, 1) 86%
  ); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(
    ellipse at center,
    rgba(96, 108, 136, 1) 10%,
    rgba(63, 76, 107, 1) 86%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#606c88', endColorstr='#3f4c6b',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}
</style>