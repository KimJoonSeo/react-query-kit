import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {Hero} from "../components/RQSuperHeroes.page";

const fetchSuperHeroes = async (): Promise<Hero[]> => {
    const res = await axios.get('http://localhost:4000/superheroes');
    return res.data;
}

const useSuperHeroesData = () => useQuery<Hero[], AxiosError>(
    ['super-heroes'],
    fetchSuperHeroes,
    {
        select: (data: Hero[]) => data.filter(hero => hero.name.length < 10)
    }
);

export default useSuperHeroesData;