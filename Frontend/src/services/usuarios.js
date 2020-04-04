import { http } from "./config";

export default {

    ListarUsuario: () => {
        return http.get('users')
    },
    addNovoUsuario: (usuario) => {
        return http.post("user", usuario)
    }

}