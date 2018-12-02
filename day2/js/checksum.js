// https://adventofcode.com/2018/day/2
// A:  4980
// B:  qysdtrkloagnfozuwujmhrbvx

const readline = require('readline');
const fs = require('fs');

let teststack = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata')
});

lineReader.on('line', function (line) {
    teststack.push(line);
});

lineReader.on('close', function () {
    console.log('A: ', findOccurances(teststack, 2) * findOccurances(teststack, 3));
    console.log('B: ', findIds(teststack));
});

function findOccurances(list, number) {
    let occurances = 0;
    for (const i of list) {
        var res = i.split('').reduce((acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
        }, {});
        var filteredRes = Object.keys(res).filter((element) => {
            return res[element] === number;
        });
        occurances += filteredRes.length > 0 ? 1 : 0;
    }
    return occurances;
}

function findIds(list) {
    let answer = [];
    for (const i of list) {
        for (const j of list) {
            let maxDiff = 1;
            for (let index = 0; index < i.length; index++) {
                if (i.charAt(index) !== j.charAt(index)) {
                     maxDiff--;
                }
                if (maxDiff === 0 && index === (i.length - 1)) {
                    answer.push(i);
                }
            }
        }
    }
    return answer[0].split('').filter(x => answer[1].split('').includes(x)).join('');
}
