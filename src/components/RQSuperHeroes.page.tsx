import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {useState} from "react";

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
    const [refetchInterval, setRefetchInterval] = useState(3000);
    const onSuccess = (data: Hero[]) => {
        if(data.length >= 4) setRefetchInterval(0);
    }

    const onError = (error: any) => {
        setRefetchInterval(0);
    }

    const {isLoading, data, isError, error, isFetching, refetch} = useQuery<Hero[], AxiosError>(
        ['super-heroes'],
        fetchSuperHeroes,
        {
            onSuccess: onSuccess,
            onError: onError,
            refetchInterval: refetchInterval === 0 ? false : refetchInterval,
            refetchIntervalInBackground: true,

        });
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            {/*<button onClick={() => refetch()}>Fetch heroes</button>*/}
            {(isLoading) && <h2>Loading...</h2>}
            {isError && <h2>{error?.message}</h2>}
            {
                data?.map((hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}


// refeth data every 3 seconds
// db에 네번째 히어로를 넣기
// onsuccess 함수에서 히어로가 네명이면 폴링을 멈춘다.
// 에러가 발생하면 폴링을 멈춘다.