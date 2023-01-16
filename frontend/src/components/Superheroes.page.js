import React from "react";
import { useParams } from "react-router-dom";
import { DetailSuperHeroes } from "../api/superheroes";
import { useQuery } from "@tanstack/react-query";
export const SuperHeroesPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["super-heroes", id],
    queryFn: () => DetailSuperHeroes(id),
  });
  if (isLoading) return <h2>Loading...</h2>;
  else if (isError) return <h2>Failed to fetch</h2>;
  return <div>{data.data.superheroes.id}-{data.data.superheroes.name}-{data.data.superheroes.alterEgo}</div>;
};
