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

export function NumberField({ label }: { label: number[] }){
    const field = useFieldContext<number>();

    return (
        <label>
            <div>{label}</div>
            <input value={field.state.value} onChange={e => field.handleChange(parseInt(e.target.value) ?? parseInt(e.target.value))} />
        </label>
    )
}