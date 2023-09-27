import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

interface Hero {
    id: number,
    name: string,
    alterEgo: string,
}
const fetchSuperHeroes = async (): Promise<Hero[]> => {
    const res = await axios.get('http://localhost:4000/superheroes');
    return res.data;
}
export const RQSuperHeroesPage = () => {
    const {isLoading, data, isError, error, isFetching} = useQuery<Hero[], AxiosError>(
        ['super-heroes'], fetchSuperHeroes, {cacheTime: 5000});
    console.log({isLoading, isFetching});
    if(isLoading) {
        return <h2>Loading...</h2>
    }
    if(isError) {
        return <h2>{error?.message}</h2>
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