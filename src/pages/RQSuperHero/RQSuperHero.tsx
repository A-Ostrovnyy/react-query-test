import { useParams } from 'react-router-dom';

import { useSuperHeroData } from '../../hooks'
import { withLayout } from '../Layout/Layout';

const RQSuperHeroPage = () => {
    const {heroId} = useParams();

    if (!heroId) {
        return null;
    }

    const {data, isLoading, isError, error} = useSuperHeroData(heroId);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        // @ts-ignore
        return <div>{error.message}</div>
    }

    return (
        <>
            <h2>Super Hero Details Page</h2>
            <div>{data?.data.name}</div>
            <div>{data?.data.alterEgo}</div>
        </>
    );
};

export default withLayout(RQSuperHeroPage);
