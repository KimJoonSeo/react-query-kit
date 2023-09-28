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
    const {isLoading, data, isError, error, isFetching, refetch} = useQuery<Hero[], AxiosError>(
        ['super-heroes'],
        fetchSuperHeroes,
        {
            enabled: false,
        });
    console.log({isLoading, isFetching});
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <button onClick={() => refetch()}>Fetch heroes</button>
            {(isLoading || isFetching) && <h2>Loading...</h2>}
            {isError && <h2>{error?.message}</h2>}
            {
                data?.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}