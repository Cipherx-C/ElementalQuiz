import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import "./css/results.css"

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <p>
        <strong>{name}</strong>, seu elemento é: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>
        </div>
      ) : (
        <p>Nenhuma obra de arte encontrada.</p>
      )}
    </div>
  );
}
