<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <div class="text-left border-bottom mb-4 font-custom border-color-light">
          <h3 class="text-left font-custom px-2">
            <i class="fa fa-users mr-3"></i>Lista de Usuários
          </h3>
        </div>

        <form @submit.prevent="novoUsuario">
          <div class="form-row mt-4">
            <div class="col">
              <input
                type="text"
                v-model="usuario.nome"
                class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                placeholder="Usuário"
              />
            </div>
            <div class="col">
              <input
                type="text"
                v-model="usuario.senha"
                class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                placeholder="Senha"
              />
            </div>
            <div class="col">
              <select
                class="custom-select border-left-0 border-right-0 border-top-0 rounded-0"
                type="text"
                v-model="usuario.nivel"
              >
                <option disabled value>Escolha um nivel</option>
                <option>Usuário</option>
                <option>Administrador</option>
              </select>
            </div>
            <div class="col">
              <select
                class="custom-select border-left-0 border-right-0 border-top-0 rounded-0"
                type="text"
                v-model="usuario.cancelado"
              >
                <option disabled value>Bloqueado/Liberado</option>
                <option>Liberado</option>
                <option>Bloqueado</option>
              </select>
            </div>
            <div class="col-auto mx-2">
              <button
                type="submit"
                class="btn btn-primary rounded-0 waves-effect waves-block px-5"
              >Adicionar</button>
            </div>
          </div>
        </form>

        <table class="table table-sm mt-4">
          <thead class="text-left bg-light">
            <td>Nome</td>
            <td>Senha</td>
            <td class="text-center">Nivel</td>
            <td class="text-center">Status</td>
            <td class="text-center">Editar</td>
            <td class="text-center">Excluir</td>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td class="text-left">{{todo.nome}}</td>
              <td class="text-left">{{todo.senha}}</td>
              <td class="text-center">{{todo.nivel}}</td>
              <td class="text-center">{{todo.cancelado}}</td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-info rounded-0 waves-effect waves-block"
                  v-on:click="editarUsuario(todo.id)"
                >
                  <i class="fas fa-user-edit"></i>
                </button>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-danger ml-1 rounded-0 waves-effect waves-block"
                  v-on:click="deletarUsuario(todo.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
        this.usuario.nivel = "";
        this.usuario.cancelado = "";
      });
    }
  },

  computed: {}
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: text-bottom;
}

td {
  font-size: 10pt;
}

input:focus,
button:focus,
select:focus {
  box-shadow: none;
}
</style>