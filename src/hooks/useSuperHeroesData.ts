import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {Hero} from "../components/RQSuperHeroes.page";

export const fetchSuperHeroes = async (): Promise<Hero[]> => {
    const res = await axios.get('http://localhost:4000/superheroes');
    return res.data;
}

const addSuperHero = async (hero: Hero): Promise<Hero> => {
    const rs = await axios.post('http://localhost:4000/superheroes', hero);
    return rs.data;
}
const useSuperHeroesData = () => useQuery<Hero[], AxiosError>(
    ['super-heroes'],
    fetchSuperHeroes,
);

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation<Hero, AxiosError, Hero>(addSuperHero, {
        onSuccess: () => {
            queryClient.invalidateQueries(['super-heroes']);
        }
    });
}
export default useSuperHeroesData;