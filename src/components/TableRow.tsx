
import { PizzaDTO } from "../types/data-contracts";

export default function TableRow({ data, pizzaKeys }: { data: PizzaDTO; pizzaKeys: (keyof PizzaDTO)[]; }){
    return (
        <>
          {
            pizzaKeys.map(key => {
              const pizza = Array.isArray(data[key])
              ? data[key].map(prop => prop.name).join(', ') // for topping names
              : typeof data[key] == 'object' 
              ? data[key]?.name // for sauce name
              : data[key];

              return (
                <td key={`${data.id}-${key}`}>{String(pizza ?? null)}</td>
              )
            })
          }
          
        </>
    )
}
