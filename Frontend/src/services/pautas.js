import { http } from "./config";

export default {

    ListarPautas() {
        return http.get('users/reunioes/pautas')
    },


    delPauta(id) {
        return http.delete("users/reuniao/pauta/" + id)
    },

    addPauta(id) {
        return http.post("users/reuniao/pauta/", id)
    },
    atualizarPauta(id, pauta) {
        return http.put("users/reuniao/pauta/" + id, pauta)
    },

}