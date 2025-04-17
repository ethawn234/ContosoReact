import { allSauces, allToppings } from "../features/order/constants";
import {
  PizzaCreateDTO,
  PizzaDTO,
  Sauce,
  Topping,
} from "../types/data-contracts";
// export interface PizzaDTO {
//   /** @format int32 */
//   id?: number;
//   /**
//    * @minLength 1
//    * @maxLength 100
//    */
//   name: string;
//   sauce?: Sauce;
//   toppings?: Topping[] | null;
// }

// export type PizzaCreateDTO = {
//   /** @format int32 */
//   id: number;
//   /**
//    * @minLength 1
//    * @maxLength 100
//    */
//   name: string;
//   sauceId?: number;
//   toppingIds: number[]; // <-- Correct type definition
// };
const handleToppingsIdList = (toppingIdsList: number[]): Topping[] =>
  toppingIdsList?.map(
    (id) => allToppings.filter((topping) => topping.id == id)[0]
  );

function _createDTOtoPizzaDTO(pizza: PizzaCreateDTO): PizzaDTO[] {
  return [
    {
      id: pizza.id,
      name: pizza.name,
      sauce: allSauces.filter((s) => s.id === pizza.sauceId)[0],
      toppings: handleToppingsIdList(pizza.toppingIds),
    },
  ];
}
export default function Table<
  T extends PizzaDTO | PizzaCreateDTO | Topping | Sauce,
>({ data }: { data: T[] }) {
  // data needs to be reassigned to function return
  // Current Issue: identify when data is typeof PizzaCreateDTO & map cols to PizzaDTO for <Table />
  // try object.keys.includes
  // another way separate col headers into helper, run getColHeaders, check if data has field unique to PizzaCreateDTO, then run mapper and regenerate colHeaders.
  //
  if (typeof data === "object" && "sauceId" in data[0]) {
    data = _createDTOtoPizzaDTO(data);
  }

  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) =>
    Object.keys(obj) as (keyof T)[];
  const keys = data && data?.length > 0 ? getColHeaders(data[0]) : [];

  console.log("data: ", data);

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
              console.log("formattedData: ", formattedData);
              return (
                <td key={`${item.id}-${String(col)}`}>
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
