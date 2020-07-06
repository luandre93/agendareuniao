<template>
  <div class="container-fluid" id="menu">
    <nav class="nav navbar-dark border-bottom shadow-sm bg-dark fixed-top py-1">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <span class="mx-5 h5">CoAgendei.</span>
      </div>
      <!-- Alerta sobre a Reunião -->
      <div class="col float-right">
        <cSaida />
        <cNotificacao ref="cNotificacaoOne" />
      </div>
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
import cSaida from "@/views/components/cSaida.vue";
import cNavBar from "@/views/components/cNavBar.vue";
import usuarios from "@/services/usuarios";
import EventBus from "@/eventBus/EventBus";
import router from "@/router/index";

export default {
  components: {
    cNotificacao,
    cCalendario,
    cNavBar,
    cSaida
  },
  mounted() {
    this.verificarUsuario();
    this.autenticar();
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
    },
    verificarUsuario() {
      if (this.usuario == "") {
        router.push({ name: "pLogin" });
        localStorage.usertoken = "";
      }
    }
  }
};
</script>
