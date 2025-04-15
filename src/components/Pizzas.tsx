import { getPizzas } from "../api/ContosoPizzaService";
import "./Pizza.css";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";

function Pizzas() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pizzas"],
    queryFn: getPizzas,
    select: (data) => data.data,
    staleTime: 2000,
  });

  return (
    <>
      <h1>All Pizzas</h1>
      {isError ? (
        <span>Sorry, something went wrong</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : data?.length === 0 ? (
        <p>No pizzas available.</p>
      ) : data && data?.length > 0 ? (
        <Table data={data} />
      ) : null}
    </>
  );
}

export default Pizzas;
