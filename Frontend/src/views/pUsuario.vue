<template>
  <div class="app">
    <div id="todo-list-example" class="container">
      <div>
        <div class="col-md-10">
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
            </div>
            <div class="form-row col mt-2">
              <div class="col mt-2">
                <button type="submit" class="btn btn-block btn-primary">Enviar</button>
              </div>
              <div class="col mt-2">
                <button type="submit" class="btn btn-block btn-primary">Atualizar</button>
              </div>
            </div>
          </form>

          <table class="table table-sm mt-4">
            <thead class="text-left bg-light">
              <td>Nome</td>
              <td>Senha</td>
              <td class="text-center">Nivel</td>
              <td class="text-center">Bloqueado</td>
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
                    class="btn btn-sm btn-info"
                    v-on:click="editarUsuario(todo.nome,todo.id)"
                  >Editar</button>
                  <button
                    class="btn btn-sm btn-danger ml-1"
                    v-on:click="deletarUsuario(todo.nome,todo.id)"
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
      usuario: { nome: "", senha: "", nivel: "", cancelado: "" },
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
        .addNovoUsuario(this.usuario)
        .then(() => {
          this.listarUsuario();
        })
        .catch(() => {
          alert("Erro ao adicionar " + this.usuario);
        });
    },

    listarUsuario() {
      usuarios.ListarUsuario().then(resposta => {
        console.log(resposta);
        this.todos = resposta.data;
      });
    }
  },

  computed: {}
  /* getUsuarios() {
      usuarios.get("users").then(
        result => {
          console.log(result.data);
          this.todos = result.data;
        },
        error => {
          console.error(error);
        }
      );
    },*/
  /*
    addNovoUsuario() {
      axios
        .post("/user", { usuario_nome: this.usuarioNome })
        .then((this.usuarioNome = ""), this.getUsuarios())
        .catch(err => {
          console.log(err);
        });
    },

    editarUsuario(title, id) {
      this.id = id;
      this.usuarioNome = title;
    },

    atualizarUsuario() {
      axios
        .put("/user/" + this.id, { usuario_nome: this.usuarioNome })
        .then(() => {
          this.usuarioNome = "";
          this.getUsuarios();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deletarUsuario(id) {
      axios.delete("/user/" + id).then(res => {
        this.usuarioNome = "";
        this.getUsuarios();
        console.log(res);
      });
    }
  }
  */
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