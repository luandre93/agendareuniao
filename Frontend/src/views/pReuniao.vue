<template>
  <div class="app">
    <div class="row" v-for="todos in todosReuniao" :key="todos.id">
      <div class="col mx-0 px-0 mt-1" v-if="todos.id == $route.params.id">
        <!-- Cabeçalho -->
        <div class="border-color-light mb-2">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-list-alt mr-2"></i>
            {{todos.titulo.toUpperCase()}}
          </h4>
        </div>

        <div class="border py-2 border-right-0 border-left-0 border-bottom-0">
          <div class="col float-right">
            <div class="row border-bottom pb-2">
              <div class="col form-row">
                <div class="col-1 py-3">
                  <a style="font-size:20px; line-height:10px;">Descrição:</a>
                </div>
                <div class="col text-center">
                  <div class="nav-link p-2">
                    <span class="fa fa-bars fa-lg d-block text-center pb-1"></span>
                    <span class="text-center d-block">{{todos.categoria}}</span>
                  </div>
                </div>
                <div class="col text-center">
                  <div class="nav-link p-2">
                    <span class="fa fa-map-o fa-lg d-block text-center pb-1"></span>
                    <span class="text-center d-block">{{todos.localizacao}}</span>
                  </div>
                </div>
                <div class="col text-center">
                  <div class="nav-link p-2">
                    <span class="fa fa-clock-o fa-lg d-block text-center pb-1"></span>
                    <span class="text-center d-block">{{todos.hora_inicial}} ~ {{todos.hora_final}}</span>
                  </div>
                </div>
                <div class="col text-center">
                  <div class="nav-link p-2">
                    <span class="fa fa-calendar fa-lg d-block text-center pb-1"></span>
                    <span class="text-center d-block">{{transformarData(todos.data)}}</span>
                  </div>
                </div>
                <div class="col text-center border-left">
                  <div class="btn waves-effect nav-link p-2">
                    <span class="fa fa-paperclip fa-lg d-block text-center pb-1"></span>
                    <span class="text-center d-block">Anexos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid">
            <div class="col-auto">
              <div class="row" v-for="todo in todosPautaFiltrado" :key="todo.id">
                <div class="col py-3">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div class="row">
                        <div class="text-body">
                          <span
                            class="fa fa-chevron-right alert-info p-2 rounded mr-2 text-white bg-dark"
                          ></span>
                          <span class="text-body alert-info p-2 rounded">{{todo.pauta}}</span>
                        </div>
                        <div class="float-right my-auto col">
                          <span
                            :style="{color: btnSuccess[todo.id]}"
                            class="fa fa-check-circle fa-1x float-right"
                          ></span>
                        </div>
                      </div>
                    </li>
                    <textarea
                      tabindex="1"
                      @change="atualizarPauta(todo.id, todo.comentario)"
                      @keydown.tab="atualizarPauta(todo.id, todo.comentario)"
                      @keydown.space="limparBtnSuccess(todo.id)"
                      @keydown.delete="limparBtnSuccess(todo.id)"
                      v-model.trim="todo.comentario"
                      class="list-group-item px-2"
                    ></textarea>
                  </ul>
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
import reunioes from "@/services/reunioes";
import usuarios from "@/services/usuarios";
import pautas from "@/services/pautas";
import EventBus from "@/eventBus/EventBus";
import functions from "@/libs/transformardata";
import router from "@/router/index";

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
        cancelada: "",
        iniciada: ""
      },
      pauta: {
        id: "",
        pauta: "",
        id_reuniao: "",
        horario: "",
        comentario: ""
      },

      btnSuccess: [],
      usuario: EventBus.usuario,
      todosReuniao: [],
      usuarios: [],
      todosPauta: []
    };
  },
  mounted() {
    this.sleep(50).then(() => {
      this.listarReuniaoID(this.usuario.id);
    });
  },
  created() {
    EventBus.$on("usuario", usuarioCarregado => {
      this.usuario = usuarioCarregado;
      this.reuniao.id_usuario = this.usuario.id;
    });

    this.reuniao.id_usuario = this.usuarios.id;
  },
  computed: {
    todosPautaFiltrado() {
      return !this.todosPauta
        ? this.todosPauta
        : this.todosPauta.filter(t => t.id_reuniao == this.$route.params.id);
    }
  },

  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    transformarData(x) {
      return functions.transformarData(x);
    },
    verificarData(id) {
      for (this.index in this.todosReuniao) {
        if (this.todosReuniao[this.index].id == id) {
          if (
            functions.compareDates(
              functions.transformarData(this.todosReuniao[this.index].data)
            ) == "dataFuturo"
          ) {
            alert(
              "Não é possivel iniciar a Reunião, pois ela esta agendada para " +
                functions.transformarData(this.todosReuniao[this.index].data) +
                " e só será liberada essa data."
            );
            router.push({ name: "pDashboard" });
          }
          if (
            functions.compareDates(
              functions.transformarData(this.todosReuniao[this.index].data)
            ) == "dataPassado"
          ) {
            alert(
              "Essa reunião já passou da data agendada e está bloqueada para iniciar!"
            );
            router.push({ name: "pDashboard" });
          }
          if (
            functions.compareDates(
              functions.transformarData(this.todosReuniao[this.index].data)
            ) == "dataAtual"
          ) {
            this.listarPautasID(this.$route.params.id);
          }
        }
      }
    },
    atualizarPauta(id, comentario) {
      if (comentario == "" || comentario == comentario.trim) {
        alert("campo está vazio, favor preencha.");
      } else {
        this.pauta.comentario = comentario;
        this.pauta.id = id;
        this.btnSuccess[id] = "#3CB371";
        console.log(this.pauta);
        pautas
          .atualizarPautaComentario(id, this.pauta)
          .then(() => {
            this.pauta.comentario = "";
            this.pauta.id = "";
          })
          .catch(err => {
            alert("Não foi possivel atualizar a resposta da pauta. " + err);
          });
      }
    },
    limparBtnSuccess(id) {
      this.btnSuccess[id] = "#000";
    },

    listarUsuarios() {
      usuarios.ListarUsuario().then(resposta => {
        this.usuarios = resposta.data;
      });
    },
    listarPautasID(id) {
      pautas.ListarPautasID(id).then(resposta => {
        this.todosPauta = resposta.data;
      });
    },

    listarReuniaoID(id) {
      reunioes.ListarReunioesID(id).then(resposta => {
        this.todosReuniao = resposta.data;
        this.verificarData(this.$route.params.id);
      });
    }
  }
};
</script>
<style>
.swiper {
  height: 400px;
  width: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  background-color: white;
}
</style>