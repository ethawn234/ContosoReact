import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { postPizza } from '../../api/ContosoPizzaService';
import { PizzaCreateDTO, PizzaDTO } from '../../types/data-contracts';
import Table from '../../components/Table';
import { useAppForm } from '../../hooks/forms/form';
import { allSauces } from './constants';

export default function PizzaCreate(){
  const [createdPizza, setCreatedPizza] = useState<PizzaDTO>();

  const mutate = useMutation({ // , isPending, isError, isSuccess
    mutationKey: ['pizzaCreate'],
    mutationFn: async (pizza: PizzaCreateDTO) => postPizza(pizza),
    onSuccess: (data) => setCreatedPizza(data.data)
  });

  const form = useAppForm({ 
    defaultValues: {
      id: 0,
      name: '',
      sauceId: 1, // num|str
      toppingIds: [] // make unique set; num|str
    } as PizzaCreateDTO,
    onSubmit: async ({ formApi, value}) => {
      console.log('value: ', value)
      await mutate.mutateAsync(value);
      // formApi.reset();
    }
  })

  // const handleToppings = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, toppingIds: [ ...prevPizza.toppingIds, Number(e.target.value) ] }));

  // const handleSauce = (e: ChangeEvent<HTMLSelectElement>) => setPizza(prevPizza => ({ ...prevPizza, sauceId: Number(e.target.value) }));

  return (
    <>
      <h1>Order Pizza</h1>
      <form onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}>
          <form.AppField
            name='name'
            children={field => <field.TextField label='Pizza Name' />}
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A pizza name is required'
                  : value.length < 3
                    ? 'Pizza name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in pizza name'
                )
              },
            }}
          />
          <hr />
          {
            allSauces.map(sauce => {
              return (
                <form.AppField
                  name='sauceId'
                  key={sauce.id}
                  children={field => <field.RadioField option={sauce} label={sauce.name} />}
                />
              )
            })
          }
          <hr />
          {/* <div>
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
          <br /> */}
          <form.AppForm>
            <form.SubscribeButton label="sss"/>
          </form.AppForm>
          
      </form>
      {
        createdPizza ? <Table data={[createdPizza]} /> : null//<Table data={[pizza]} />
      }
    </>
  )
}