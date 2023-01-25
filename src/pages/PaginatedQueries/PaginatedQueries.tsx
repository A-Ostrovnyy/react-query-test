import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Color } from '../../Types';
import { withLayout } from '../Layout/Layout';

const fetchAllColors = (page: number) => {
    return axios.get<Color[]>(`http://localhost:4000/colors?_limit=2&_page=${page}`);
}

const PaginatedQueriesPage = () => {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError, error  } = useQuery(
        ['colors', page],
        () => fetchAllColors(page),
        {
            keepPreviousData: true
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

    const handleIncrementPage = () => {
        setPage((prev) => ++prev);

    }
    const handleDecrementPage = () => {
        setPage((prev) => {
            if (prev === 1) {
                return 1;
            }
            return --prev;
        });
    }

    return (
        <>
            <h2>Paginated queries Page</h2>
            {
                data && <ol>
                    {
                        data.data.map(({id, label}) => (
                            <li key={id}>{`${id} - ${label}`}</li>
                        ))
                    }
                </ol>
            }
            <button disabled={page === 1} onClick={handleDecrementPage}>Previous page</button>
            <button disabled={page === 4} onClick={handleIncrementPage}>Next page</button>
        </>
    );
};

export default withLayout(PaginatedQueriesPage);
