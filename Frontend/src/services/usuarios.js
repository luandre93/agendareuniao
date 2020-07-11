import { http } from "./config";

export default {

    ListarUsuario: () => {
        return http.get('users')
    },
    ListarUsuarioID: (id) => {
        return http.get('user/' + id)
    },


    delUsuario: (id) => {
        return http.delete("user/" + id)
    },

    addUsuario: (usuario) => {
        return http.post("user", usuario)
    },
    LoginUsuario: (usuario) => {
        return http.post("user/login", usuario)
    },
    AutenPerfil: (token) => {
        return http.get("user/login/app", { headers: { 'Authorization': token } })

    }


}