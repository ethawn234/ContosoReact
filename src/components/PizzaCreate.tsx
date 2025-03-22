import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../api/ContosoPizzaService';
import { PizzaDTO, Topping } from '../types/data-contracts';
import Table from './Table';

const topping = ["Pepperoni", "Sausage", "Ham", "Chicken", "Pineapple"]

type PizzaCreateBody = {
  id: number;
  name: string;
  sauce: { name: string };
  toppings: { name: string }[];  // <-- Correct type definition
}

export default function PizzaCreate(){
  const [pizza, setPizza] = useState<PizzaCreateBody>({
    id: 0,
    name: '',
    sauce: { name: '' }, // <input type="dropdown" />; get Sauce.name
    toppings: [] // <input type="dropdown" /> ?
  });

  const { data, isPending, isError, isSuccess } = useMutation({
    mutationFn: postPizza
  })

  const handleToppings = (e: number) => {
    let t= topping[e];
    console.log('t: ', t)
    setPizza({ ...pizza, toppings: [...pizza.toppings, { name: t }] });
  }
  

  const createPizza = async () => {
    console.log('pizza: ',pizza)
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
        <select id='sauceName' onChange={e => setPizza({ ...pizza, sauce: { name: e.target.value } })}>
          <optgroup label='Choose Your Sauce'>
            <option value="tomato">Tomato</option>
            <option value="pesto">Pesto</option>
          </optgroup>
        </select>
        <br />
        <br />
        <label htmlFor="toppings">Toppings:{' '}</label>
        <select name="toppings" id="toppings" onChange={e => handleToppings(parseInt(e.target.value))}>
          <optgroup label='Choose Your Toppings'>
            {/* <option value="all">All Toppings</option> */}
            <option value={0}>Pepperoni</option>
            <option value={1}>Sausage</option>
            <option value={2}>Ham</option>
            <option value={3}>Chicken</option>
            <option value={4}>Pineapple</option>
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