import "../style/Cards.scss";

interface storedPokemon {
  id: number;
  name: string;
  image: string;
  memorized: boolean;
}

interface CardsProps {
  storedPokemon: storedPokemon[];
  handleCardClick: (arg0: number) => void;
}

export const Cards = ({
  storedPokemon,
  handleCardClick,
}: CardsProps) => {
  return (
    <div className="cards">
      {storedPokemon.map((pokemon: storedPokemon, index: number) => (
        <div
          className={`pokemon ${pokemon.memorized && "memorized"}`}
          key={pokemon.id}
          onClick={() => {
            handleCardClick(index);
          }}
        >
          <div
            className="image"
            style={{ backgroundImage: `url(${pokemon.image})` }}
          ></div>
          <div className="name">{pokemon.name}</div>
        </div>
      ))}
    </div>
  );
};
