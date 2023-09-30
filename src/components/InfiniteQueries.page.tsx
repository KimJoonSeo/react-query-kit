import axios, {AxiosError} from "axios";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {Fragment, useState} from "react";

export interface Color {
    id: number,
    label: string,
}
const fetchColors = async ({pageParam = 1}): Promise<Color[]> => {
    const rs = await axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
    return rs.data;
}
export const InfiniteQueriesPage = () => {
    const {
        isLoading,
        isFetching,
        data,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<Color[], AxiosError>(['colors'], fetchColors, {
       getNextPageParam: (_lastPage, pages) => {
           if(pages.length < 4) {
               return pages.length + 1
           }
           return undefined;
       }
    });
    return (
        <>
            {(isLoading || isFetching) && <h2>Loading...</h2>}
            {isError && <h2>{error?.message}</h2>}
            <div>
                {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group.map(color => (
                                <h2 key={color.id}>
                                    {color.id}. {color.label}
                                </h2>
                            ))}
                        </Fragment>
                    )
                )}
            </div>
            <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load More</button>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}