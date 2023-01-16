import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addSuperHeroes } from "../api/superheroes";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
export default function RegisterPage() {
  const nameRef = useRef(null);
  const alterRef = useRef(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addSuperHeroes,
    onSuccess: (newSuperHeroes) => {
      queryClient.setQueryData(
        ["register", newSuperHeroes.data.superheroes.id],
        newSuperHeroes.data.superheroes
      );
      Navigate("/rq-super-heroes");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: nameRef.current.value,
      alterEgo: alterRef.current.value,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input type="text" ref={nameRef} id="name" />
        <label htmlFor="alter">AlterEgo :</label>
        <input type="text" ref={alterRef} id="alter" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
