import { useState, useEffect } from 'react'

import { ContosoPizza } from '../api/ContosoPizza';
import { PizzaDTO } from '../types/data-contracts';

import './Pizza.css'

const api = new ContosoPizza({
  baseUrl: "https://localhost:7030"
});

function Pizzas() {
  const [pizzas, setPizzas] = useState<PizzaDTO[]>([])

  async function getData(): Promise<PizzaDTO[] | undefined>  {
    try {
      const response = api.contosoPizzaList();
      const json = await response;
      
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
