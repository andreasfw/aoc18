
const readline = require('readline');
const fs = require('fs');

let teststack = [];
let dummy = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
    // '#1 @ 483,830: 24x18',
    // '#2 @ 370,498: 21x17',
    // '#3 @ 403,823: 25x21',
    // '#4 @ 619,976: 20x15',
    // '#5 @ 123,385: 15x26',
    // '#6 @ 484,592: 11x19',
    // '#7 @ 394,960: 28x14',
    // '#8 @ 730,592: 26x20',
    // '#9 @ 975,963: 16x26',
    // '#10 @ 452,496: 18x18',
    // '#11 @ 62,484: 28x29',
    // '#12 @ 959,724: 23x20',
    // '#13 @ 726,915: 27x14',
    // '#14 @ 206,626: 20x28',
    // '#15 @ 551,586: 25x13',
    // '#16 @ 292,9: 10x21',
    // '#17 @ 443,625: 28x15',
    // '#18 @ 441,843: 22x27',
    // '#19 @ 620,698: 20x23',
]
let fabric = createFabric(1000);
let blackList = {};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata')
});

lineReader.on('line', function (line) {
    teststack.push(parseInputLine(line));
});

lineReader.on('close', function () {
    placePices(teststack)
    console.log('A: ', countOverlap(fabric));
    //console.log('B: ', findIds(teststack));
    console.log('blacklist', Object.keys(blackList).length);
    // console.log('blacklist', blackList);
    // console.log('fabric \n ', fabric);
});


function createFabric(size) {
    let canvas = [];
    for (let i = 0; i < size; i++) {
        canvas.push(new Array(size).fill('.'));
    }
    return canvas;
}
// for (const line of dummy) {
//     teststack.push(parseInputLine(line));
// }

function placePices(teststack) {
    for (const pice of teststack) {
        placePice(fabric, pice);
    }
}


function placePice(canvas, pice) {
    overlap =  false
    for (let x = pice.marginLeft; x < (pice.marginLeft + pice.width); x++) {
        for (let y = pice.marginTop; y < (pice.marginTop + pice.height); y++) {
            if (canvas[x][y] !== '.') {
                blackList[canvas[x][y]] = true;
                overlap = true;
                canvas[x][y] = 'x';
            } else {
                canvas[x][y] = pice.id;
            }
        }
    }
    if (overlap) {
        blackList[pice.id] = overlap;
    }
}

function countOverlap(fabric) {
    let count = 0;
    for (const line of fabric) {
        for (const cell of line) {
            if (cell === 'x') {
                count++;
            }
        }
    }
    return count;
}

function parseInputLine(line) {
    const lineMatcher = /^(#\d{1,4}).\@\s(\d{0,4}),(\d{0,4}):\s(\d{0,2})x(\d{0,2})/
    const match = line.match(lineMatcher);
    return {
        id: match[1],
        marginLeft: parseInt(match[2]),
        marginTop: parseInt(match[3]),
        width: parseInt(match[4]),
        height: parseInt(match[5])
    }
}
