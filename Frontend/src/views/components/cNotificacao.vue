<template>
  <span>
    <div
      role="dd_note"
      class="float-right waves-circle waves-effect"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="true"
      @click="cor='#fff'"
      style="margin-right:245px; background-color:#555;"
      :style="{color: cor}"
    >
      <span class="fa fa-bell fa-lg fa-fw" style="padding-top:11px"></span>
    </div>
    <div class="dropdown-menu mt-2 rounded shadow-sm" style="width: 400px;">
      <div class="text-center w-100 float-left mb-2">
        <h4 class="border-bottom pb-3">Notificações</h4>
      </div>

      <ul class="list-group-flush px-2">
        <li
          v-for="todo in todosList"
          :key="todo.id"
          class="list-group-item d-flex justify-content-between align-items-center nav-link-noti border-0 rounded-pill"
        >
          <div class="col-auto font-weight-bolder">
            <div class="col-auto p-1 h6 text-truncate">
              <b class style>{{todo.titulo}}</b> está agendada para hoje.
            </div>
            <span class="fa fa-clock-o fa-lg fa-fw"></span>
            <span class="p-2">Inicio: {{todo.hora_inicial}}</span>
            <span class="fa fa-calendar fa-lg fa-fw"></span>
            <span class="p-2">{{transformarData(todo.data)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </span>
</template>

<script>
import reunioes from "@/services/reunioes";
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
      index: 0,
      todos: [],
      todosList: [],
      usuarios: [],
      dtAtual: "",
      tituloM: "",
      comData: "",
      cor: "#fff"
    };
  },
  mounted() {
    this.dataAtual();
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

    escutarReunioes() {
      reunioes.ListarReuniao().then(resposta => {
        this.todos = resposta.data;
        for (this.index in this.todos) {
          this.verData = functions.transformarData(this.todos[this.index].data);
          this.comData = this.dataAtual();
          if (this.verData == this.comData) {
            this.todosList.push(this.todos[this.index]);
            this.cor = "#FF7F50";
          }
        }
      });
    }
  }
};
</script>

<style>
</style>