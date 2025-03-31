import { useAppForm } from "../hooks/forms/form"

const allToppings = [
  {},
  {
    "id": 1,
    "name": "Pepperoni",
    "calories": 130.0
  },
  {
    "id": 2,
    "name": "Sausage",
    "calories": 100.0
  },
  {
    "id": 3,
    "name": "Ham",
    "calories": 70.0
  },
  {
    "id": 4,
    "name": "Chicken",
    "calories": 50.0
  },
  {
    "id": 5,
    "name": "Pineapple",
    "calories": 75.0
  },
  {
    "id": 6,
    "name": "Pepperoni",
    "calories": 130.0
  }
];

export default function Test() {
  const form = useAppForm({
    defaultValues: {
      pizzaName: '',
      toppingIds: [6,3,1]
    },
  });

  // const onSubmit = (e: MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   form.handleSubmit();
  // }

  return (
    // Notice the `AppField` instead of `Field`; `AppField` provides the required context
    <form>
      <form.AppField
        name="pizzaName"
        children={(field) => <field.TextField label='Pizza Name' />}
      />
      <form.AppField 
        name="toppingIds" 
        mode="array"
        children={(field) => {
          return (
            <>
              <label htmlFor='Toppings'></label>
              {
                field.state.value.map(id => {
                  return (
                    <input type="checkbox" />
                  )
                })
              }
            </>
          )
        }}
      />
        {/* {
          field => (
            <ul>
              {
                field.state.value.map(toppings => <li>{toppings}</li>)
              }
            </ul>
          )
        }
      </form.AppField> */}
    </form>
    
  )
}