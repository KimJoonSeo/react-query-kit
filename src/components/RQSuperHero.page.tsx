import useSuperHeroData from "../hooks/useSuperHeroData";
import {Link, useParams} from "react-router-dom";
import {Hero} from "./RQSuperHeroes.page";

export const RQSuperHeroPage = () => {
    const { heroId } = useParams();
    const {isLoading, data, isError, error} =
        useSuperHeroData(heroId);
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isError && <h2>{error?.message}</h2>}
            {data &&
                <div key={data.id}>
                    {data.name} - {data.alterEgo}
                </div>
            }
        </>
    )
}