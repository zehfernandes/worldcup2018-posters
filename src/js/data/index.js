import colors from './colors'
import fullColor from './fullColor'

function getpassAccuracy(data, winner) {
    const statistics = data[`${winner}_statistics`]
    return {
        passAccuracy: statistics.pass_accuracy,
        numPasses: statistics.num_passes
    }
}

function getBallPossession(data, winner) {
    const statistics = data[`${winner}_statistics`]

    return statistics.ball_possession
}

function getDistance(data, winner) {
    const statistics = data[`${winner}_statistics`]

    // Mod 150
    return statistics.distance_covered
}

function getFouls(data, winner) {
    let getFrom = winner == 'away_team' ? 'home_team' : 'away_team'
    const statistics = data[`${getFrom}_statistics`]

    return statistics.fouls_committed
}

function getInfos(data, winner) {
    return {
        homeTeamName: data.home_team_country,
        homeTeamGoals: data.home_team.goals,
        homeTeamPenaltis: data.home_team.penalties,
        awayTeamName: data.away_team_country,
        awayTeamGoals: data.away_team.goals,
        awayTeamPenaltis: data.away_team.penalties,
        venue: data.venue,
        stage: data.stage_name,
        temperature: `${data.weather.description} - ${
            data.weather.temp_celsius
        }°C`
    }
}

function getDiscipline(data, winner) {
    return (
        data['home_team_statistics'].yellow_cards +
        data['home_team_statistics'].red_cards +
        data['away_team_statistics'].yellow_cards +
        data['away_team_statistics'].red_cards
    )
}

function getGameIntensity(data, winner) {
    let getFrom = winner == 'away_team' ? 'home_team' : 'away_team'
    let clearances =
        data[`${getFrom}_statistics`].clearances +
        data[`${getFrom}_statistics`].attempts_on_goal

    if (clearances < 10) return 0.2
    if (clearances > 10 && clearances <= 19) return 0.3
    if (clearances >= 20 && clearances <= 29) return 0.4
    if (clearances >= 30 && clearances <= 39) return 0.5
    if (clearances >= 40 && clearances <= 49) return 0.6
    if (clearances >= 50 && clearances <= 59) return 0.7
    if (clearances > 60) return 0.8
}

function getColor(data, winner) {
    if (data.stage_name == 'First Stage') {
        return colors[data[winner].code] ? colors[data[winner].code] : '#000'
    } else {
        return fullColor[data[winner].code]
            ? fullColor[data[winner].code]
            : '#000'
    }
}

function getAttempts(data, winner) {
    let awayGoals = data.away_team_events.filter(obj => {
        return obj.type_of_event === 'goal' || obj.type_of_event === 'goal-own'
    })

    let homeGoals = data.home_team_events.filter(obj => {
        return obj.type_of_event === 'goal' || obj.type_of_event === 'goal-own'
    })

    let goals = awayGoals
        .concat(homeGoals)
        .map(obj => {
            obj.time = _parseTime(obj.time)
            return obj
        })
        .sort((x, y) => x.time - y.time)

    return {
        goals: goals,
        attempts: data[`${winner}_statistics`].attempts_on_goal
    }
}

function filterData(data) {
    console.log(data)

    let getDataFrom = 'home_team'
    if (data.winner_code === data.away_team.code) {
        getDataFrom = 'away_team'
    }

    return {
        passAcurrancy: getpassAccuracy(data, getDataFrom),
        ballPossession: getBallPossession(data, getDataFrom),
        distanceCovered: getDistance(data, getDataFrom),
        infos: getInfos(data, getDataFrom),
        fouls: getFouls(data, getDataFrom),
        color: getColor(data, getDataFrom),
        attempts: getAttempts(data, getDataFrom),
        discipline: getDiscipline(data, getDataFrom),
        intensity: getGameIntensity(data, getDataFrom)
    }
}

function _parseTime(time) {
    time = time.split('\'+')
    let result = parseInt(time[0])
    if (time.length > 1) {
        result = parseInt(time[0]) + parseInt(time[1])
    }

    return result
}

module.exports = {
    filterData,
    getBallPossession,
    getpassAccuracy
}
