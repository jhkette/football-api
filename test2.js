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

function teams(m) {
    const team = []
    m.forEach(el => {
        team.push(el.filter(e => {
            return e.team1.key == 'arsenal'
        }))
        team.push(el.filter(e => {
            return e.team2.key == 'arsenal'
        }))
    })
    const x = team.filter(t => {
        return t.length != 0
    })
    return x
}

function score(m, finalteam) {
    let score = 0
    m.forEach((match) => {
        if (match[0].team1.key == 'arsenal') {
            score += match[0].score1
        }
        if (match[0].team2.key == 'arsenal') {
            score += match[0].score2
        }
        //  console.log(match)
    })
    return score
}

const getgoals =  async () => {
    const y = await getData()
    const x = getmatches(y)
    const z = teams(x)
    const final = score(z)
    return final
}