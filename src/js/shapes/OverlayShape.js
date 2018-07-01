import { returnRGBA } from '../utils'

function OverlayShape(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.color = returnRGBA(props.color.bg)
    this.radius = props.radius
    this.data = props.data
}

OverlayShape.prototype.update = function() {
    this.draw()
}

OverlayShape.prototype.draw = function() {
    const c = this.context

    let margin = 8

    let goals = [this.data.homeTeamGoals, this.data.awayTeamGoals]
    let penaltis = [this.data.homeTeamPenaltis, this.data.awayTeamPenaltis]

    //Home team
    let newX = this.x
    for (let i = 1; i <= goals[0]; i++) {
        c.beginPath()
        c.arc(newX, this.y, this.radius, 0, 2 * Math.PI)
        c.fillStyle = this.color
        c.fill()
        c.closePath()

        newX = newX + this.radius * 2 + 10
    }

    //Penaltis Home Team
    let newY = this.y
    let countBall = 1
    if (penaltis[0] > 0) {
        for (let i = 1; i <= penaltis[0]; i++) {
            c.beginPath()
            c.arc(
                newX - this.radius / 2,
                newY - this.radius / 2,
                this.radius / 2,
                0,
                2 * Math.PI
            )
            c.fillStyle = this.color
            c.fill()
            c.closePath()

            if (countBall == 2) {
                newX = newX - this.radius
                newY = newY + this.radius
            } else {
                newX = newX + this.radius
            }

            if (countBall == 4) {
                newX = newX + 10
                newY = newY - this.radius
                countBall = 0
            }

            countBall++
        }
    }

    //Away Team
    newX = this.x
    for (let i = 1; i <= goals[1]; i++) {
        c.beginPath()
        c.arc(
            newX,
            this.y + this.radius * 2 + margin,
            this.radius,
            0,
            2 * Math.PI
        )
        c.fillStyle = this.color
        c.fill()
        c.closePath()

        newX = newX + this.radius * 2 + margin
    }

    //Penaltis Away Team
    newY = this.y + this.radius * 2 + margin
    countBall = 1
    if (penaltis[1] > 0) {
        for (let i = 1; i <= penaltis[1]; i++) {
            c.beginPath()
            c.arc(
                newX - this.radius / 2,
                newY - this.radius / 2,
                this.radius / 2,
                0,
                2 * Math.PI
            )
            c.fillStyle = this.color
            c.fill()
            c.closePath()

            if (countBall == 2) {
                newX = newX - this.radius
                newY = newY + this.radius
            } else {
                newX = newX + this.radius
            }

            if (countBall == 4) {
                newX = newX + 10
                newY = newY - this.radius
                countBall = 0
            }

            countBall++
        }
    }
}

export default OverlayShape
