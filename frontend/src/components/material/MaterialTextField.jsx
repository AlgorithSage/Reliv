import { useRef, useEffect } from 'react';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/textfield/filled-text-field.js';

/**
 * MaterialTextField — React wrapper for Material Web text fields.
 *
 * @param {'outlined'|'filled'} variant - Text field style
 * @param {string} label - Floating label
 * @param {string} value - Controlled value
 * @param {function} onChange - Change handler (receives string value)
 * @param {string} type - Input type (text, tel, number, email, password)
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disabled state
 * @param {boolean} required - Required field
 * @param {string} error - Error state (truthy = has error)
 * @param {string} errorText - Supporting error text
 * @param {string} supportingText - Helper text below field
 * @param {number} maxLength - Max character length
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
export default function MaterialTextField({
  variant = 'outlined',
  label = '',
  value = '',
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  required = false,
  error = false,
  errorText = '',
  supportingText = '',
  maxLength,
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el && onChange) {
      const handler = (e) => onChange(e.target.value);
      el.addEventListener('input', handler);
      return () => el.removeEventListener('input', handler);
    }
  }, [onChange]);

  // Keep the web component in sync with React's controlled value
  useEffect(() => {
    const el = ref.current;
    if (el && el.value !== value) {
      el.value = value;
    }
  }, [value]);

  const Tag = variant === 'filled' ? 'md-filled-text-field' : 'md-outlined-text-field';

  return (
    <Tag
      ref={ref}
      label={label}
      type={type}
      placeholder={placeholder || undefined}
      disabled={disabled || undefined}
      required={required || undefined}
      error={error || undefined}
      error-text={errorText || undefined}
      supporting-text={supportingText || undefined}
      maxlength={maxLength || undefined}
      value={value}
      class={className || undefined}
      style={style}
      {...rest}
    />
  );
}
