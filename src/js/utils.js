function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function getMatchCode(path) {
    let match = path.match(
        /\/generativeworldcup2018\/match\/(0?[0-9]|[0-9][0-9])\/(.*)/
    )

    if (match) {
        return match[1]
    } else {
        return 1
    }
}

//Params
function getUrlParams(url) {
    // http://stackoverflow.com/a/23946023/2407309
    if (typeof url == 'undefined') {
        url = window.location.search
    }
    var url = url.split('#')[0] // Discard fragment identifier.
    var urlParams = {}
    var queryString = url.split('?')[1]
    if (!queryString) {
        if (url.search('=') !== false) {
            queryString = url
        }
    }
    if (queryString) {
        var keyValuePairs = queryString.split('&')
        for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValuePair = keyValuePairs[i].split('=')
            var paramName = keyValuePair[0]
            var paramValue = keyValuePair[1] || ''
            urlParams[paramName] = decodeURIComponent(
                paramValue.replace(/\+/g, ' ')
            )
        }
    }
    return urlParams
}

function returnRGBA(color) {
    let [red, green, blue] = color
    return `rgba(${red},${green}, ${blue} ,1)`
}

// Screen Resolution
function calculateWidth(height) {
    const a4Width = 595 * 2
    const a4Height = 842 * 2

    return (a4Width * height) / a4Height
}

module.exports = {
    randomIntFromRange,
    randomColor,
    distance,
    calculateWidth,
    getUrlParams,
    returnRGBA,
    getMatchCode
}
