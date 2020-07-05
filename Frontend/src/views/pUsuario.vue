<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <div class="text-left border-bottom mb-4 font-custom border-color-light">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-users mr-3"></i>Lista de Usuários
          </h4>
        </div>
        <form @submit.prevent="novoUsuario">
          <div class="form-row mt-4">
            <div class="col">
              <input
                type="text"
                v-model="usuario.nome"
                class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                placeholder="Nome"
              />
            </div>
            <div class="col">
              <input
                type="email"
                v-model="usuario.email"
                class="form-control border-left-0 border-right-0 border-top-0 rounded-0"
                placeholder="Email"
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
                class="btn float-right px-2 py-2 rounded-pill waves-effect border-0"
                data-toggle="modal"
                style="background: #eee"
              >
                <span class="px-2 font-weight-bold">Adicionar</span>
              </button>
            </div>
          </div>
        </form>
        <table class="table table-sm mt-4">
          <thead class="text-left bg-light">
            <td class="text-center">ID</td>
            <td class="text-center">Nome</td>
            <td class="text-center">Email</td>
            <td class="text-center">Senha</td>
            <td class="text-center">Nivel</td>
            <td class="text-center">Status</td>
            <td class="text-center">Editar</td>
            <td class="text-center">Excluir</td>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td class="text-center">{{todo.id}}</td>
              <td class="text-center">{{todo.nome}}</td>
              <td class="text-center">{{todo.email}}</td>
              <td class="text-center">**********</td>
              <td class="text-center">{{todo.nivel}}</td>
              <td class="text-center">{{todo.cancelado}}</td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-info rounded-0 waves-effect"
                  v-on:click="editarUsuario(todo.id)"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-danger ml-1 rounded-0 waves-effect"
                  v-on:click="excluirUsuario(todo.id)"
                >
                  <i class="fa fa-trash-o"></i>
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
import reunioes from "@/services/reunioes";
import pautas from "@/services/pautas";

//import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      usuario: {
        id: "",
        email: "",
        nome: "",
        senha: "",
        nivel: "",
        cancelado: ""
      },
      todos: [],
      todosReunioes: []
    };
  },
  mounted() {
    this.listarUsuarios();
    this.listarReunioes();
    this.listarPautas();
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
          this.listarUsuarios();
          alert("Usuario Adicionado com sucesso!");
        })
        .catch(() => {
          alert("Erro ao adicionar !");
          this.usuario.nivel = "";
          this.usuario.cancelado = "";
        });
    },

    excluirUsuario(id) {
      this.excluirReunioes(id);
      usuarios.delUsuario(id).then(() => {
        this.listarUsuarios();
      });
    },

    excluirReunioes(id_usuario) {
      for (this.indexR in this.todosReunioes) {
        if (this.todosReunioes[this.indexR].id_usuario == id_usuario) {
          this.excluirPautas(this.todosReunioes[this.indexR].id);
          reunioes.delReuniao(this.todosReunioes[this.indexR].id);
        }
      }
    },

    excluirPautas(id_reuniao) {
      for (this.indexP in this.todosPauta) {
        if (this.todosPauta[this.indexP].id_reuniao == id_reuniao) {
          pautas.delPauta(this.todosPauta[this.indexP].id);
        }
      }
    },

    listarPautas() {
      pautas.ListarPautas().then(resposta => {
        this.todosPauta = resposta.data;
      });
    },

    listarUsuarios() {
      usuarios.ListarUsuario().then(resposta => {
        this.todos = resposta.data;
        this.usuario.nivel = "";
        this.usuario.cancelado = "";
      });
    },

    listarReunioes() {
      reunioes.ListarReuniao().then(resposta => {
        this.todosReunioes = resposta.data;
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