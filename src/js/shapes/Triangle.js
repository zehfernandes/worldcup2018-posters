import { returnRGBA } from '../utils'

function Triangle(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.data = props.data // Calculate percent
    this.color = returnRGBA(props.color.highlight)
    this.size = props.size
}

Triangle.prototype.update = function() {
    this.draw()
}

Triangle.prototype.draw = function() {
    const c = this.context

    c.beginPath()
    c.moveTo(this.x, this.y + this.data * 15 * this.size)
    c.lineTo(this.x, this.y + this.height)
    c.lineTo(this.x + this.width, this.y + this.height)
    c.closePath()
    c.fillStyle = this.color
    c.fill()
}

/* -------------- 
	Helper
----------------- */
Triangle.prototype.getNumOfBars = function() {
    return ((this.width / this.barIntensity) * this.passAccuracy) / 100
}

export default Triangle
