function Noise(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y

    this.intensity = props.data
    this.noiseGranulaty = 100 * props.size
}

Noise.prototype.update = function() {
    this.draw()
}

Noise.prototype.draw = function() {
    const c = this.context
    for (let x = this.x; x < this.x + this.width; x = x + 1) {
        for (let y = this.y; y < this.y + this.height; y = y + 1) {
            let number = Math.floor(Math.random() * this.noiseGranulaty)
            c.fillStyle =
                'rgba(' +
                number +
                ',' +
                number +
                ',' +
                number +
                ',' +
                this.intensity +
                ')'
            c.fillRect(x, y, 1, 1)
        }
    }
}

export default Noise
