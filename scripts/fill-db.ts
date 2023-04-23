import { PokemonClient } from "pokenode-ts";

import { prisma } from "../src/server/utils/prisma";

const doBackFill = async () => {
  const pokeApi = new PokemonClient();

  const allPokemon = await pokeApi.listPokemons(0, 493);
  const formattedPokemon = allPokemon.results.map((p, idx) => ({
    id: idx + 1,
    name: p.name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      idx + 1
    }.png`,
  }));

  const creation = await prisma.pokemon.createMany({
    data: formattedPokemon,
  });
  console.log(creation);
};

doBackFill();
