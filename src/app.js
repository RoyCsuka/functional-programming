import config from './queryResults.json'

const jsonResults = config.results.bindings

function main() {
    return convertYear(jsonResults);
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
        // stackoverflow: https://stackoverflow.com/questions/35486533/how-can-i-replace-first-two-characters-of-a-string-in-javascript
        // Hier heb ik alleen een geneste array omdat ik de lengte van het eerste object wil weten
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

        // Props: Wiebe
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

        // Props: Wiebe
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

// functie die loopt over de items
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

    })

    let newArr = item;
    let finalArray = deleteUnformattedData(newArr)
    // console.log(finalArray)
    return newArr;
}

// Props: Coen
function deleteUnformattedData(array) {
    const finalArray = array.filter(item => {
        if (item.date.value.toString().length === 4) {
            console.log(item.date.value.toString())
            console.log(item.date.value.toString().slice((0, -2))) // > dit is het antwoord string[1] + string[0] + string.slice(2)
            return item
        }
    })
 return finalArray
}

// einde opschonen van data




// begin D3 data transfomeren

const query = `PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# let op: geeft aantal van unieke combinaties van ?date en ?landLabel
SELECT ?landLabel ?lat ?long ?date (COUNT(?cho) AS ?choCount) WHERE {
   ?cho dct:created ?date;
        dct:spatial ?plaats .
 # We willen geen datums die de string [NI] bevatten
   FILTER (!REGEX(?date, "[NI]")) . #zorgt ervoor dat de string "NI" niet wordt meegenomen
 # geef het label van het land waar de plaats ligt en de lat/long van het land
   ?plaats skos:exactMatch/gn:parentCountry ?land .
   ?land wgs84:lat ?lat .
   ?land wgs84:long ?long .
   ?land gn:name ?landLabel .
} GROUP BY ?date ?landLabel ?lat ?long
ORDER BY DESC(?choCount)`

//Please use your own endpoint when using this
const endpoint = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-14/sparql"

makeVisualization()

// Our main function which runs other function to make a visualization
async function makeVisualization(){
    //Wait for the promise to resolve with the data
    let data = await loadData(endpoint, query)
    console.log("rawData: ", data)

    // deze roept de main functie die de jaartallen schoon maakt
    data = main(data)
    console.log("cleanedData of dataset: ", data)

    data = data.map(cleanData)
    console.log("cleanedData: ", data)

	data = transformData(data)
    console.log("transformedData: ", data)

    console.log(data)
}

//Load the data and return a promise which resolves with said data
function loadData(url, query){
  return d3.json(endpoint +"?query="+ encodeURIComponent(query) + "&format=json")
    .then(data => data.results.bindings)
}

//Nest the data per eeuw HIER WAS IK GEBLEVEN. LAASTSTE EDIT TRANSFORM DATA
// function transformData(source){
//   let transformed =  d3.nest()
// 		.key(function(d) { return d.landLabel; })
//         .rollup(function(v) { return {
//           count: v.length,
//           total: d3.sum(v, function(d) { return d.amount; }),
//           avg: d3.mean(v, function(d) { return d.amount; })
//         }; })
// 		.entries(source);
//     transformed.forEach(country => {
//       country.amount = country.values.length
//     })
//   return transformed
// }

//Nest the data per country
function transformData(source){
  let transformed =  d3.nest()
		.key(function(d) { return d.landLabel; })
		.entries(source);
    transformed.forEach(country => {
      country.amount = country.values.length
    })
  return transformed
}

//This function gets the nested value out of the object in each property
// in our data
function cleanData(row){
   let result = {}
    Object.entries(row)
    	.forEach(([key, propValue]) => {
				result[key] = propValue.value
  	})
   return result
}




// D3 code
// import { select, json, geoPath, geoNaturalEarth1 } from 'd3';
// import { feature } from 'topojson';
//
// const query = `PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
// PREFIX geo: <http://www.opengis.net/ont/geosparql#>
// PREFIX gn: <http://www.geonames.org/ontology#>
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
// PREFIX dc: <http://purl.org/dc/elements/1.1/>
// PREFIX dct: <http://purl.org/dc/terms/>
// PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
// PREFIX edm: <http://www.europeana.eu/schemas/edm/>
// PREFIX foaf: <http://xmlns.com/foaf/0.1/>
//
// # let op: geeft aantal van unieke combinaties van ?date en ?landLabel
// SELECT ?landLabel ?lat ?long ?date (COUNT(?cho) AS ?choCount) WHERE {
//    ?cho dct:created ?date;
//         dct:spatial ?plaats .
//  # We willen geen datums die de string [NI] bevatten
//    FILTER (!REGEX(?date, "[NI]")) . #zorgt ervoor dat de string "NI" niet wordt meegenomen
//  # geef het label van het land waar de plaats ligt en de lat/long van het land
//    ?plaats skos:exactMatch/gn:parentCountry ?land .
//    ?land wgs84:lat ?lat .
//    ?land wgs84:long ?long .
//    ?land gn:name ?landLabel .
// } GROUP BY ?date ?landLabel ?lat ?long
// ORDER BY DESC(?choCount)`
//
// //Please use your own endpoint when using this
// const endpoint = "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-14/sparql"
//
// const svg = select('svg')
// const circleDelay = 10
// const circleSize = 8
// const projection = geoNaturalEarth1()
// const pathGenerator = geoPath().projection(projection)
// // const cleanedDataset = main()
//
// setupMap()
// drawMap()
// plotLocations()
//
// function setupMap(){
//   svg
//     .append('path')
//     .attr('class', 'sphere')
//     .attr('d', pathGenerator({ type: 'Sphere' }))
// }
//
// function drawMap() {
//   d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json').then(data => {
//     const countries = feature(data, data.objects.countries);
//     svg
//       .selectAll('path')
//       .data(countries.features)
//       .enter()
//       .append('path')
//       .attr('class', 'country')
//       .attr('d', pathGenerator)
//   })
// }
//
//
// function plotLocations() {
//   fetch(endpoint +"?query="+ encodeURIComponent(query) + "&format=json")
//     .then(data => data.json())
//     // Got this fetch code from Coen
//     .then(json => {
//       let fetchedData = json.results.bindings
//       return fetchedData
//     })
//     .then(fetchedData => {
//         let newData = cleanYearString(fetchedData)
//         console.log('data: ', newData)
//     })
//     .then(results => {
//     //TODO: clean up results in separate function
//     	results.forEach(result => {
//         result.lat = Number(result.lat.value)
//         result.long = Number(result.long.value)
//         result.date = Number(result.date.value)
//       })
//     console.log(results)
//
//     svg
//         .selectAll('circle')
//         .data(results)
//         .enter()
//         .append('circle')
//         .attr('class', 'circles')
//         .attr('cx', function(d) {
//           return projection([d.long, d.lat])[0]
//         })
//         .attr('cy', function(d) {
//           return projection([d.long, d.lat])[1]
//         })
//         .attr('r', '0px')
//     		//Opacity is quite heavy on the rendering process so I've turned it off
//     		//.attr('opacity', .5)
//         .transition()
//     				.delay(function(d, i) { return i * circleDelay; })
//             .duration(1500)
//             .ease(d3.easeBounce)
//             .attr('r', circleSize+'px')
//   })
// }
