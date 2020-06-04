import { http } from "./config";

export default {

    ListarReuniao: () => {
        return http.get('users/reunioes')
    },

    delReuniao: (id) => {
        return http.delete("users/reuniao/" + id)
    },
    addReuniao: (reuniao) => {
        return http.post("reuniao", reuniao)
    }

}