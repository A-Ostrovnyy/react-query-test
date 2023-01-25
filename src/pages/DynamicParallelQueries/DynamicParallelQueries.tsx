import { useQueries } from 'react-query';
import axios from 'axios';

import { DynamicParallelQueriesPageProps } from './DynamicParallelQueries.types';
import { Hero } from '../../Types';
import { withLayout } from '../Layout/Layout';

const fetchSuperHero = (heroId: number) => {
    return axios.get<Hero[]>(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallelQueriesPage = ({heroIds}: DynamicParallelQueriesPageProps) => {

    const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    );

    console.log('queryResults: ', queryResults);
    return (
        <>
            <h2>Dynamic parallel queries Page</h2>
        </>
    );
};

export default withLayout<DynamicParallelQueriesPageProps>(DynamicParallelQueriesPage);
