import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  id: string;
  hint?: string;
  error?: string;
};

type InputFieldProps = BaseProps & {
  as?: "input";
} & InputHTMLAttributes<HTMLInputElement>;

type SelectFieldProps = BaseProps & {
  as: "select";
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

type TextareaFieldProps = BaseProps & {
  as: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

const fieldClassName =
  "w-full rounded-xl border border-lavender-100 bg-white px-4 py-3 text-sm text-foreground shadow-sm transition-all placeholder:text-foreground/35 focus:border-lavender-300 focus:outline-none focus:ring-4 focus:ring-lavender-100";

export default function FormField(props: FormFieldProps) {
  const { label, id, hint, error } = props;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground/80">
        {label}
      </label>

      {props.as === "select" ? (
        <select
          id={id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          className={`${fieldClassName} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%238b5cf6%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : props.as === "textarea" ? (
        <textarea
          id={id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          placeholder={props.placeholder}
          rows={props.rows ?? 3}
          className={fieldClassName}
        />
      ) : (
        <input
          id={id}
          name={props.name}
          type={props.type ?? "text"}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          step={props.step}
          className={fieldClassName}
        />
      )}

      {hint && !error && (
        <p className="text-xs text-foreground/45">{hint}</p>
      )}
      {error && <p className="text-xs font-medium text-pink-500">{error}</p>}
    </div>
  );
}
