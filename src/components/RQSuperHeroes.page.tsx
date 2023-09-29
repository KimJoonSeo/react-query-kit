import useSuperHeroesData from "../hooks/useSuperHeroesData";

export interface Hero {
    id: number,
    name: string,
    alterEgo: string,
}
export const RQSuperHeroesPage = () => {
    const {isLoading, data, isError, error} =
        useSuperHeroesData();
    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            {/*<button onClick={() => refetch()}>Fetch heroes</button>*/}
            {(isLoading) && <h2>Loading...</h2>}
            {isError && <h2>{error?.message}</h2>}
            {
                data?.map((hero: Hero) => {
                    return <div key={hero.name}>{hero.name}</div>
                })
            }
        </>
    )
}