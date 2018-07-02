import { returnRGBA } from '../utils'

function SmoothCurve(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.data = props.data
    this.color = returnRGBA(props.color.bg)
}

SmoothCurve.prototype.update = function() {
    this.draw()
}

SmoothCurve.prototype.draw = function() {
    const c = this.context

    let baseX = this.x
    let baseY = this.y + this.height

    c.beginPath()
    c.moveTo(baseX, baseY + 1)
    let points = this.createCurve(this.data, baseX, baseY)
    console.log(points)
    // TODO: Generate intensity
    /*let points = [
        { x: baseX + 40, y: baseY - 180 },
        { x: baseX + 100, y: baseY },
        { x: baseX + 200, y: baseY - 180 },
        { x: baseX + this.width, y: baseY - 100 },
        { x: baseX + this.width + 30, y: baseY + 1 }
    ]*/

    for (var j = 0; j < points.length - 2; j++) {
        var xc = (points[j].x + points[j + 1].x) / 2
        var yc = (points[j].y + points[j + 1].y) / 2
        c.quadraticCurveTo(points[j].x, points[j].y, xc, yc)
    }

    c.quadraticCurveTo(
        points[j].x,
        points[j].y,
        points[j + 1].x,
        points[j + 1].y
    )

    c.closePath()
    c.fillStyle = this.color
    c.fill()
}

/* -------------- 
	Helper
----------------- */
SmoothCurve.prototype.createCurve = function(data, baseX, baseY) {
    const points = []

    //Todo: Tempo da prorogação
    //Todo: Pluss acressimos

    if (this.data.goals.length <= 0) {
        return [
            {
                x: baseX + this.width / 2,
                y: baseY - (this.height / 25) * this.data.attempts
            },
            { x: baseX + this.width + 30, y: baseY + 1 }
        ]
    }

    this.data.goals.forEach((el, index) => {
        let attempts = this.data.attempts > 17 ? 17 : this.data.attempts
        points.push({
            x: baseX + (this.width * el.time) / 90,
            y: baseY - (this.height / 20) * attempts
        })

        if (this.data.goals[index + 1] != undefined) {
            if (el.time + 5 > this.data.goals[index + 1].time) {
                return
            }
        }

        points.push({
            x: baseX + this.width / 10 + (this.width * el.time) / 90,
            y: baseY - this.data.attempts * 2
        })
    })

    points.push({
        x: baseX + this.width + 30,
        y: baseY + 1
    })

    return points
}

export default SmoothCurve
