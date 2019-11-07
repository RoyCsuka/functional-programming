import config from './queryResults.json'

let jsonResultsDate = config.results.bindings;


// Hoofdfunctie
function main() {
    convertTimeToItem(jsonResultsDate);
}

// geneste functie van function main die data opruimd
function convertTimeToItem(array) {
    array.map(array => {

        // Haalt alle haakjes () eruit
        array.date.value = array.date.value.replace(/[()]/g, '');
        // Haalt alle vraagtekens weg ?
        array.date.value = array.date.value.replace(/[-?]/g, '');
        // Haalt alle spaties eruit
        // array.date.value = array.date.value.replace(/\s/g,'');

        // Als de lengte van de string 19 karakters is en een backslash heeft
        if (array.date.value.length === 19 && array.date.value.includes(" / ")) {
            // Split alle items op een backslash
            let splitTwoNumbers = array.date.value.split("/")

            array.date.value = {
				tussen: splitTwoNumbers[0].replace(/^.{4}/g, ''),
				en: splitTwoNumbers[1].replace(/^.{4}/g, '')
			}

            // verangt de eerste vier karakters van de array met niks
            // let removeFirstFourChracters = array.date.value.replace(/^.{4}/g, '')

            console.log(array.date.value)

        }

        if (array.date.value.includes("ca")) {
            array.date.value = array.date.value.replace(/ca/g, "");
        } else if (array.date.value.includes("ca.")) {
            array.date.value = array.date.value.replace(/ca./g, "");
        } else if (array.date.value.includes("eeuw")) {
            array.date.value = array.date.value.replace(/eeuw/g, "");
        }

        // console.log(array.date.value);
    })

    let newArray = array;
    return newArray;
}

main();
