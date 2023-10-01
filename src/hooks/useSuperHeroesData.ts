import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {Hero} from "../components/RQSuperHeroes.page";
import {request} from "../utils/axios-utils";

export const fetchSuperHeroes = async (): Promise<Hero[]> => {
    const res = await request({url: '/superheroes'});
    return res.data;
}

const addSuperHero = async (hero: Hero): Promise<Hero> => {
    const res = await request({url: '/superheroes', method: 'post', data: hero});
        // await axios.post('http://localhost:4000/superheroes1', hero);
    return res.data;
}
const useSuperHeroesData = () => useQuery<Hero[], AxiosError>(
    ['super-heroes'],
    fetchSuperHeroes,
);

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation<Hero, AxiosError, Hero>(addSuperHero, {
        // onSuccess: (data) => {
        //     // queryClient.invalidateQueries(['super-heroes']);
        //     const allHeroes: Hero[] | undefined = queryClient.getQueryData(['super-heroes']);
        //     if(allHeroes) {
        //         allHeroes.push(data);
        //     }
        //     queryClient.setQueryData(['super-heroes'], allHeroes === undefined ? [data] : allHeroes)
        // }
        onMutate: async (data: Hero) => {
            await queryClient.cancelQueries(['super-heroes']);
            const allHeroes: Hero[] | undefined = queryClient.getQueryData(['super-heroes']);
            if(allHeroes) {
                allHeroes.push(data);
            }
            queryClient.setQueryData(['super-heroes'], allHeroes === undefined ? [data] : allHeroes)
            return allHeroes
        },
        onSettled: () => {
            queryClient.invalidateQueries(['super-heroes']);
        },
        onError: (_error, _variables, _context) => {
            const allHeroes: Hero[] | undefined = queryClient.getQueryData(['super-heroes']);
            if(allHeroes) {
                allHeroes.pop();
            }
            queryClient.setQueryData(['super-heroes'], allHeroes);
        }

    });
}
export default useSuperHeroesData;