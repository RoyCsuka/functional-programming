import config from './queryResults.json'

const jsonResults = config.results.bindings

function main() {
    convertYear(jsonResults);
}

// Props: Wiebe
function splitStringCalcAverage(data) {
    var splitString = data.split("-")

    if (splitString.length === 2) {
        // bereken het gemiddelde met een andere functie van de waarde 1997-1998
        return averageTwoYearsValue(splitString[0], splitString[1])
    } else {
        // return van 01-01-1998 alleen de waarde 1998
        return splitString[2]
    }
}

// Props: Wiebe
function averageTwoYearsValue(firstValue, secondValue) {
    return Math.round((firstValue*1 + secondValue*1) / 2);
}

// Functie die de eeuwen split
function splitStringEeuw(data) {
    var splitEeuw = data.toString().split("-")

    if(splitEeuw[0].length === 2) {
        return splitEeuw[0]
    } else if(splitEeuw[0].length === 3) {
        return splitEeuw[0][1] + splitEeuw[0][2] + "00"
    } else if(splitEeuw.length === 1) {
        return splitEeuw
    } else {
        if(splitEeuw[1].length <= 2) {
            return splitEeuw[1] + "00"
        } else {
            return splitEeuw[1]
        }
    }
}

// functie die alle tekens enzovoort schoonmaakt
function cleanYearString(theData) {
    // Alles naar lowercase ivm verschillen in strings "ca" en  "Ca"
    theData.value = theData.value.toLowerCase();


    // voor de zekerheid checken of de waarde een string is (zekeren voor het onzekeren)
    if(theData.value && typeof theData.value === "string") {
        // array van de tekens die ik als eerst wil vervangen
        var replaceSymbolsArr = [/\(/, /\)/, , /\?/, /\./, /\,/, /\s/, /\'/, /\:/, /\;/]
        // regix tekens vervangen met niks met for loop
        replaceSymbolsArr.forEach(value =>
            theData.value = theData.value
            .replace(
                new RegExp(value, "g"), ""
            )
        )

        theData.value = theData.value.replace("eeeuw", "eeuw")


        if(theData.value.includes("bc")) {
            theData.bc = true
            theData.value = theData.value.replace("bc", "");
            if (theData.value.includes("ad")) {
                theData.adValue = true
                theData.value = theData.value.replace("ad", "");
            } else {
                theData.adValue = false
            }
        } else {
            theData.bc = false
        }

        if(theData.value.includes("vchr")) {
            theData.vchr = true
            theData.vchr = theData.value.replace("vchr", "")
        } else {
            theData.vchr = false
        }

        if(theData.value.includes("eeuw")) {
            theData.eeuw = true
            theData.value = theData.value.replace("eeuw", "")
        } else {
            theData.eeuw = false
        }

        var replaceCharacterssArr = ["a","b","c","d","e","f","g","h","i","j","k","l","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        replaceCharacterssArr.forEach(el =>
            theData.value = theData.value
            .replace(
                new RegExp(el, "g"), ""
            )
        )

        if (theData.value.includes("/")) {
            theData.value = theData.value.replace('/', "-");
        }
    }

    return theData
}

function convertYear(item) {
    item.map(el => {
        var cleanDate = cleanYearString(el.date)

        if(cleanDate.value.includes("-") && cleanDate.value.length >= 9) {
            cleanDate.value = splitStringCalcAverage(cleanDate.value)
        }

        if(cleanDate.eeuw === true && cleanDate.vchr === false) {
            if(cleanDate.value.length === 1) {
                cleanDate.value.replace("-", "")
                cleanDate.value + "00";
            } else if(cleanDate.value.length >= 5 && !cleanDate.value.includes("-")) {
                cleanDate.value.slice(-4)
            } else {
                cleanDate.value = splitStringEeuw(cleanDate.value)
            }
        }

        cleanDate.value = parseInt(cleanDate.value)

        // if (cleanDate.value.toString().includes("-") ===  true) {
        //         var splitLastData = cleanDate.value.split("-")
        // }

        // console.log(Number(cleanDate.value))


    })

    let newArr = item;

    let finalArray = deleteUnformattedData(newArr)
    console.log(finalArray)
    return newArr;
}

function deleteUnformattedData (array) {
    const finalArray = array.filter(item => {
        if (item.date.value.toString().length === 4) {
            return item
        }
    })
 return finalArray
}

main()
