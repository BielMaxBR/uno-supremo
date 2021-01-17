module.exports = function() {
    this.LimitPlayers = 4
    this.Turn = 0
    this.Direction = 1
    this.Players = {}
    this.Spectators = {}
    this.PlayerCards = {}
    this.Ready = {}
    this.TopCard = ''
    this.Baralho = criarBaralho()
    this.Playing = false

    function criarBaralho() {
        var baralhoTotal = []
        var cores = ["r","g","y","b"]
        // cc é pra escolher uma cor
        var coringas = ["+4","cc"]
        // jp é pra pular uma pessoa
        // in é pra inverter a sequência
        var especiais = ["+2", "jp","in"]
        for (var i = 0; i < cores.length; i++) {
            baralhoTotal.push(cores[i]+"0")
            for (var j = 1; j < 10; j++) {
                baralhoTotal.push(cores[i]+j.toString()) 
                baralhoTotal.push(cores[i]+j.toString())
            }
            for (var j = 0; j < especiais.length; j++) {
                baralhoTotal.push(cores[i]+especiais[j])
                baralhoTotal.push(cores[i]+especiais[j])
            }
        }
        for (var j = 0; j < 4; j++) {
            baralhoTotal.push(coringas[0])
            baralhoTotal.push(coringas[1])
        }
        return baralhoTotal
    }
}