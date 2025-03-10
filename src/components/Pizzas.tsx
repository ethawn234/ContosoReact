import { useState, useEffect } from 'react'

import { ContosoPizza } from '../api/ContosoPizza';
import { PizzaDTO, Sauce, Topping } from '../types/data-contracts';

const api = new ContosoPizza({
  baseUrl: "https://localhost:7030"
});

// type PizzaDTOtype = {
//   /** @format int32 */
//   id?: number;
//   /**
//    * @minLength 1
//    * @maxLength 100
//    */
//   name: string;
//   sauce?: Sauce;
//   toppings?: Topping[] | null;
// }

function Pizzas() {
  const [pizzas, setPizzas] = useState<PizzaDTO[]>([])

  async function getData() {
    try {
      const response = api.contosoPizzaList();
      const json = await response;
      console.log(json);
      return json.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    async function fetchData() {
        const data = await getData();

        if (data) {
          setPizzas(data);
        }
      }
    fetchData();
  }, []);

  // Helper function to extract keys from a generic type
  const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
  const pizzaKeys = pizzas.length > 0 ? getColHeaders(pizzas[0]) : [];

  return (
    <>
      {
        pizzas.length === 0 
        ? <p>No pizzas available.</p>
        : (
          <table>
            <thead>
              <tr>
                {
                  pizzas.length > 0 &&
                  pizzaKeys.map(key => <th key={key}>{key.toString().toUpperCase()}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                pizzas.map(function(p){
                  const { name, id, sauce } = p;
                  let topping = [];

                  p.toppings.map(t => topping.push(t.name));
                  topping = topping.join(' ');

                  const pizza = {
                    id: id,
                    name: name,
                    toppings: topping,
                    sauce: sauce?.name
                  };

                  console.log('toppingStr: ', topping)
                  console.log('pizza: ', p)
                  return (
                    <tr key={p.id}>
                      {
                        pizzaKeys.map(key => (
                          <td>{String(pizza[key])}</td>
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
