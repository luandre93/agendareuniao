<template>
  <span>
    <div
      role="dd_note"
      class="float-right waves-circle waves-effect mx-1"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
      @click="cor='#fff'"
      style=" background-color:#555;"
      :style="{color: cor}"
    >
      <span class="fa fa-bell fa-lg fa-fw" style="padding-top:11px"></span>
    </div>

    <div class="dropdown-menu dropdown-menu-left mt-2 rounded shadow-sm" style="width: 325px;">
      <div class="text-center w-100 float-left mb-2">
        <h4 class="border-bottom pb-3">Notificações</h4>
      </div>

      <ul class="list-group-flush px-2">
        <div class v-if="mostrarNotificacao">
          <li
            v-for="todo in todosList"
            :key="todo.id"
            class="list-group-item d-flex align-items-center nav-link-noti border-0 rounded-pill"
          >
            <div class="mx-auto text-center font-weight-bolder">
              <div class="col-auto p-1 h6 text-truncate text-body text-left">
                <b>{{todo.titulo}}</b> está agendada para hoje.
              </div>
              <span class="fa fa-clock-o fa-lg fa-fw"></span>
              <span class="p-2">Inicio: {{todo.hora_inicial}}</span>
              <span class="fa fa-calendar fa-lg fa-fw"></span>
              <span class="p-2">{{transformarData(todo.data)}}</span>
            </div>
          </li>
        </div>
        <div v-else>
          <li
            class="list-group-item d-flex justify-content-between align-items-center border-0 rounded-pill"
          >
            <div class="col-auto mx-auto">
              <span class="text-center h5">Não existe notificações</span>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </span>
</template>

<script>
import reunioes from "@/services/reunioes";
import functions from "@/libs/transformardata";
import EventBus from "@/eventBus/EventBus";

export default {
  data() {
    return {
      usuario: EventBus.usuario,
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
      mostrarNotificacao: true,
      todos: [],
      usuarios: [],
      dtAtual: "",
      tituloM: "",
      comData: "",
      verData: "",
      cor: "#fff"
    };
  },
  mounted() {
    this.sleep(100).then(() => {
      this.dataAtual();
      this.escutarReunioes(this.usuario.id);
    });
  },

  created() {
    EventBus.$on("usuario", usuarioCarregado => {
      this.usuario = usuarioCarregado;
    });
    this.usuario = EventBus.usuario;
  },

  computed: {
    todosList() {
      return !this.todos
        ? this.todos
        : this.todos.filter(
            t => functions.transformarData(t.data) == this.dataAtual()
          );
    }
  },

  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    transformarData(x) {
      return functions.transformarData(x);
    },

    dataAtual() {
      var data = new Date(),
        dia = data.getDate().toString(),
        diaF = dia.length == 1 ? "0" + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = mes.length == 1 ? "0" + mes : mes,
        anoF = data.getFullYear();
      return diaF + "/" + mesF + "/" + anoF;
    },

    escutarReunioes(id) {
      reunioes.ListarReunioesID(id).then(resposta => {
        this.todos = resposta.data;
        if (this.todosList.length == 0) {
          this.mostrarNotificacao = false;
        } else {
          this.mostrarNotificacao = true;
          this.cor = "#ff9f2f";
        }
      });
    }
  }
};
</script>

<style>
</style> 