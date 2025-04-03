import { useFieldContext } from "./context";
import { useStore } from '@tanstack/react-form';

// function FieldInfo({ field }: { field: AnyFieldApi }) {
//   return (
//     <>
//       {field.state.meta.isTouched && field.state.meta.errors.length ? (
//         <em>{field.state.meta.errors.join(',')}</em>
//       ) : null}
//       {field.state.meta.isValidating ? 'Validating...' : null}
//     </>
//   )
// }
export function TextField({ label }: { label: string }){
    const field = useFieldContext<string>();
    const errors = useStore(field.store, state => state.meta.errors)
    
    return (
        <div>
            <label>
            <div>{label}</div>
            <input 
                value={field.state.value} 
                onChange={e => field.handleChange(e.target.value)} 
            />
            </label>
            {
                errors.map((error: string) => (
                    <div key={error} style={{ color: 'red' }}>{error}</div>
                ))
            }
        </div>
        
    )
}

export function RadioField({ label, sauce }: { label: string, sauce: SauceDTO }){
    const field = useFieldContext<string>();
    const errors = useStore(field.store, state => state.meta.errors);
    console.log('sauce: ', sauce)
    // label is not correctly rendered
    // value should hold sauce id
    // onChange should add to PizzaCreateDTO?
    console.log('field: ', field)
    console.log('errors: ', errors)
    console.log('label: ', label)
    return (
        <div>
            <label htmlFor={label}>
            <input type="checkbox" value={label} onChange={e => field.handleChange(e.target.value)} />
            <label htmlFor={sauce.id?.toString()}>
            {/* <div>{label}</div> */}
            <input type="checkbox" id={sauce.id?.toString()} title={label} value={'sauce.id'} onChange={e => field.handleChange(e.target.value)} />
            </label>
            {
                errors.map((error: string) => (
                    <div key={error} style={{ color: 'red' }}>{error}</div>
                ))
            }
        </div>
    )
}

export function NumberField({ label }: { label: number[] }){
    const field = useFieldContext<number>();

    return (
        <label>
            <div>{label}</div>
            <input value={field.state.value} onChange={e => field.handleChange(parseInt(e.target.value) ?? parseInt(e.target.value))} />
        </label>
    )
}

export function SubscribeButton({ label }: { label: string }){
    const form = useFormContext()

    return (
        <form.Subscribe selector={state => state.isSubmitting}>
            {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
        </form.Subscribe>
    )
}