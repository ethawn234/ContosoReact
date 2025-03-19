
import { useState } from "react";
import { getPizza } from "../api/ContosoPizzaService";
import { useQuery } from "@tanstack/react-query";

function PizzaById(){
	const [id, setId] = useState<number>(0);
	const [input, setInput] = useState<number>(0);

	const { data, isError, isLoading, error } = useQuery({
		queryKey: ['getById', id],
		queryFn: () => getPizza(id),
		enabled: !!id, // The query will not execute until the id exists
		select: data => data.data
	});
	
	// Helper function to extract keys from a generic type
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
	const pizzaKeys = data && getColHeaders(data);

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
				: !data ? null : (
					<table>
						<thead>
							<tr>
								{ pizzaKeys?.map(key => <th key={key}>{key.toString().toUpperCase()}</th>)}
							</tr>
						</thead>
						<tbody>
							<tr key={data.id}>
								{
									pizzaKeys?.map(key => {
										const pizza = Array.isArray(data[key])
										? data[key].map(prop => prop.name).join(', ')
										: typeof data[key] === 'object'
										? data[key]?.name
										: data[key]
										return <td key={key}>{String(pizza)}</td>
									})
								}
							</tr>
						</tbody>
					</table>
				)
			}
		</>
	)
}

export default PizzaById
