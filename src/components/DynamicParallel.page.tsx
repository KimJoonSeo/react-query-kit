import {useQueries} from "@tanstack/react-query";
import {fetchSuperHero} from "../hooks/useSuperHeroData";

export const DynamicParallelPage = ({heroIds}: {heroIds: string[]}) => {
    const queryResults = useQueries({
        queries : heroIds.map(id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        }),
    });
    console.log({queryResults});
    return <div>DynamicParallelPage</div>
}