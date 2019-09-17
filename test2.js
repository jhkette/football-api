async function getData() {
    let response = await fetch(`https://raw.githubusercontent.com/openfootball/football.json/master/2014-15/en.1.json`);
    let data = await response.json()
    return data;
}

function getmatches(data) {
    const allmatches = []

    data.rounds.map((item) => {
        allmatches.push(item.matches)
    })
    return allmatches
}

function teams(m, teamchosen) {
    const team = []
    m.forEach(el => {
        team.push(el.filter(e => {
            return e.team1.key == teamchosen
        }))
        team.push(el.filter(e => {
            return e.team2.key == teamchosen
        }))
    })
    const x = team.filter(t => {
        return t.length != 0
    })
    return x
}

function score(m, teamchosen) {
    let score = 0
    m.forEach((match) => {
        if (match[0].team1.key ==  teamchosen) {
            score += match[0].score1
        }
        if (match[0].team2.key ==  teamchosen) {
            score += match[0].score2
        }
        //  console.log(match)
    })
    return score
}

const getgoals =  async (teamchosen) => {
    const y = await getData()
    const x = getmatches(y)
    const z = teams(x, teamchosen)
    const final = score(z, teamchosen)
    return final
}