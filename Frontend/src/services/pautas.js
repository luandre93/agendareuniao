import { http } from "./config";

export default {

    ListarPautas() {
        return http.get('users/reunioes/pautas')
    },

    ListarPautasID(id) {
        return http.get('users/reuniao/pauta_id_reuniao/' + id)
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
    atualizarPautaComentario(id, comentario) {
        return http.put("users/reuniao/pauta_comentario/" + id, comentario)
    },

}