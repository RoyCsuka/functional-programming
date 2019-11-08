import config from './queryResults.json'

let jsonResults = config.results.bindings;



const cleanDataYear = jsonResults.map(item => {
    // Alles naar uppercase ivm "ca" en  "Ca"
    item.date.value = item.date.value.toLowerCase();

    // Haalt alle haakjes "()" eruit
    item.date.value = item.date.value.replace(/[()]/g, '');
     // Haalt het ene resultaat weg met de waarde "[*1]"
    item.date.value = item.date.value.replace(/[*1]/g, '');
     // Haalt alle vraagtekens weg "?"
    item.date.value = item.date.value.replace(/[?]/g, '');
     // Haalt alle punten eruit "."
    item.date.value = item.date.value.replace(/\./g,'');

    if (item.date.value.includes("voor ")) {
        item.date.value = item.date.value.replace("voor ", "");
    }

    if (item.date.value.includes("inof")) {
        item.date.value = item.date.value.replace("inof", "");
    }

    if (item.date.value.includes("inofvoor")) {
        item.date.value = item.date.value.replace("inofvoor", "");
    }

    if (item.date.value.includes("voorofin")) {
        item.date.value = item.date.value.replace("voorofin", "");
    }

    if (item.date.value.includes("ofeerder")) {
        item.date.value = item.date.value.replace("ofeerder", "");
    }

    if (item.date.value.includes("voor")) {
        item.date.value = item.date.value.replace("voor", "");
    }

    if (item.date.value.includes("ca")) {
        item.date.value = item.date.value.replace("ca", "");
    }

    if (item.date.value.includes("eeuw")) {
        item.date.value = item.date.value.replace("eeuw", "");
    }

    // Haalt alle spaties eruit
    item.date.value = item.date.value.replace(/\s/g,'');

    console.log(item.date.value)

    return item
})
