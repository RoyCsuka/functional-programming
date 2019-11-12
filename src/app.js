import config from './queryResults.json'

const jsonResults = config.results.bindings

function main() {
    convertYear(jsonResults);
}

function splitStringCalcAverage(data) {
    var splitString = data.split("-")


    if (splitString.length === 2) {
        averageTwoYearsValue(splitString[0], splitString[1])
    } else {
        return splitString[2]
    }
}

function averageTwoYearsValue(firstValue, secondValue) {
    return Math.round((firstValue*1 + secondValue*1) / 2);
}

function cleanYearString(theData) {
    // Alles naar lowercase ivm verschillen in strings "ca" en  "Ca"
    theData.value = theData.value.toLowerCase();


    // voor de zekerheid checken of de waarde een string is (zekeren voor het onzekeren)
    if(theData.value && typeof theData.value === "string") {
        // array van de tekens die ik als eerst wil vervangen
        var replaceSymbolsArr = [ /\(/, /\)/, , /\?/, /\./, /\,/, /\s/, /\'/, /\:/, /\;/]
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
        var cleanDateValue = cleanYearString(el.date)

        if(cleanDateValue.value.includes("-") && cleanDateValue.value.length === 9) {
            cleanDateValue.value = splitStringCalcAverage(cleanDateValue.value)
        }

        if(cleanDateValue.eeuw === true && cleanDateValue.vchr === false) {
            console.log(cleanDateValue)
            console.log(cleanDateValue.value)
            // cleanDateValue.value = splitStringEeuw(cleanDateValue.value)
        }


        // console.log(cleanDateValue.value)
        // console.log(Number(cleanDateValue.value))

    })

    let newArr = item;
    return newArr;
}

main()
