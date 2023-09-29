import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {fetchSuperHeroes} from "../hooks/useSuperHeroesData";

export interface Friend {
    id: number,
    name: string,
}
export const fetchFriends = async (): Promise<Friend[]> => {
    const res = await axios.get('http://localhost:4000/friends');
    return res.data;
}

const ParallelQueriesPage = () => {
    useQuery(['superheroes'], fetchSuperHeroes);
    useQuery(['friends'], fetchFriends);
    return <div>ParallelQueriesPage</div>
}

export default ParallelQueriesPage;