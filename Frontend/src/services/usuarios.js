import { http } from "./config";

export default {

    ListarUsuario: () => {
        return http.get('users')
    },

    delUsuario: (id) => {
        return http.delete("user/" + id)
    },
    addUsuario: (usuario) => {
        return http.post("user", usuario)
    }

}