import { Link } from "react-router-dom";
import useSuperHeroesData, {useAddSuperHeroData} from "../hooks/useSuperHeroesData";
import {useState} from "react";

export interface Hero {
    id?: number,
    name: string,
    alterEgo: string,
}
export const RQSuperHeroesPage = () => {
    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');
    const {isLoading, data, isError, error} =
        useSuperHeroesData();
    const {mutate: addHero} = useAddSuperHeroData();
    const handleAddHeroClick = () => {
        const hero: Hero = {name, alterEgo};
        addHero(hero);
    }
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type={'text'}
                    value={alterEgo}
                    onChange={e => setAlterEgo(e.target.value)} />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            {(isLoading) && <h2>Loading...</h2>}
            {(isError) && <h2>{error?.message}</h2>}
            {
                data?.map((hero: Hero) => {
                    return <div key={hero.id}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                })
            }
        </>
    )
}