import { allSauces, allToppings } from "../features/order/constants";
import {
  PizzaCreateDTO,
  PizzaDTO,
  Sauce,
  Topping,
} from "../types/data-contracts";

// function mapDTO(pizza): PizzaDTO {
//   const convertedPizza = {
//     id: pizza.id,
//     name: pizza.name,
//     sauce: allSauces.filter((s) => s.id === pizza.sauceId)[0],
//     toppings: pizza.toppingIds.map(
//       (id) => allToppings.filter((t) => id === t.id)[0]
//     ),
//   };
//   console.log("convertedPizza: ", convertedPizza);
//   return convertedPizza;
// }

export default function Table<
  T extends PizzaDTO | PizzaCreateDTO | Topping | Sauce,
>({ data }: { data: T[] }) {
  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) =>
    Object.keys(obj) as (keyof T)[];
  const keys = data && data?.length > 0 ? getColHeaders(data[0]) : [];

  // console.log("keys: ", keys, "data: ", data);
  // let convertedPizza;

  // if (
  //   Array.isArray(data) &&
  //   typeof data[0] === "object" &&
  //   Object.prototype.hasOwnProperty.call(data[0], "sauceId")
  // ) {
  //   console.log("data[0]: ", data[0]);
  // }

  const handleToppingsIdList = (toppingIdsList: number[]) =>
    toppingIdsList.map(
      (id) => allToppings.filter((topping) => topping.id == id)[0].name
    );

  // PizzaDTO:
  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={String(key)}>{key.toString().toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item: T) => (
          <tr key={item.id}>
            {keys.map((itemKey) => {
              console.log("data: ", data);

              // Rewrite. The reason why all ID fields show Tomato is the logic needs to account for Sauce|Topping vs Pizza.
              // Check condition on line 71. It should account for (number && sauce.name)
              const formattedData = (() => {
                const value = item[itemKey];

                switch (true) {
                  case "isVegin" in data:
                  case Array.isArray(value) && typeof value[0] === "number":
                    console.log(1, value);
                    return handleToppingsIdList(value);

                  case Array.isArray(value) && typeof value[0] === "string":
                    console.log(2, value);
                    return value.map((prop) => prop.name).join(", ");

                  case typeof value === "number":
                    console.log(3, value);

                    return (
                      allSauces.find((sauce) => sauce.id === value)?.name ||
                      "You found the secret sauce!"
                    );

                  case typeof value === "object" &&
                    value !== null &&
                    "name" in value:
                    console.log(4, value);
                    return (value as { name: string }).name;

                  default:
                    return value;
                }
              })();

              return (
                <td key={`${item.id}-${String(itemKey)}`}>
                  {String(formattedData ?? "N/A")}
                </td>
              ); // The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
