import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

import { Color } from '../../Types';
import { Fragment } from 'react';
import { withLayout } from '../Layout/Layout';

const fetchAllColors = ({pageParam = 1}) => {
    return axios.get<Color[]>(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

const InfiniteQueriesPage = () => {
    const { data, isLoading, isError, error, hasNextPage, fetchNextPage } = useInfiniteQuery(
        ['colors'],
        fetchAllColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1
                }
                return undefined
            }
        }
    );

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        // TODO: add ts types
        // @ts-ignore
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>Infinite queries Page</h2>
            {
                data && <ol>
                    {
                        data.pages.map((group, i) => (
                            <Fragment key={i}>
                                {
                                    group.data.map(({id, label}) => (
                                        <li key={id}>{`${id} - ${label}`}</li>
                                    ))
                                }
                            </Fragment>
                        ))
                    }
                </ol>
            }
            <div>
                <button
                // @ts-ignore
                    onClick={fetchNextPage}
                    disabled={!hasNextPage}
                >
                    Load more
                </button>
            </div>
        </>
    );
};

export default withLayout(InfiniteQueriesPage);
