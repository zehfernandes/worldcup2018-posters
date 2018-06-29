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

    //Away Team
    let goals = [this.data.homeTeamGoals, this.data.awayTeamGoals]

    let newX = this.x
    for (let i = 1; i <= goals[0]; i++) {
        console.log(i)
        c.beginPath()
        c.arc(newX, this.y, this.radius, 0, 2 * Math.PI)
        c.fillStyle = this.color
        c.fill()
        c.closePath()

        newX = newX + this.radius * 2 + 10
    }

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

    //Home team
}

/* -------------- 
	Helper
----------------- */
OverlayShape.prototype.getNumOfBars = function() {
    return ((this.width / this.barIntensity) * this.passAccuracy) / 100
}

export default OverlayShape
