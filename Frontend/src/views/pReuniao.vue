<template>
  <div class="app">
    <div class="row" v-for="todos in todosReuniao" :key="todos.id">
      <div class="col mx-0 px-0 mt-1" v-if="todos.id == $route.params.id">
        <!-- Cabeçalho -->
        <div class="border-bottom mb-2 border-color-light">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-list-alt mr-2"></i>
            Titulo - {{todos.titulo}}
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
                  <span class="text-center d-block">{{todos.categoria}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-marker fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{todos.localizacao}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-clock-o fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{todos.hora_inicial}} ~ {{todos.hora_final}}</span>
                </div>
                <div class="col pt-2 pb-2">
                  <span class="fa fa-calendar fa-lg d-block text-center pb-1"></span>
                  <span class="text-center d-block">{{ transformarData(todos.data)}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="row">
              <div class="col p-2" style="height:400px;">
                <div class="row" v-for="todo in todosPauta" :key="todo.id">{{todo.pauta}}</div>
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
      usuario: EventBus.usuario,
      todosReuniao: [],
      usuarios: [],
      todosPauta: []
    };
  },
  mounted() {
    this.sleep(50).then(() => {
      this.listarReuniaoID(this.usuario.id);
      this.listarPautasID(this.$route.params.id);
    });
  },
  created() {
    EventBus.$on("usuario", usuarioCarregado => {
      this.usuario = usuarioCarregado;
      this.reuniao.id_usuario = this.usuario.id;
    });

    this.reuniao.id_usuario = this.usuarios.id;
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
            router.push({ name: "pReuniao", params: { id: id } });
          }
        }
      }
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
