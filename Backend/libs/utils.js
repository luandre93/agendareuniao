
function cabecalho() {
    let se = new Date();
    let seA = ("\033[0;32m[" + se.toLocaleTimeString() + "]\033[1;37m ");
    return seA;
}

module.exports = {
    cabecalho: cabecalho
};