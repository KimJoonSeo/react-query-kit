import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface Hero {
    id: number,
    name: string,
    alterEgo: string,
}
const fetchSuperHeroes = (): Promise<Hero[]> => {
    return axios.get('http://localhost:4000/superheroes')
                .then(res => res.data);
}
export const RQSuperHeroesPage = () => {
    const {isLoading, data} = useQuery(['super-heroes'], fetchSuperHeroes);
    if(isLoading) {
        return <h2>Loading...</h2>
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            {
                data?.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}