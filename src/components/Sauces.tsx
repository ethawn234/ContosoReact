import { useQuery } from "@tanstack/react-query";
import { getSauces } from "../api/ContosoPizzaService";
import Table from "./Table";


export default function Sauces(){
    const { data, isError, isLoading } = useQuery({
        queryKey: ['sauces'],
        queryFn: getSauces,
        select: data => data.data
    });

    return (
        <>
        <h1>Available Toppings</h1>
        {
            isError ? <span>Sorry, something went wrong</span>
                    : isLoading ? <span>Loading...</span>
                    : (data?.length === 0) ? <p>No pizzas available.</p>
                    : data && data?.length > 0 ? <Table data={data} /> : null
        }
        </>
    )
}