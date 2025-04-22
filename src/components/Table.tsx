import { allSauces, allToppings } from "../features/order/constants";
import {
  PizzaCreateDTO,
  PizzaDTO,
  Sauce,
  Topping,
} from "../types/data-contracts";

const handleToppingsIdList = (toppingIdsList: number[]): Topping[] =>
  toppingIdsList?.map(
    (id) => allToppings.filter((topping) => topping.id == id)[0]
  );

function _createDTOtoPizzaDTO(pizza: PizzaCreateDTO): PizzaDTO[] {
  return [
    {
      id: pizza.id,
      name: pizza.name,
      sauce: allSauces.filter((s) => s.id == pizza.sauceId)[0],
      toppings: handleToppingsIdList(pizza.toppingIds),
    },
  ];
}
export default function Table<
  T extends PizzaDTO | PizzaCreateDTO | Topping | Sauce,
>({ data }: { data: T[] }) {
  const mappedData =
    "sauceId" in data[0] ? _createDTOtoPizzaDTO(data[0]) : data;

  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) =>
    Object.keys(obj) as (keyof T)[];
  const keys =
    mappedData && mappedData?.length > 0 ? getColHeaders(mappedData[0]) : [];

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
        {/* Refactor to conditionally render by type; this may be fine for smaller projects with simply views but larger apps would likely need different Tables per type. */}
        {mappedData?.map((item) => (
          <tr key={item.id}>
            {keys.map((col) => {
              // const formattedData = (function () {
              //   switch (true) {
              //     case Array.isArray(item[col]):
              //       return item[col].map((item) => item.name).join(", ");
              //     case typeof item[col] == "object" &&
              //       item[col] !== null &&
              //       "name" in item[col]:
              //       return;
              //     default:
              //       break;
              //   }
              // })();

              const formattedData = Array.isArray(item[col])
                ? item[col].map((prop) => prop.name).join(", ") // handle arrays (toppings)
                : typeof item[col] == "object" &&
                    item[col] !== null &&
                    "name" in item[col]
                  ? (item[col] as { name: string }).name // handle objs (sauce)
                  : item[col]; // handle primitive fields

              return (
                <td key={`${item.id}-${String(col)}`}>
                  {String(formattedData ?? "N/A")}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
