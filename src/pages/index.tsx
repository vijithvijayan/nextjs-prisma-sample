import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [randomIds, updateIds] = useState(() => getOptionsForVote());
  const { firstId, secondId } = randomIds;
  const firstPokemon = trpc["get-pokemon-by-id"].useQuery({ id: firstId });
  const secondPokemon = trpc["get-pokemon-by-id"].useQuery({ id: secondId });

  const voteMutation = trpc["caste-vote"].useMutation();

  const voteForRoundest = (selected: number) => {
    if (selected === firstId) {
      voteMutation.mutate({ votedFor: firstId, votedAgainst: secondId });
    } else {
      voteMutation.mutate({ votedFor: secondId, votedAgainst: firstId });
    }

    updateIds(getOptionsForVote());
  };

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which pokemon is rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="flex-col items-center">
          <Image
            src={firstPokemon.data?.sprites.front_default as string}
            alt="pokemon image"
            width={256}
            height={256}
            layout="fixed"
          />
          <div className="text-xl text-center capitalize">
            {firstPokemon.data?.name}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            onClick={() => voteForRoundest(firstId)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">Vs</div>
        <div className="flex-col  items-center">
          <Image
            src={secondPokemon.data?.sprites.front_default as string}
            alt="pokemon image"
            width={256}
            height={256}
            layout="fixed"
          />
          <div className="text-xl text-center capitalize">
            {secondPokemon.data?.name}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => voteForRoundest(secondId)}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
}
