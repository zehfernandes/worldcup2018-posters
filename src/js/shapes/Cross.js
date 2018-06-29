import { returnRGBA } from '../utils'

function Cross(props) {
    this.context = props.context
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y
    this.fontSize = props.size

    this.color = returnRGBA(props.color.text)
    this.data = props.data // Calculate percent
}

Cross.prototype.update = function() {
    this.draw()
}

Cross.prototype.draw = function() {
    const c = this.context

    const fouls = this.data
    let arrText = []
    let text = ''
    for (let i = 1; i <= fouls; i++) {
        text = text + '+'
        if (i % 8 == 0) {
            arrText.push(text)
            text = ''
        }
    }

    arrText.push(text)
    console.log(arrText)
    let baseLine = this.fontSize - this.fontSize / 10
    let newY = this.y - baseLine
    for (let i = 0; i <= arrText.length - 1; i++) {
        c.font = `bold ${this.fontSize}px Helvetica Neue`
        c.fillStyle = this.color
        c.textBaseline = 'middle'
        this.fillTextWithSpacing(c, arrText[i], this.x, newY, 6)

        newY = i > 0 ? newY + baseLine * i : newY + baseLine
    }
}

/* -------------- 
	Helper
----------------- */
Cross.prototype.fillTextWithSpacing = function(context, text, x, y, spacing) {
    //Start at position (X, Y).
    //Measure wAll, the width of the entire string using measureText()
    let wAll = context.measureText(text).width

    do {
        //Remove the first character from the string
        let char = text.substr(0, 1)
        text = text.substr(1)

        //Print the first character at position (X, Y) using fillText()
        context.fillText(char, x, y)

        //Measure wShorter, the width of the resulting shorter string using measureText().
        let wShorter = 0
        if (text == '') wShorter = 0
        else wShorter = context.measureText(text).width

        //Subtract the width of the shorter string from the width of the entire string, giving the kerned width of the character, wChar = wAll - wShorter
        let wChar = wAll - wShorter

        //Increment X by wChar + spacing
        x += wChar + spacing

        //wAll = wShorter
        wAll = wShorter

        //Repeat from step 3
    } while (text != '')
}

export default Cross
