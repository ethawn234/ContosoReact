import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../api/ContosoPizzaService';
import { PizzaDTO, Topping } from '../types/data-contracts';
import Table from './Table';

const toppings: Topping[] = [
  { name: "Pepperoni", calories: 130 },
  { name: "Sausage", calories: 100 },
  { name: "Ham", calories: 70 },
  { name: "Chicken", calories: 50 },
  { name: "Pineapple", calories: 75 }
];

export default function PizzaCreate(){
  // {
  //   "id": 0,
  //   "name": "test",
  //   "sauce": {
  //     "id": 0,
  //     "name": "Tomato",
  //     "isVegan": true
  //   },
  //   "toppings": [
  //     {
  //       "id": 0,
  //       "name": "Pepperoni",
  //       "calories": 130
  //     }
  //   ]
  // }
  const [pizza, setPizza] = useState<PizzaDTO>({
    id: 0,
    name: '',
    sauce: {}, // <input type="dropdown" />; get Sauce.name
    toppings: [] // <input type="dropdown" /> ?
  });

  const { data, isPending, isError, isSuccess } = useMutation({
    mutationFn: postPizza
  })

  const handleToppings = (e) => {
    const 
    setPizza({ ...pizza, toppings: !isNaN(e.target.value) && parseInt(e.target.value) ? pizza.toppings?.push(toppings[parseInt(e.target.value)]) : null })}
  }

  const createPizza = async () => {
    
    const newPizza = await postPizza(pizza);

    return newPizza;
  }

  return (
    <>
      <h1>Order</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input id="pizzaName" type="text" value={pizza.name} placeholder='Pizza Name' onChange={e => setPizza({ ...pizza, name: e.target.value })} />
        <br />
        <br />
        <label htmlFor="sauceName">Sauce:{' '}</label>
        <select id='sauceName'>
          <optgroup label='Choose Your Sauce'>
            <option value="tomato">Tomato</option>
            <option value="pesto">Pesto</option>
          </optgroup>
        </select>
        <br />
        <br />
        <label htmlFor="toppings">Toppings:{' '}</label>
        {/* topping selection needs to be mapped to their id */}
        <select name="toppings" id="toppings" onChange={e => handleToppings(e)>
          <optgroup label='Choose Your Toppings'>
            {/* <option value="all">All Toppings</option> */}
            <option value="0">Pepperoni</option>
            <option value="1">Sausage</option>
            <option value="2">Ham</option>
            <option value="3">Chicken</option>
            <option value="4">Pineapple</option>
            {/* <option value="pesto">Sausage</option> see what happens */}
          </optgroup>
        </select>
        <br />          
        <br />
        <button style={{backgroundColor: 'green'}} onClick={createPizza}>Order Pizza</button>
      </form>
      {
        data ? <Table data={[pizza]} /> : null
      }
    </>
  )

}