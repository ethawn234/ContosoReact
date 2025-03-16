
import { PizzaDTO } from '../types/data-contracts';
import { getPizzas } from '../api/ContosoPizzaLayer';
import './Pizza.css';
import { useQuery } from '@tanstack/react-query';


function Pizzas() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['ContosoPizzas'],
    queryFn: getPizzas,
    select: (data) => data.data,
    staleTime: 2000
  });
  
  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
  const pizzaKeys = data && data?.length > 0 ? getColHeaders(data[0]) : [];

  return (
    <>
    <h1>Get All Pizzas</h1>
      {
        isError ? <span>Sorry, something went wrong</span>
        : isLoading ? <span>Loading...</span>
        : (data && data?.length === 0) ? <p>No pizzas available.</p>
        : (
          <table>
            <thead>
              <tr>
                {
                  pizzaKeys.map(key => <th key={key}>{key.toString().toUpperCase()}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                data?.map(function(p:PizzaDTO){
                  const { name, id, sauce, toppings } = p;
                  const topping = toppings?.map(t => t.name).join(', ');

                  const pizza = {
                    id: id,
                    name: name,
                    toppings: topping,
                    sauce: sauce?.name
                  };
                  
                  return (
                    <tr key={p.id}>
                      {
                        pizzaKeys.map(key => (
                          <td key={key}>{String(pizza[key])}</td>
                        ))
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        )
      }
    </>
  )
}

export default Pizzas
