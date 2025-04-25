import { SauceDTO, ToppingDTO } from "../../types/data-contracts";
import { useFieldContext, useFormContext } from "./context";
import { AnyFieldApi, useStore } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em style={{ color: "red" }}>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();

  return (
    <div>
      <label htmlFor={label}>{`${label}: `}</label>
      <input
        id={label}
        name="name"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export function SauceField({
  label,
  option,
}: {
  label: string;
  option: SauceDTO;
}) {
  const field = useFieldContext<number | undefined>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <input
        name="sauce"
        type="radio"
        id={option?.name ?? ""}
        title={label}
        checked={field.state.value === option.id}
        value={option?.id}
        onChange={(e) => field.handleChange(parseInt(e.target.value))}
      />
      <label htmlFor="sauce">{option?.name}</label>
      {errors.map((error: string) => (
        <div key={error} style={{ color: "red" }}>
          {error}
        </div>
      ))}
    </div>
  );
}

export function ToppingField({
  label,
  option,
}: {
  label: string;
  option: ToppingDTO;
}) {
  const field = useFieldContext<number[]>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const toggleTopping = (e: number) => {
    field.handleChange(
      field.state.value.includes(e)
        ? field.state.value.filter((id) => id != e)
        : [...field.state.value, e]
    );
  };

  // console.log("field.state.value: ", field.state.value);

  return (
    <div>
      <input
        checked={field.state.value.includes(Number(option.id))}
        name="topping"
        type="checkbox"
        id={label}
        title={label}
        value={option?.id}
        onChange={(e) => toggleTopping(Number(e.target.value))}
      />
      <label htmlFor={label}>{option?.name}</label>
      {errors.map((error: string) => (
        <div key={error} style={{ color: "red" }}>
          {error}
        </div>
      ))}
    </div>
  );
}

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
    </form.Subscribe>
  );
}
