import { PizzaDTO, Sauce, Topping } from "../types/data-contracts";
/*
export interface PizzaDTO {
  id?: number;
  name: string;
  sauce?: Sauce;
  toppings?: Topping[] | null;
}
export interface Topping {
  id?: number;
  name: string;
  calories?: number;
}
export interface Sauce {
  id?: number;
  name: string;
  isVegan?: boolean;
}
*/
export default function Table<T extends PizzaDTO | Topping | Sauce>({ data }: { data: T[] }){
  // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
  const keys = data && data?.length > 0 ? getColHeaders(data[0]) : [];

  return (
    <table>
      <thead>
        <tr>
          {
            keys.map(key => <th key={String(key)}>{key.toString().toUpperCase()}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          /*
            export interface PizzaDTO {
              id?: number;
              name: string;
              sauce?: Sauce;
              toppings?: Topping[] | null;
            }
            export interface Topping {
              id?: number;
              name: string;
              calories?: number;
            }
            export interface Sauce {
              id?: number;
              name: string;
              isVegan?: boolean;
            }
          */
          data?.map((item:T) => (
            <tr key={item.id}>
              {
                keys.map(itemKey => {
                  const formattedData = Array.isArray(item[itemKey])
                  ? item[itemKey].map(prop => prop.name).join(', ') // handle arrays (toppings)
                  : typeof item[itemKey] == 'object' && item[itemKey] !== null && 'name' in item[itemKey]
                  ? (item[itemKey] as { name: string }).name  // handle objs (sauce)
                  : item[itemKey] // handle primitive fields

                  return <td key={`${item.id}-${String(itemKey)}`}>{String(formattedData ?? 'N/A')}</td>
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}