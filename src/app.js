import config from './queryResults.json'

let jsonResultsYear = config.results.bindings;


// Hoofdfunctie
function main() {
    cleanDataYear(jsonResultsYear);
}

// geneste functie van function main die data opruimd
function cleanDataYear(array) {
    var newArray = array.map(item => {


        // Alles naar uppercase ivm "ca" en  "Ca"
        item.date.value = item.date.value.toUpperCase();
        // Haalt alle haakjes "()" eruit
        item.date.value = item.date.value.replace(/[()]/g, '');
        // Haalt het ene resultaat weg met de waarde "[*1]"
        item.date.value = item.date.value.replace(/[*1]/g, '');
        // Haalt alle vraagtekens weg "?"
        item.date.value = item.date.value.replace(/[?]/g, '');
        // Haalt alle punten eruit "."
        item.date.value = item.date.value.replace(/\./g,'');

        if (item.date.value.includes("VOOR ")) {
            item.date.value = item.date.value.replace("VOOR ", "");
        }

        if (item.date.value.includes("VOOROFIN")) {
            item.date.value = item.date.value.replace("VOOROFIN", "");
        }

        if (item.date.value.includes("INOF")) {
            item.date.value = item.date.value.replace("INOF", "");
        }

        if (item.date.value.includes("INOFVOOR")) {
            item.date.value = item.date.value.replace("INOFVOOR", "");
        }

        if (item.date.value.includes("OFEERDER")) {
            item.date.value = item.date.value.replace("OFEERDER", "");
        }

        if (item.date.value.includes("VOOR")) {
            item.date.value = item.date.value.replace("VOOR", "");
        }

        if (item.date.value.includes("CA")) {
            item.date.value = item.date.value.replace("CA", "");
        }
        // Haalt alle spaties eruit
        item.date.value = item.date.value.replace(/\s/g,'');

        console.log(item.date.value);
    })

    let oldArray = newArray;
    return newArray;
}

main();

console.log(newArray)
