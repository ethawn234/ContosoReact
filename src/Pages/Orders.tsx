
import GetPizzaByIdForm from "../components/PizzaById";
import Pizzas from "../components/Pizzas";
import PizzaCreate from "../components/PizzaCreate";

export default function Orders(){
    
    return (
        <>
            <PizzaCreate />
            <br />
            <Pizzas />
            <br />
            <GetPizzaByIdForm />
        </>
        
    )
}