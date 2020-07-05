
<template>
  <div class="container-fluid" id="menu">
    <nav class="navbar-expand-sm navbar-dark py-1 border-bottom shadow-sm bg-dark fixed-top">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <a class="mx-5">CoAgendei.</a>
      </div>
      <!-- Alerta sobre a Reunião -->
      <cNotificacao ref="cNotificacaoOne" />
    </nav>
    <div id="app">
      <!-- Calendario-->
      <cCalendario />
      <!-- Menu de opções -->
      <cNavBar />
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
import cNotificacao from "@/views/components/cNotificacao.vue";
import cCalendario from "@/views/components/cCalendario.vue";
import cNavBar from "@/views/components/cNavBar.vue";
import usuarios from "@/services/usuarios";
import EventBus from "@/eventBus/EventBus";
import router from "@/router/index";

export default {
  components: {
    cNotificacao,
    cCalendario,
    cNavBar
  },
  mounted() {
    this.autenticar();
    //this.$refs.cNotificacaoOne.escutarReunioes();

    EventBus.$on("logged-in", status => {
      this.auth = status;
    });
  },

  data() {
    const token = localStorage.usertoken;
    return {
      auth: "",
      token: token,
      dados: []
    };
  },
  methods: {
    autenticar() {
      usuarios
        .AutenPerfil(this.token)
        .then(res => {
          this.usuario = res.data;
          EventBus.$emit("usuario", this.usuario);
        })
        .catch(err => {
          console.log(err);
          router.push({ name: "pLogin" });
        });
    },

    logout() {
      localStorage.removeItem("usertoken");
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
@media (max-width: 1366px) {
  [role="root"] {
    margin-right: 0 !important;
  }
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
  color: #333 !important;
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

.active-nav-link {
  background-color: #177db83a;
  color: #333 !important;
}

nav .router-link-active {
  color: rgba(255, 255, 255, 0.25);
  font-weight: 700;
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


