import { useState, useEffect } from 'react'

import { ContosoPizza } from '../api/ContosoPizza';
import { PizzaDTO } from '../types/data-contracts';

const api = new ContosoPizza({
  baseUrl: "https://localhost:7030"
});

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

  return (
    <>
      {
        pizzas.length === 0 
        ? <p>No pizzas available.</p>
        : pizzas.map(p => {
            const toppings = p.toppings && p.toppings.map(t => {
                return (
                    <div key={t.id}>
                        <p>{t.name}</p>
                        <p>{t.calories}</p>
                    </div>
                )
            })
            
            return <div key={p.id}>
                {p.name}
                {p.sauce && p.sauce.name ? p.sauce.name : null}
                {toppings}
            </div>
          })
      }
    </>
  )
}

export default Pizzas
