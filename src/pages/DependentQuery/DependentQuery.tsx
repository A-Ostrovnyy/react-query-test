import axios from "axios";
import { useQuery } from "react-query";
import { User, Channel } from "../../Types";
import { withLayout } from "../Layout/Layout";

import { DependentQueryPageProps } from './DependentQuery.types'



function fetchUserByEmail (email: string) {
    return axios.get<User>(`http://localhost:4000/users/${email}`);
};

function fetchCoursesByChannelId (channelId: string | undefined) {
    return axios.get<Channel>(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueryPage = ({email}: DependentQueryPageProps) => {
    const {data: userData} = useQuery(
        ['user', email],
        () => fetchUserByEmail(email)
    );
    const channelId = userData?.data.channelId;

    const {data: CoursesData} = useQuery(
        ['courses', channelId],
        () => fetchCoursesByChannelId(channelId),
        {
            enabled: !!channelId
        }
    );
    console.log('CoursesData: ', CoursesData);

    return (
        <h2>DependentQueryPage</h2>
    )
}

export default withLayout<DependentQueryPageProps>(DependentQueryPage);
