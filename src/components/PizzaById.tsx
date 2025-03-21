
import { useState } from "react";
import { getPizza } from "../api/ContosoPizzaService";
import { useQuery } from "@tanstack/react-query";
import Table from "./Table";

// fix:
// Not Found response
// Find placeholder/initial value
function PizzaById(){
	const [id, setId] = useState<number>(0);
	const [input, setInput] = useState<number>(0);

	const { data, isError, isLoading, error } = useQuery({
		queryKey: ['getById', id],
		queryFn: () => getPizza(id),
		enabled: !!id, // The query will not execute until the id exists
		select: data => data.data,
		retry: false
	});

	return (
		<>
		<h1>Get data By Id</h1>
		<form onSubmit={e => e.preventDefault()}>
			<label>
				Pizza ID: { ' ' }
				<input type="number" value={input} onChange={e => {
					const val = parseInt(e.target.value);
					if(!isNaN(val)){
						setInput(val)
					}
				}} />
				<button onClick={() => setId(input)}>Get Pizza</button>
			</label>
		</form>
			{	isLoading ? <span>Loading...</span> 
				: isError ? <span>{`Error: ${error.message}`}</span> 
				: !data ? null : <Table data={[data]} /> // pass data as array to reuise <Table />
			}
		</>
	)
}

export default PizzaById
