
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.weight = pokeDetail.weight
    
    // console.log(pokeDetail.stats[0].base_stat)

    // pokeDetail.stats.map( function (x) {
    //     pokemon.statname = x.stat.name
    //     pokemon.statvalue = x.base_stat
               
    //     return console.log(pokemon.statname + " : " + pokemon.statvalue)

    // })

    const stats = pokeDetail.stats.map( 
        function getDetails (x) {
            statname = x.stat.name
            statvalue = x.base_stat
               
            return statname + " : " + statvalue
        }
    )
    const [stat] = stats
    
    pokemon.stats = stats
    pokemon.stat = stat

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    // const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    // const [stat] = stats
    // pokemon.stats = stats
    // pokemon.stat = stat
    
    // function baseStat (pokeDetail) {
    //     return pokeDetail.stats.base_stat
    // }

    

    // const base_stats = pokeDetail.stats.map(baseStat)
    // const [base_stat] = base_stats

    
    // pokemon.base_stats = base_stats
    // pokemon.base_stat = base_stat

// const basestats = pokeDetail.stats.base_stat
    // const [basestat] = basestats

    // pokemon.base_stats = basestats
    // pokemon.base_stat = basestat

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
