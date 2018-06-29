import { returnRGBA } from '../utils'

function Text(props) {
    this.context = props.context
    this.gridWidth = props.gridWidth
    this.gridHeight = props.gridHeight
    this.margin = props.margin

    this.data = props.data
    this.color = returnRGBA(props.color.text)
}

Text.prototype.update = function() {
    this.draw()
}

Text.prototype.draw = function() {
    const c = this.context
    const gridHeight = this.gridHeight
    const gridWidth = this.gridWidth
    const innerMargin = this.margin

    //Title
    let titleSize = gridHeight / 2 - gridHeight / 10
    c.font = `${titleSize}px 'Timmons NY'`
    c.fillStyle = this.color
    c.textBaseline = 'middle'
    c.textAlign = 'left'
    c.fillText(this.data.homeTeamName, innerMargin, innerMargin + titleSize / 4)
    c.fillText(
        this.data.awayTeamName,
        innerMargin,
        innerMargin + gridHeight / 2 - gridHeight / 6.5 + titleSize / 5
    )

    // Result
    let scoreSize = gridHeight / 6
    c.font = `700 ${scoreSize}px Dharma Gothic E`
    c.fillStyle = this.color
    c.fillText(
        this.data.homeTeamGoals,
        innerMargin,
        innerMargin + gridHeight / 2 - gridHeight / 6.5 + titleSize
    )
    c.fillText(
        this.data.awayTeamGoals,
        innerMargin + gridWidth / 3,
        innerMargin + gridHeight / 2 - gridHeight / 6.5 + titleSize
    )

    c.beginPath()
    c.rect(
        innerMargin + scoreSize / 1.5,
        innerMargin +
            gridHeight / 2 -
            gridHeight / 6.5 +
            titleSize -
            scoreSize / 10,
        gridWidth / 3 - scoreSize,
        2
    )
    c.fillStyle = this.color
    c.fill()
    c.closePath()

    // Fix informations
    let goalSize = gridHeight / 13
    c.font = `400 ${goalSize}px Helvetica Neue`
    c.fillStyle = this.color
    c.textBaseline = 'middle'
    c.textAlign = 'right'
    //One
    c.fillText('World Cup 2018', innerMargin + gridWidth * 3, innerMargin)
    c.fillText(
        this.data.stage,
        innerMargin + gridWidth * 3,
        innerMargin + goalSize * 2
    )

    // Fix informations
    c.fillText(this.data.venue, innerMargin + gridWidth * 2.1, innerMargin)
    c.fillText(
        this.data.temperature,
        innerMargin + gridWidth * 2.1,
        innerMargin + goalSize * 2
    )
}

export default Text
