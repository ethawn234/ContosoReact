
import GetPizzaByIdForm from "../components/PizzaById";
import Pizzas from "../components/Pizzas";
import PizzaCreate from "../components/PizzaCreate";
import Toppings from "../components/Toppings";
import Sauces from "../components/Sauces";

export default function Orders(){
    
    return (
        <>
            <PizzaCreate />
            <br />
            <Pizzas />
            <br />
            <GetPizzaByIdForm />
            <br />
            <Toppings />
            <br />
            <Sauces />
        </>
        
    )
}