import { useQuery, useMutation, useQueryClient, QueryClient } from 'react-query';
import axios, { AxiosResponse } from "axios";

import { Hero } from '../Types';

interface HeroBase {
    name: string
    alterEgo: string
}

function fetchAllSuperHeroes () {
    return axios.get<Hero[]>('http://localhost:4000/superheroes');
}

function addSuperHero (hero: HeroBase) {
    return axios.post<Hero>('http://localhost:4000/superheroes', hero);
}

// TODO: add types to function parameters
export const useSuperHeroesData = (onSuccess: any, onError: any) => {
    return useQuery(
        'super-heroes',
        fetchAllSuperHeroes,
        {
            // cacheTime vs staleTime: https://tkdodo.eu/blog/practical-react-query#the-defaults-explained
            // cacheTime: 5000,
            // staleTime: 30000
            // refetchOnMount: true,
            // refetchOnWindowFocus: true
            // enabled: false // disable fetching on mount
            onSuccess, // callback
            onError, // callback
            // select: selectData
        }
    );
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // Refetch after created entity
        // onSuccess: () => {
        //     queryClient.invalidateQueries('super-heroes');
        // }
        // onSuccess: (data) => {
        //     queryClient.setQueryData('super-heroes', (oldQueryData: AxiosResponse<Hero[]>) => {
        //         // TODO: add typings
        //         return ({
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         })
        //     })
        // }
        onMutate: async (newHero: Hero) => {
            await queryClient.cancelQueries('super-heroes');
            const previousHeroData = queryClient.getQueryData('super-heroes');
            queryClient.setQueryData('super-heroes', (oldQueryData: AxiosResponse<Hero[]>) => {
                // TODO: add typings
                return ({
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {
                            ...newHero,
                            id: oldQueryData?.data?.length + 1
                        }
                    ]
                })
            });
            return {
                previousHeroData
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context?.previousHeroData);
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes');
        }
    })
}
