import { SauceDTO, ToppingDTO } from "../../types/data-contracts";
import { useFieldContext, useFormContext } from "./context";
import { AnyFieldApi, useStore } from '@tanstack/react-form';

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em style={{ color: 'red' }}>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export function TextField({ label }: { label: string }){
    const field = useFieldContext<string>();
    // const errors = useStore(field.store, state => state.meta.errors)
    
    return (
        <div>
            <label htmlFor={label}>{`${label}: `}</label>
            <input
                id={label}
                value={field.state.value} 
                onChange={e => field.handleChange(e.target.value)} 
            />
            <FieldInfo field={field} />
        </div>
        
    )
}

export function RadioField({ label, option }: { label: string, option: SauceDTO | ToppingDTO }){
    const field = useFieldContext<number>();
    const errors = useStore(field.store, state => state.meta.errors);
    console.log('option: ', option)
    console.log('label: ', label)
    const optionType = 'isVegan' in option ? option?.toString() : label
    console.log('optionType: ', optionType)

    return (
        <div>
            <input name={'isVegan' in option ? option?.toString() : label} type="radio" id={option?.name ?? ''} title={label} checked={field.state.value === option.id} value={option?.id} onChange={e => field.handleChange(parseInt(e.target.value))} />
            <label htmlFor={option?.name}>{option?.name}</label>
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