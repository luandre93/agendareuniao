import { http } from "./config";

export default {

    ListarPautas() {
        return http.get('users/reunioes/pautas')
    },

    ListarPautaID(id) {
        return http.get('users/reuniao/pauta' + id)
    },

    delPauta(id) {
        return http.delete("users/reuniao/pauta" + id)
    },
    addPauta(pauta) {
        return http.post("users/reuniao/pauta", pauta)
    }

}