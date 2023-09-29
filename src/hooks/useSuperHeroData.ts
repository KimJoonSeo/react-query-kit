import {Hero} from "../components/RQSuperHeroes.page";
import axios, {AxiosError} from "axios";
import {useQuery} from "@tanstack/react-query";

export const fetchSuperHero = async (heroId: string): Promise<Hero> => {
    const res = await axios.get(`http://localhost:4000/superheroes/${heroId}`);
    return res.data;
}
const useSuperHeroData = (heroId: string | undefined) => {
    return useQuery<Hero, AxiosError>(['super-hero', heroId], () => fetchSuperHero(heroId === undefined ? '0' : heroId));
}
export default useSuperHeroData;