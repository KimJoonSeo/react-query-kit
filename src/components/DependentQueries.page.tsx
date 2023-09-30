import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface User {
    id: string,
    channelId: string,

}
interface Channel {
    id: string,
    courses: string[],
}
const fetchUserByEmail = async (email: string): Promise<User> => {
    const rs = await axios.get(`http://localhost:4000/users/${email}`);
    return rs.data
}

const fetchCoursesByChannelId = async (channelId: string): Promise<Channel[]> => {
    const rs = await axios.get(`http://localhost:4000/channels/${channelId}`);
    return rs.data;

}

export const DependentQueriesPage = ({email}: {email: string}) => {
    const {data} = useQuery(['user', email], () => fetchUserByEmail(email));
    const channelId = data?.channelId;
    useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId as string), {
        enabled: !!channelId,
    });

    return <div>Dependent queries page</div>
}