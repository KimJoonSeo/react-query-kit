import {Hero} from "../components/RQSuperHeroes.page";
import axios, {AxiosError} from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export const fetchSuperHero = async (heroId: string): Promise<Hero> => {
    const res = await axios.get(`http://localhost:4000/superheroes/${heroId}`);
    return res.data;
}
const useSuperHeroData = (heroId: string | undefined) => {
    const id = heroId === undefined ? '0' : heroId;
    const queryClient = useQueryClient();
    const data: Hero[] | undefined = queryClient.getQueryData(['super-heroes']);
    const initialData = data?.find(hero => hero.id === parseInt(id));
    useQuery({
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
        initialData: initialData
    })
    return useQuery<Hero, AxiosError>(['super-hero', id], () => fetchSuperHero(id));
}
export default useSuperHeroData;