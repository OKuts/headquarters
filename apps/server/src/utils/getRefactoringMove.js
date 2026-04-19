import {isInnValid} from './isInnValid.js'

export const getRefactoringMove = (result, innArr = false) => {
    const moves = result.map(el => el.value)
    const out = {}
    moves.forEach(file => {
        file.forEach((line, i) => {
            line.forEach((el, j) => {
                if (i && (!innArr || innArr.includes(String(line[1])))) {
                    if (j === 1 && !out[el]) {
                        out[el] = {isValid: isInnValid(String(el))}
                    }
                    if (j > 1 && (el || el === 0)) {
                        out[line[1]][file[0][j]] = out[line[1]][file[0][j]]
                            ? {
                                ...out[line[1]][file[0][j]],
                                [new Date(line[0]).toLocaleDateString().slice(0, 10).split('.').reverse().join('-')]: el
                            }
                            : {[new Date(line[0]).toLocaleDateString().slice(0, 10).split('.').reverse().join('-')]: el}
                    }
                }
            })
        })
    })
    return out
}