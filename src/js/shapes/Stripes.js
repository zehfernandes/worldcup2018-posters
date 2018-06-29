import { returnRGBA } from '../utils'

function Stripes(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.passAccuracy = props.data.passAccuracy
    this.numPasses = props.data.numPasses

    this.color = props.color
    this.barIntensity = this.getBarIntensity()
}

Stripes.prototype.update = function() {
    this.draw()
}

Stripes.prototype.draw = function() {
    const c = this.context

    let bars = 0
    for (let i = 0; i < this.width; i = i + this.barIntensity) {
        c.beginPath()
        c.rect(this.x + i, this.y, 1.5, this.height)
        c.fillStyle =
            this.getNumOfBars() > bars
                ? returnRGBA(this.color.highlight)
                : returnRGBA(this.color.text)
        c.fill()
        c.closePath()

        bars++
    }
}

/* -------------- 
	Helper
----------------- */
Stripes.prototype.getNumOfBars = function() {
    return ((this.width / this.barIntensity) * this.passAccuracy) / 100
}

Stripes.prototype.getBarIntensity = function() {
    if (this.numPasses < 200) {
        return 12
    }

    if (this.numPasses > 300 && this.numPasses < 400) {
        return 10
    }

    if (this.numPasses > 400 && this.numPasses < 500) {
        return 9
    }

    if (this.numPasses > 500) {
        return 8
    }

    return 2
}

export default Stripes
