export default {

    transformarData(x) {
        let c = []
        var b = x.split("-")
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
    }
}
