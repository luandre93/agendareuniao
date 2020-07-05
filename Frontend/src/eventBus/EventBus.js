import Vue from 'vue'

export default new Vue({
    data: {
        usuario: {
            id: undefined,
            email: undefined,
            nome: undefined,
            senha: undefined,
            nivel: undefined,
            cancelado: undefined
        },
    },

    created() {
        this.$on("usuario", usuarioCarregado => {
            this.usuario = usuarioCarregado;
        });
    }
});