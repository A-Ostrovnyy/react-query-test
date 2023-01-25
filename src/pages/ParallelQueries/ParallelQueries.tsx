import { useQuery } from 'react-query';
import axios from 'axios';

import { Friend, Hero } from '../../Types';
import { withLayout } from '../Layout/Layout';

const fetchAllSuerHeroes = () => {
    return axios.get<Hero[]>('http://localhost:4000/superheroes');
}

const fetchAllFriends = () => {
    return axios.get<Friend[]>('http://localhost:4000/friends');
}

const ParallelQueriesPage = () => {
    const { data: superHeroesData } = useQuery('super-heroes', fetchAllSuerHeroes);
    const { data: friendsData } = useQuery('friends', fetchAllFriends);

    // if (!heroId) {
    //     return null;
    // }

    // const {data, isLoading, isError, error} = useSuperHeroData(heroId);

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    // if (isError) {
    //     // @ts-ignore
    //     return <div>{error.message}</div>
    // }

    return (
        <>
            <h2>Parallel queries Page</h2>
        </>
    );
};

export default withLayout(ParallelQueriesPage);
