import { returnRGBA } from '../utils'

function PercentBar(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.ballPossesion = props.data
    this.color = props.color
}

PercentBar.prototype.update = function() {
    this.draw()
}

PercentBar.prototype.draw = function() {
    const c = this.context

    console.log(this.getBarHeight())
    c.beginPath()
    c.rect(this.x, this.y, this.width, this.getBarHeight())
    c.fillStyle = returnRGBA(this.color.highlight)
    c.fill()
    c.closePath()

    c.beginPath()
    c.rect(
        this.x,
        this.y + this.getBarHeight() + this.height / 20,
        this.width,
        this.height - this.height / 20 - this.getBarHeight()
    )
    c.fillStyle = returnRGBA(this.color.text)
    c.fill()
    c.closePath()
}

/* -------------- 
	Helper
----------------- */
PercentBar.prototype.getBarHeight = function() {
    return ((this.height - 20) * this.ballPossesion) / 100
}

export default PercentBar
