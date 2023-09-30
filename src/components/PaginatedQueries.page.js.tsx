import axios, {AxiosError} from "axios";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

export interface Color {
    id: number,
    label: string,
}
const fetchColors = async (pageNumber: number): Promise<Color[]> => {
    const rs = await axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber.toString()}`);
    return rs.data;
}
export const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const {isLoading, isFetching, data, isError, error} = useQuery<Color[], AxiosError>(['colors', pageNumber], () => fetchColors(pageNumber), {keepPreviousData: true});
    return (
        <>
            {(isLoading || isFetching) && <h2>Loading...</h2>}
            {isError && <h2>{error?.message}</h2>}
            <div>
                {data?.map((color: Color) => {
                    return (
                        <div key={color.id}>
                            <h2>{color.id}. {color.label}</h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => setPageNumber(page => page-1)}
                        disabled={pageNumber === 1}>prev page</button>
                <button onClick={() => setPageNumber(page => page+1)}
                        disabled={pageNumber === 4}>next page</button>
            </div>
        </>
    )
}