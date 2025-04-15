// import { useState } from "react";

// import { getPizza } from "../api/ContosoPizzaLayer"
// import { PizzaDTO } from "../types/data-contracts";

// const GetPizzaByIdForm: React.FC = () => {
//   const [pizza, setPizza] = useState<PizzaDTO>();
//   const [id, setId] = useState<number>(-1);

//   return (
//     <>
//       <form onSubmit={getPizza(id)}>
//         <label>
//           Pizza ID:
//           <input type="text" value={id} onChange={(e) => setId(parseInt(e.target.value)) } />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     </>

//   )
// }

// export default GetPizzaByIdForm;
