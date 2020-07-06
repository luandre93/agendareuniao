<template>
  <div class="container" id="menu">
    <nav class="nav navbar-dark border-bottom shadow-sm bg-dark fixed-top py-1">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <span class="mx-5 h5">CoAgendei.</span>
      </div>
    </nav>

    <div class="col modal-dialog-centered">
      <form v-on:submit.prevent="login" class="form-signin">
        <div class="h2 text-center m-4">CoAgendei.</div>
        <h1 class="h4 mb-4 font-weight-normal text-center">Entre com as credenciais</h1>
        <label for="inputEmail" class="sr-only">Endereço de Email</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control rounded-0 border"
          v-model="usuario.email"
          placeholder="Endereço de Email"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Senha</label>
        <input
          type="password"
          id="current-password"
          class="form-control rounded-0 border"
          v-model="usuario.senha"
          placeholder="Senha"
          required
        />
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Lembrar-me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block rounded-0 waves-effect" type="submit">Entrar</button>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
      </form>
    </div>
  </div>
</template>


<script>
import usuarios from "@/services/usuarios";
import router from "../router/index";
import EventBus from "@/eventBus/EventBus";
export default {
  data() {
    return {
      usuario: {
        email: "",
        senha: ""
      },
      objeto: []
    };
  },
  methods: {
    login() {
      usuarios
        .LoginUsuario(this.usuario)
        .then(res => {
          localStorage.setItem("usertoken", res.data);
          this.email = "";
          this.senha = "";
          if (res) {
            this.emitMethod();
            router.push({ name: "pDashboard" });
          } else {
            alert("Usuário ou a senha está incorreto.");
          }
        })
        .catch(() => {
          alert("Usuário ou a senha está incorreto.");
        });
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    }
  }
};
</script>

<style>
.border-color-light {
  border-color: #eee !important;
}
</style>