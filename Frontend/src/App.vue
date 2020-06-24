
<template>
  <div class="container-fluid" id="menu">
    <nav class="navbar-expand-sm navbar-dark py-1 border-bottom shadow-sm bg-dark fixed-top">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <a class="mx-5">CoAgendei.</a>
      </div>

      <div
        role="dd_note"
        class="float-right px-2 navbar-brand rounded-pill waves-effect"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        @click="cor='#fff'"
        style="margin-right:245px; background-color:#555;"
        :style="{color: cor}"
      >
        <span class="fa fa-bell fa-lg fw"></span>
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
            <div class="form-row">
              <div class="col-auto">
                <span class="fa fa-list-alt fa-lg fa-fw"></span>
              </div>
              <div class="col align-items-center font-weight-bolder">
                <span class="p-2">{{todo.titulo}}</span>
                <span class="p-2">Inicio:{{todo.hora_inicial}}</span>
                <span class="p-2">{{transformarData(todo.data)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div id="app">
      <nav class="d-lg-block d-none sidebar border-right border-left">
        <div class="sidebar-sticky">
          <ul class="nav flex-column" style="width:208px" id="menu">
            <div class="col mb-2 shadow-sm border-0">
              <div class="py-3">
                <span class="fa fa-address-card fa-fw"></span>
                <a class="font-weight-bolder ml-3 badge badge-info text-white p-2">Luandre Bernardi</a>
              </div>
            </div>
            <li class="nav-item waves-effect">
              <router-link class="nav-link" to="/dashboard">
                <span class="fa fa-list-alt fa-fw"></span>
                <a class="ml-3">Painel de Reuniões</a>
              </router-link>
            </li>
            <li class="nav-item waves-effect">
              <router-link class="nav-link" to="/">
                <span class="fa fa-file-text-o fa-fw"></span>
                <a class="ml-3">Relatórios</a>
              </router-link>
            </li>
            <li class="nav-item waves-effect">
              <router-link class="nav-link" to="/">
                <span class="fa fa-exchange fa-fw"></span>
                <a class="ml-3">Configurações</a>
              </router-link>
            </li>
            <li class="nav-item waves-effect waves-block">
              <router-link class="nav-link" to="/users">
                <span class="fa fa-users fa-fw"></span>
                <a class="ml-3">Usuários</a>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- <div class="fixed mt-md-auto bottom-text-mark border-top">
          <div class="mt-3 text-center">
            <a class="text-muted">© 2020 CoAgendei.</a>
          </div>
        </div>-->
      </nav>
      <!-- Calendario-->
      <nav class="calendar d-lg-block d-none shadow-sm border rounded float-right">
        <div class="border-bottom px-2">
          <div class="text-left font-weight-bold p-2">
            <span class="fa fa-calendar-o fa-fw mr-2"></span>
            <a class>Calendário</a>
          </div>
        </div>
      </nav>

      <!-- Alerta sobre a Reunião -->

      <!--fim Calendario-->
    </div>
    <div role="root" style="margin-left:230px; margin-right:250px; ">
      <main role="main" class="ml-lg-auto col-auto mt-5 pb-3 bg-white">
        <div
          class="shadow-sm border rounded pl-4 pr-4 pb-5 pt-2"
          style="border-color: #eee!important"
        >
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>



<script>
//import $ from "jquery";
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
      cor: ""
    };
  },
  mounted() {
    this.escutarReunioes();
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.border-color-light {
  border-color: #eee !important;
}
body {
  font-size: 0.7rem;
  font-family: system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue,
    Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Lucida Grande, Helvetica,
    Arial, sans-serif !important;
}

@media (max-width: 991px) {
  [role="root"] {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  [role="dd_note"] {
    margin-right: 40px !important;
    margin-left: 0 !important;
  }
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.shadow-custom {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}
/*
 * Sidebar
 */

.sidebar {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: left;
  position: fixed;
  min-width: 210px;
  width: 210px;
  height: 100%;
}

.calendar {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: left;
  position: fixed;
  min-width: 240px;
  width: 240px;
  height: 100%;
  right: 15px;
  margin-top: 35px;
  height: 15rem;
}

.sidebar-sticky {
  position: fixed;
  top: 0;
  height: calc(80vh - 50px);
  padding-top: 3rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 380;
  color: #333;
  font-size: 14px !important;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff67;
}

.nav-link:hover {
  background-color: #177db83a;
  color: #333;
}

.nav-link-noti:hover {
  background-color: rgba(98, 98, 98, 0.274);
  color: rgb(0, 0, 0);
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.8rem;
  text-transform: uppercase;
}

nav .router-link-active {
  color: rgba(255, 255, 255, 0.25);
  font-weight: 700;
}

[role="main"] {
  padding-top: 35px; /* Space for fixed navbar */
}

@media (min-width: 766px) {
  [role="main"] {
    padding-top: 35px; /* Space for fixed navbar */
  }
}
@media (min-width: 992px) {
  [role="main"] {
    width: 100% !important;
    margin-left: 0px;
    margin-right: 0px;
  }
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

input:focus,
button:focus,
select:focus {
  background-color: #fff;
  box-shadow: none !important;
}
</style>


