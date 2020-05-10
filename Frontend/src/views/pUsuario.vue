<template>
  <div class="app">
    <div id="todo-list-example">
      <div>
        <div class="col-md-11">
          <h1 class="text-left border-bottom">Lista de Usuários</h1>
          <form @submit.prevent="novoUsuario">
            <div class="form-row mt-4">
              <div class="col">
                <input
                  type="text"
                  v-model="usuario.nome"
                  class="form-control"
                  placeholder="Usuário"
                />
              </div>
              <div class="col">
                <input type="text" v-model="usuario.senha" class="form-control" placeholder="Senha" />
              </div>
              <div class="col">
                <select class="custom-select" type="text" v-model="usuario.nivel">
                  <option disabled value>Escolha um nivel</option>
                  <option>Usuário</option>
                  <option>Administrador</option>
                </select>
              </div>
              <div class="col">
                <select class="custom-select" type="text" v-model="usuario.cancelado">
                  <option disabled value>Bloqueado/Liberado</option>
                  <option>Liberado</option>
                  <option>Bloqueado</option>
                </select>
              </div>
              <div class="col-auto mx-2">
                <button
                  type="submit"
                  class="btn btn-primary rounded-0 waves-effect waves-block px-5"
                >Enviar</button>
              </div>
            </div>
          </form>

          <table class="table table-sm mt-4">
            <thead class="text-left bg-light">
              <td>Nome</td>
              <td>Senha</td>
              <td class="text-center">Nivel</td>
              <td class="text-center">Status</td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="todo in todos" :key="todo.id">
                <td class="text-left">{{todo.nome}}</td>
                <td class="text-left">{{todo.senha}}</td>
                <td class="text-center">{{todo.nivel}}</td>
                <td class="text-center">{{todo.cancelado}}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-info rounded-0"
                    v-on:click="editarUsuario(todo.id)"
                  >Editar</button>
                  <button
                    class="btn btn-sm btn-danger ml-1 rounded-0"
                    v-on:click="deletarUsuario(todo.id)"
                  >Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from "@/services/usuarios";

export default {
  data() {
    return {
      usuario: { id: "", nome: "", senha: "", nivel: "", cancelado: "" },
      todos: []
    };
  },
  mounted() {
    /*this.listarUsuario();*/
    this.listarUsuario();
  },

  methods: {
    novoUsuario() {
      if (this.usuario.nivel == "Usuário") {
        this.usuario.nivel = 0;
      }
      if (this.usuario.nivel == "Administrador") {
        this.usuario.nivel = 1;
      }
      if (this.usuario.cancelado == "Liberado") {
        this.usuario.cancelado = 0;
      }
      if (this.usuario.cancelado == "Bloqueado") {
        this.usuario.cancelado = 1;
      }

      usuarios
        .addUsuario(this.usuario)
        .then(() => {
          this.usuario.nivel = "";
          this.usuario.cancelado = "";
          this.listarUsuario();
        })
        .catch(() => {
          alert("Erro ao adicionar !");
          this.usuario.nivel = "";
          this.usuario.cancelado = "";
        });
    },

    deletarUsuario(id) {
      alert(this.usuario.nome);
      usuarios
        .delUsuario(id)
        .then(() => {
          this.listarUsuario();
        })
        .catch(() => {
          alert("Erro ao deletar usuario!");
        });
    },

    listarUsuario() {
      usuarios.ListarUsuario().then(resposta => {
        console.log(resposta.data);
        this.todos = resposta.data;
      });
    }
  },

  computed: {}
};
</script>

<style scoped>
h1 {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.table th,
.table td {
  vertical-align: text-bottom;
}

td {
  font-size: 10pt;
}
</style>