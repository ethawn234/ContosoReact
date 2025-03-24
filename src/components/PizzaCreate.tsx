import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../api/ContosoPizzaService';
import { PizzaCreateBody, PizzaDTO } from '../types/data-contracts';
import Table from './Table';

const topping = ["Pepperoni", "Sausage", "Ham", "Chicken", "Pineapple"]


export default function PizzaCreate(){
  const [pizza, setPizza] = useState<PizzaCreateBody>({
    id: 0,
    name: '',
    sauceId: 0, // <input type="dropdown" />; get Sauce.name
    toppings: [] // <input type="dropdown" /> ?
  });

  const [createdPizza, setCreatedPizza] = useState<PizzaDTO>();

  const { mutate } = useMutation({ // , isPending, isError, isSuccess
    mutationFn: postPizza,
    onSuccess: (data) => setCreatedPizza(data.data)
  })

  const handleToppings = (e: number) => {
    const toppingId = parseInt(topping[e]);
    console.log('toppingId: ', toppingId)
    setPizza(prevPizza => ({ ...prevPizza, toppings: [...prevPizza.toppings, toppingId] }));
  }
  
  const handleSauce = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = typeof e.target.value == 'string' ? parseInt(e.target.value) : -1;
    setPizza({ ...pizza, sauceId: id });
  }

  const createPizza = async () => {
    // const newPizza = await postPizza(pizza);

    mutate(pizza);
    
    // setCreatedPizza(newPizza);
  }

  return (
    <>
      <h1>Order</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input id="pizzaName" type="text" value={pizza.name} placeholder='Pizza Name' onChange={e => setPizza({ ...pizza, name: e.target.value })} />
        <br />
        <br />
        <label htmlFor="sauceName">Sauce:{' '}</label>
        <select id='sauceName' onChange={e => handleSauce(e)}>
          <optgroup label='Choose Your Sauce'>
            <option value={0}>Tomato</option>
            <option value={1}>Pesto</option>
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
        createdPizza ? <Table data={[createdPizza]} /> : null
      }
    </>
  )
}