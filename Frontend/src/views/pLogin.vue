<template>
  <div class="container">
    <nav class="navbar-expand-sm navbar-dark py-1 border-bottom shadow-sm bg-dark fixed-top">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <a class="mx-5">CoAgendei.</a>
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
          class="form-control rounded-0"
          v-model="usuario.email"
          placeholder="Endereço de Email"
          required
          autofocus
        />
        <label for="inputPassword" class="sr-only">Senha</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control rounded-0"
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

          router.push({ name: "pDashboard" });
        })
        .catch(err => {
          alert(err + err.data);
        });
      this.emitMethod();
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

body {
  height: 100% !important;

  font-family: system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue,
    Fira Sans, Ubuntu, Oxygen, Oxygen Sans, Cantarell, Droid Sans,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Lucida Grande, Helvetica,
    Arial, sans-serif !important;
}

.form-signin {
  width: 100%;
  height: 100% !important;
  max-width: 400px;
  padding: 20px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>