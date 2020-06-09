import { http } from "./config";

export default {

    ListarReuniao() {
        return http.get('users/reunioes')
    },

    ListarReuniaoID(id) {
        return http.get('users/reuniao/' + id)
    },

    delReuniao(id) {
        return http.delete("users/reuniao/" + id)
    },
    addReuniao(reuniao) {
        return http.post("users/reuniao", reuniao)
    }

}