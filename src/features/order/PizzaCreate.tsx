import { useMutation } from "@tanstack/react-query";

import { postPizza } from "../../api/ContosoPizzaService";
import { PizzaCreateDTO } from "../../types/data-contracts";
import Table from "../../components/Table";
import { useAppForm } from "../../hooks/forms/form";
import { allSauces, allToppings } from "./constants";

export default function PizzaCreate() {
  const mutate = useMutation({
    // , isPending, isError, isSuccess
    mutationKey: ["pizzaCreate"],
    mutationFn: async (pizza: PizzaCreateDTO) => postPizza(pizza),
  });

  const form = useAppForm({
    defaultValues: {
      id: 0,
      name: "",
      sauceId: 0,
      toppingIds: [],
    } as PizzaCreateDTO,
    onSubmit: async ({ formApi, value }) => {
      await mutate.mutateAsync(value);
      formApi.reset();
    },
  });

  return (
    <>
      <h1>Order Pizza</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Pizza Name" />}
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A pizza name is required"
                : value.length < 3
                  ? "Pizza name must be at least 3 characters"
                  : undefined,
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              return (
                value.includes("error") && 'No "error" allowed in pizza name'
              );
            },
          }}
        />
        <hr />
        {allSauces.map((sauce) => {
          return (
            <form.AppField
              name="sauceId"
              key={sauce.id}
              children={(field) => (
                <field.SauceField option={sauce} label={sauce.name} />
              )}
            />
          );
        })}
        <hr />
        {allToppings.map((toppingSubField, i) => (
          <form.AppField
            name="toppingIds"
            key={i}
            children={(field) => (
              <field.ToppingField
                option={toppingSubField}
                label={toppingSubField.name}
              />
            )}
          />
        ))}
        <form.AppForm>
          <form.SubscribeButton label="Order" />
        </form.AppForm>
      </form>
      {form.state.values.id != 0 ? <Table data={[form.state.values]} /> : null}
    </>
  );
}
