import { useMutation } from "@tanstack/react-query";

import { postPizza } from "../../api/ContosoPizzaService";
import { PizzaCreateDTO } from "../../types/data-contracts";
import Table from "../../components/Table";
import { useAppForm } from "../../hooks/forms/form";
import { allSauces, allToppings } from "./constants";
import { useEffect, useState } from "react";

export default function PizzaCreate() {
  const [order, setOrder] = useState<PizzaCreateDTO>({
    id: 0,
    name: "",
    sauceId: undefined,
    toppingIds: [],
  });
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

  useEffect(() => console.log("order: ", order), [order]);

  return (
    <>
      <h1>Order Pizza</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        onChange={(e) => {
          // console.log("e.target: ", e.target);
          const val = e.target.value;
          console.log("val: ", val);
          const fieldType = e.target.name;
          // console.log("fieldType: ", fieldType);
          const key =
            fieldType === "sauce"
              ? "sauceId"
              : fieldType === "topping"
                ? "toppingIds"
                : "name";

          if (key === "toppingIds") {
            if (order.toppingIds.includes(val)) {
              setOrder((prev) => ({
                ...prev,
                [key]: [...prev.toppingIds.filter((id) => id != val)],
              }));
            } else {
              setOrder((prev) => ({
                ...prev,
                [key]: [...prev.toppingIds, val],
              }));
            }
          } else {
            setOrder((prev) => ({ ...prev, [key]: val }));
          }
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
        {/* 
        on PizzaDTO, Sauce & Toppings are typed Sauce & Toppings
        on PizzaCreateDTO, Sauce & Toppings are typed int & int[]

        1. convert PizzaCreateDTO to PizzaDTO
          - pro: won't need to write more complicated logic in Table
          - con: how will this handle onChange?
        2. Convert in Table
          - pro: adheres better to separation of concerns; all Table logic is grouped 
          - con: 
        */}
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
      {/* <form.Subscribe
        selector={(pizza) => pizza.values}
        children={(pizza) => {
          // console.log("pizza: ", pizza);
          return <Table data={[pizza]} />;
        }}
      /> */}
      <Table data={[order]} />
    </>
  );
}
