import { useState } from "react";
import { Link } from "react-router-dom";

import { useAddSuperHeroData, useSuperHeroesData } from "../../hooks";
import { withLayout } from "../Layout/Layout";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState<string>("");
  const [alterEgo, setAlterEgo] = useState<string>("");

  const onSuccess = () => {
    console.log("Perform side effect after data fetching");
  };

  const onError = () => {
    console.log("Perform side effect after encountering error");
  };

  // TODO: add types
  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(
    onSuccess,
    onError
  );

  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    //@ts-ignore
    return <h2>{error && error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          name='alterEgo'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add hero</button>
      </div>
      {/* // @ts-ignore */}
      <button onClick={refetch}>Fetch heroes</button>
      {/* {data?.data.map((hero) => {
                return <div key={hero.id}>{hero.name}</div>;
            })} */}
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-hero/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};

export default withLayout(RQSuperHeroesPage);
