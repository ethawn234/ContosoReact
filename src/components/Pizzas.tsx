
import { PizzaDTO } from '../types/data-contracts';
import { getPizzas } from '../api/ContosoPizzaLayer';
import './Pizza.css';
import { useQuery } from '@tanstack/react-query';


function Pizzas() {
  const { data } = useQuery({
    queryKey: ['ContosoPizzas'],
    queryFn: getPizzas,
    staleTime: 5000
  });
  
  let pizzas: PizzaDTO[] = [];

  if(data && data.data.length > 0){
    pizzas = data.data;
  }

  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
  const pizzaKeys = pizzas?.length > 0 ? getColHeaders(pizzas[0]) : [];

  return (
    <>
    <h1>Get All Pizzas</h1>
      {
         pizzas && pizzas?.length === 0 
        ? <p>No pizzas available.</p>
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
                pizzas.map(function(p:PizzaDTO){
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
