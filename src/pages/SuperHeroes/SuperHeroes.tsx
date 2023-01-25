import { useState, useEffect } from 'react'
import axios from 'axios'

import { withLayout } from '../Layout/Layout'
import { Hero } from '../../Types'

const SuperHeroesPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<Hero[]>([]);

    useEffect(() => {
        axios.get<Hero[]>('http://localhost:4000/superheroes').then((res) => {
        setData(res.data);
        setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <h2>Super Heroes Page</h2>
            {data.map((hero) => {
                return <div key={hero.id}>{hero.name}</div>;
            })}
        </>
    );
};

export default withLayout(SuperHeroesPage);
