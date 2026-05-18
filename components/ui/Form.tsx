import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ label, htmlFor, required, helper, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-caption font-medium text-navy">
        {label}
        {required && <span className="ml-1 text-teal" aria-hidden="true">*</span>}
      </label>
      {children}
      {helper && !error && <p className="text-[12px] text-mute">{helper}</p>}
      {error && <p className="text-[13px] text-error" role="alert">{error}</p>}
    </div>
  );
}

const fieldBase =
  'h-[52px] px-4 bg-offwhite text-ink text-body border border-hairline focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors duration-200 ease-calm placeholder:text-mute/60';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  helper?: string;
  error?: string;
  className?: string;
}

export function TextField({ label, helper, error, required, className, id, ...rest }: TextFieldProps) {
  const fieldId = id || `field-${rest.name}`;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} helper={helper} error={error}>
      <input
        id={fieldId}
        required={required}
        className={cn(fieldBase, error && 'border-error', className)}
        {...rest}
      />
    </FieldShell>
  );
}

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  helper?: string;
  error?: string;
  className?: string;
}

export function TextArea({ label, helper, error, required, className, id, rows = 4, ...rest }: TextAreaProps) {
  const fieldId = id || `field-${rest.name}`;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} helper={helper} error={error}>
      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        className={cn(
          'px-4 py-3 bg-offwhite text-ink text-body border border-hairline focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-colors duration-200 ease-calm placeholder:text-mute/60 resize-y',
          error && 'border-error',
          className
        )}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string;
  helper?: string;
  error?: string;
  className?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export function SelectField({
  label,
  helper,
  error,
  required,
  className,
  id,
  options,
  placeholder,
  ...rest
}: SelectFieldProps) {
  const fieldId = id || `field-${rest.name}`;
  return (
    <FieldShell label={label} htmlFor={fieldId} required={required} helper={helper} error={error}>
      <div className="relative">
        <select
          id={fieldId}
          required={required}
          defaultValue=""
          className={cn(
            fieldBase,
            'w-full appearance-none pr-12 cursor-pointer',
            error && 'border-error',
            className
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldShell>
  );
}
