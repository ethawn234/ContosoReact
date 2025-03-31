import { ChangeEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../../api/ContosoPizzaService';
import { PizzaCreateDTO, PizzaDTO } from '../../types/data-contracts';
import Table from '../../components/Table';
import { useAppForm } from '../../hooks/forms/form';
import { sauces } from './constants';

const initialState = {
  id: 0,
  name: '',
  sauce: '', // num|str
  toppings: [] // make unique set; num|str
}

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
  });

  const form = useAppForm({ defaultValues: initialState })

  // const handleToppings = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, toppingIds: [ ...prevPizza.toppingIds, Number(e.target.value) ] }));

  const handleSauce = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, sauceId: Number(e.target.value) }));

  return (
    <>
      <h1>Order</h1>
      <form onSubmit={e => e.preventDefault()}>
          <form.AppField
            name='name'
            children={field => <field.TextField label='Pizza Name' />}
          />

          <form.AppField
            name='sauce'
            children={field => <field.TextField label='Suace' />}
          />
          
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