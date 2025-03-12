import { useState } from "react";
import { PizzaDTO } from "../types/data-contracts";
import { getPizza } from "../api/ContosoPizzaLayer";

function PizzaById(){
    const [pizza, setPizza] = useState<PizzaDTO>();
    const [id, setId] = useState<number>();
    console.log(pizza)
    async function fetchPizza(id: number){
        console.log('Id before call: ', id)
        if(id){
            const data = await getPizza(id);
            console.log('data: ', data)
            if(data.data) {
                setPizza(data.data);
            }
        }
    }
    // useEffect(() => {
    //     fetchPizza()
    // });

    // Helper function to extract keys from a generic type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getColHeaders = <T extends Record<string, any>>(obj: T) => Object.keys(obj) as (keyof T)[];
  const pizzaKeys = pizza ? getColHeaders(pizza) : [];

    return (
        <>
        <form>
            <label>
                Pizza ID
                <input type="number" value={id} onChange={e => !Number.isNaN(e.target.value) && setId(parseInt(e.target.value))} />
                <button onClick={() => id > 0 && fetchPizza(id)}>Get Pizza</button>
            </label>
        </form>
            {
                !pizza ?
                <p>Pizza not Found!</p>
                :
                (
                    <table>
                        <thead>
                            <tr>
                                { pizzaKeys.map(key => <th key={key}>{key.toString().toUpperCase()}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={pizza.id}>
                                {
                                    pizzaKeys.map(key => (
                                        <td key={key}>{String(pizza[key])}</td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default PizzaById
