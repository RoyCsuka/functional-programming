# ID Tech-track - Functional Programming
## De opdracht
Voor de opdrachtgever van dit project wordt er een digitale visualisatie vanuit de exterene database van het museum. De opdracht gaat over een passende visaulisatie maken die past bij de geschiedenis en de collectie van het tropenmuseum.

## Wat is functional programming? (samenvatting)
Dit is simpel gezegd programmeren met een bepaald patroon. Dit patroon heeft flexibele / herbruikbare functies die naar elkaar luisteren en deze kun je in elke volgorde dan ook runnen zonder dat de code breekt. Zo schrijf je eerst code voor een specifiek stukje (object oriented) en daarna zet je dit om naar functies die herbruikbaar zijn en waar de waardes algemene variabele zijn of paramaters. Voor volledige uitleg en onderbouwing zie [mijn wiki](https://github.com/RoyCsuka/functional-programming/wiki/).

## Leerdoelen
Er wordt geleerd over algemene functies schrijven, het schoonmaken en het transformeren van data, SVG gebruik en we gaan werken in D3. Om het volledige proces van dit project te vinden bekijk mijn [wiki](https://github.com/RoyCsuka/functional-programming/wiki/logboek).

# Concept
Mijn concept focust zich op het aantal items laten zien op basis van herkomst in combinatie met tijd. Als visuele uitwerking heb ik gekozen voor een map (zie afbeelding hieronder). [Het resultaat van mijn concept.](https://roycsuka.github.io/functional-programming/public/)

![Concept uitwerking](https://github.com/RoyCsuka/assets/blob/master/concept-maps.jpg)
Het concept laat het aantal items per land zien op basis van een tijdsperiode.

# Data
## Opschonen met JavaScript
In mijn [Wiki leg ik stap voor stap uit](https://github.com/RoyCsuka/functional-programming/wiki/logboek) hoe ik mijn data heb schoongemaakt. I.v.m. tijdsnood heb ik de "v.chr", "n.chr", "bc" en "ad" data waardes en niet schoon kunnen maken. Daarom heb ik ervoor gekozen om deze if statement nog te defineren voordat ik de data terug geef aan mijn main functie.
```
if (item.date.value.toString().length === 4 && item.date.value <= 2019 && item.date.value >= 0) {
    // console.log(item.date.value)
    return item
}
```
Hierdoor is de data niet 100% compleet maar heb ik wel het functionele gedeelte gedaan.

## SPARQL database
Aantal objecten tellen per land op basis van een tijdsperiode. In mijn [SPARQL query](https://github.com/RoyCsuka/functional-programming/wiki/SPARQL) leg ik hier meer over uit.

# Credits voor:
- Kris heeft mij geholpen met het opzetten van mijn werkomgeving (rollup.js).

## Technische specificaties
- Wiebe heeft mij geholpen met mijn opgeschoonde data om te zetten naar pure code.
- Coen heeft mij geholpen met het opschonen van data.

## Concept brainstroming
- Manouk heeft mij geholpen met mijn concept verder uit te denken.
- Kim Garrard heeft mij feedback gegeven op kleur gebruik.
