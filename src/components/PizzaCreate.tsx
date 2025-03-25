import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../api/ContosoPizzaService';
import { PizzaCreateDTO, PizzaDTO } from '../types/data-contracts';
import Table from './Table';

export default function PizzaCreate(){
  const [pizza, setPizza] = useState<PizzaCreateDTO>({
    id: 0,
    name: '',
    sauceId: 0, // num|str
    toppingIds: [] // make unique set; num|str
  });
  
  const [createdPizza, setCreatedPizza] = useState<PizzaDTO>();

  const { mutate } = useMutation({ // , isPending, isError, isSuccess
    mutationFn: postPizza,
    onSuccess: (data) => setCreatedPizza(data.data)
  })

  const handleToppings = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, toppingIds: [ ...prevPizza.toppingIds, Number(e.target.value) ] }));

  const handleSauce = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, sauceId: Number(e.target.value) }));

  return (
    <>
      <h1>Order</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input id="pizzaName" type="text" value={pizza.name} placeholder='Pizza Name' onChange={e => setPizza({ ...pizza, name: e.target.value })} />
        <br />
        <br />
        <label htmlFor="sauceName">Sauce:{' '}</label>
        <select id='sauceName' onChange={handleSauce}>
          <optgroup label='Choose Your Sauce'>
            <option value={1}>Tomato</option>
            <option value={2}>Pesto</option>
          </optgroup>
        </select>
        <br />
        <br />
        {/* <label htmlFor="toppings">Toppings:{' '}</label>
        <select multiple name="toppings" id="toppings" onChange={handleToppings}>
          <optgroup label='Choose Your Toppings'>
            <option value={1}>Pepperoni</option>
            <option value={2}>Sausage</option>
            <option value={3}>Ham</option>
            <option value={4}>Chicken</option>
            <option value={5}>Pineapple</option>
          </optgroup>
        </select> */}
        <div>
          <div>
            <input type="checkbox" name="Pepperoni" value={1} defaultChecked />
            <label htmlFor='Pepperoni'>Pepperoni</label>
            <input type="checkbox" name="Sausage" value={2} />
            <label htmlFor='Sausage'>Sausage</label>
            <input type="checkbox" name="Ham" value={3} />
            <label htmlFor='Ham'>Ham</label>
          </div>
          <div>
            <input type="checkbox" name="Chicken" value={4} />
            <label htmlFor='Chicken'>Chicken</label>
            <input type="checkbox" name="Pineapple" value={5} />
            <label htmlFor='Pineapple'>Pineapple</label>
          </div>
        </div>
        <br />          
        <br />
        <button style={{backgroundColor: 'green'}} onClick={() => mutate(pizza)}>Order Pizza</button>
      </form>
      {
        createdPizza ? <Table data={[createdPizza]} /> : <Table data={[pizza]} />
      }
    </>
  )
}