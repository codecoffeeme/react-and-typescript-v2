import { useEffect, useState } from 'react';
import { fetchAllCharacters } from '../lib/characters';
import { CharacterCard } from './CharacterCard';
import { CharacterSelect } from './CharacterSelect';
import { Loading } from './Loading';
import { useCharacter } from './useCharacter';

const allCharacters = fetchAllCharacters();

const Application = () => {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selection, setSelection] = useState(0);
  const [character, loadingCharacter] = useCharacter(selection);

  useEffect(() => {
    allCharacters.then(setCharacters);
  }, []);

  return (
    <main className="flex flex-col items-center h-full gap-6 p-24 bg-primary-200">
      <section>
        <CharacterSelect
          characters={characters}
          onChange={(event) => {
            setSelection(+event.target.value);
          }}
        />
      </section>
      <section className="flex flex-col items-center gap-4">
        {character && <CharacterCard character={character} />}
        {loadingCharacter && <Loading />}
      </section>
    </main>
  );
};

export default Application;
