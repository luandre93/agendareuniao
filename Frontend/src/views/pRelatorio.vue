<template>
  <div class="app">
    <div class="row">
      <div class="col mx-0 px-0 mt-1">
        <!-- Cabeçalho -->
        <div class="border-color-light mb-2 border-bottom">
          <h4 class="text-left px-2 h5">
            <i class="fa fa-file-text-o mr-2"></i>
            Relatórios
          </h4>
        </div>
      </div>
    </div>
    <div class="row p-2 py-3">
      <div class="col-3 mb-3 p-0">
        <div class="col-4 rounded shadow-custom" style="max-width:350px; max-height:300px">
          <div class="py-2">
            <div class="p-2">
              <div class="h3">
                <div class="text-uppercase text-truncate">
                  <span class="fa fa-address-card fa-fw"></span>
                  {{usuario.nome}}
                </div>
              </div>
            </div>
            <table class="table table-sm">
              <tr class="pt-2">
                <td class>Tipo:</td>
                <td class="text-right">{{tipoUsuario(usuario.nivel)}}</td>
              </tr>
              <tr class="pt-2">
                <td class>Reuniões:</td>
                <td class="text-right">{{todosReunioes.length}}</td>
              </tr>
              <tr class="pt-2">
                <td class>Pautas:</td>
                <td class="text-right">{{todosPautaTotal.length}}</td>
              </tr>
              <tr class="pt-2">
                <td class>Horas em Reuniao:</td>
                <td class="text-right">{{todosReuniaoHoras}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="col shadow-custom rounded">
          <div class="span h4 p-2">Gráfico de Horas/Reunião</div>
          <Echarts class="m-auto" :options="chartOptionsBar"></Echarts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/eventBus/EventBus";
import usuarios from "@/services/usuarios";
import reunioes from "@/services/reunioes";
import pautas from "@/services/pautas";
import functions from "@/libs/transformardata";
import Echarts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";

export default {
  components: {
    Echarts
  },
  data() {
    return {
      usuario: EventBus.usuario,
      reuniao: {
        id: "",
        id_usuario: "",
        titulo: "",
        data: "",
        categoria: "",
        localizacao: "",
        hora_inicial: "",
        hora_final: "",
        cancelada: "",
        iniciada: "",
        cor: ""
      },
      pauta: {
        id: "",
        pauta: "",
        id_reuniao: "",
        horario: "",
        comentario: ""
      },
      chartArray: [],
      todosPauta: [],
      todosReunioes: [],
      todosPautaTotal: [],
      todosReuniaoHoras: "",
      chartOptionsBar: {
        title: {
          textStyle: {
            color: "#235894"
          }
        },
        tooltip: {},
        series: {
          name: "pie",
          type: "pie",
          selectedMode: "single",
          selectedOffset: 20,
          clockwise: true,
          label: {
            fontSize: 14,
            color: "#235894"
          },
          labelLine: {
            lineStyle: {
              color: "#235894"
            }
          },
          data: []
        }
      }
    };
  },

  mounted() {
    this.sleep(50).then(() => {
      this.listarReunioesIdUsuario(this.usuario.id);

      console.log(this.chartOptionsBar.series.data);
      this.usuario.id = EventBus.usuario.id;
    });
  },
  created() {
    EventBus.$on("usuario", usuarioCarregado => {
      this.usuario = usuarioCarregado;
      this.usuario.id = EventBus.usuario.id;
    });
  },
  methods: {
    chartData() {},

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    tipoUsuario(x) {
      x == 1 ? (this.a = "Administrador") : (this.a = "Usuário");
      return this.a;
    },
    listarUsuarios() {
      usuarios.ListarUsuario().then(resposta => {
        this.todos = resposta.data;
        this.usuario.nivel = "";
        this.usuario.cancelado = "";
      });
    },
    listarPautasUsuario() {
      for (this.index in this.todosReunioes) {
        pautas
          .ListarPautasID(this.todosReunioes[this.index].id)
          .then(resposta => {
            this.todosPauta = resposta.data;
            for (this.indexP in this.todosPauta) {
              this.todosPautaTotal.push(this.indexP);
            }
          });
      }
    },

    somaHorasReuniao() {
      let todosHoras = 0;
      let horas = 0;
      for (this.index in this.todosReunioes) {
        todosHoras +=
          parseFloat(
            functions.transformarHora(this.todosReunioes[this.index].hora_final)
          ) -
          parseFloat(
            functions.transformarHora(
              this.todosReunioes[this.index].hora_inicial
            )
          );
        horas =
          parseFloat(
            functions.transformarHora(this.todosReunioes[this.index].hora_final)
          ) -
          parseFloat(
            functions.transformarHora(
              this.todosReunioes[this.index].hora_inicial
            )
          );

        this.chartOptionsBar.series.data.push({
          value: horas,
          name:
            this.todosReunioes[this.index].titulo +
            "\n" +
            horas.toString().slice(0, -2) +
            " horas"
        });
      }
      this.todosReuniaoHoras = todosHoras.toString().slice(0, -2) + " horas";
    },

    listarReunioesIdUsuario(id) {
      reunioes.ListarReunioesID(id).then(resposta => {
        this.todosReunioes = resposta.data;
        this.listarPautasUsuario();
        this.somaHorasReuniao();
      });
    }
  }
};
</script>

<style>
</style>