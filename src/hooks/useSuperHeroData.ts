import { useQuery, useQueryClient } from 'react-query';
import axios from "axios";

import { Hero } from '../Types';

function fetchSuperHero ({queryKey}: {queryKey: any[]}) {
    const heroId = queryKey[1];
    return axios.get<Hero>(`http://localhost:4000/superheroes/${heroId}`)
}

// TODO: add types to function parameters
export const useSuperHeroData = (heroId: string) => {
const queryClient = useQueryClient();
    return useQuery(
        ['super-hero', heroId],
        fetchSuperHero,
        {
            initialData: () => {
                // @ts-ignore
                const hero = queryClient.getQueriesData('super-heros')?.data?.find(({id}) => id === +heroId);
                if (hero) {
                    return {
                        data: hero
                    }
                }
                return undefined;
            }
        }
    );
}
