import { useState, useEffect } from 'react'


function Pizzas() {
  const [pizzas, setPizzas] = useState([])

  async function getData() {
    const url = "https://localhost:7030/ContosoPizza/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  const data = pizzas.map(p => {
    const toppings = p.toppings.map(t => {
        return (
            <div key={t.id}>
                <p>{t.name}</p>
                <p>{t.calories}</p>
            </div>
        )
    })
    
    return <div key={p.id}>
        {p.name}
        {p.sauce.name}
        {toppings.map(t => t)}
    </div>
  })
  
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
            const toppings = p.toppings.map(t => {
                return (
                    <div key={t.id}>
                        <p>{t.name}</p>
                        <p>{t.calories}</p>
                    </div>
                )
            })
            
            return <div key={p.id}>
                {p.name}
                {p.sauce.name}
                {/* {toppings.map(t => t)} */}
                {toppings}
            </div>
          })
      }
    </>
  )
}

export default Pizzas
