import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSuperHeroes } from "../api/superheroes";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });
  if (isLoading) return <h2>Loading...</h2>;
  else if (isError) return <h2>Fail to fetch</h2>;
  else
    return (
      <>
        <h2>Super Heroes</h2>
        {data?.data.superheroes.map((hero, index) => {
          return (
            <Link to={`/detailsuperheroes/${hero.id}`} key={index}>
              {hero.name} - {hero.alterEgo} - {hero.id}
              <br />{" "}
            </Link>
          );
        })}
      </>
    );
};
