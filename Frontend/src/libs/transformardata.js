export default {

    transformarData(x) {
        let c = []
        let b = x.split("-")
        let d = 0;
        c.push("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec");
        for (let i = 0; i <= 11; i++) {
            if (c[i].includes(b[1])) {
                d = "0" + (1 + i)
                b[1] = d;
                if (b[1] == "010") {
                    b[1] = 10
                }
                if (b[1] == "011") {
                    b[1] = 11
                }
                if (b[1] == "012") {
                    b[1] = 12
                }
            }
        }
        return b[2] + "/" + b[1] + "/" + b[0]
    },
    compareDates(date) {
        var today = this.dataAtual()
            .split("/")
            .toString()
            .replace(/,/g, "");

        var dateNew = date
            .split("/")
            .toString()
            .replace(/,/g, "");

        if (this.reverse(dateNew) > this.reverse(today)) {
            this.a = "dataFuturo";
        }
        if (this.reverse(dateNew) < this.reverse(today)) {
            this.a = "dataPassado";
        }
        if (this.reverse(dateNew) == this.reverse(today)) {
            this.a = "dataAtual";
        }
        return this.a;
    },

    dataAtual() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = dia.length == 1 ? "0" + dia : dia,
            mes = (data.getMonth() + 1).toString(),
            mesF = mes.length == 1 ? "0" + mes : mes,
            anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    },

    reverse(s) {
        return s
            .split("")
            .reverse()
            .join("");
    },

}
