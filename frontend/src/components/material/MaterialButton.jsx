import { useRef, useEffect } from 'react';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-tonal-button.js';

/**
 * MaterialButton — React wrapper for Material Web buttons.
 *
 * @param {'filled'|'outlined'|'text'|'tonal'} variant - Button style
 * @param {string} label - Button text
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {string} icon - Optional trailing icon name (slot="icon")
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 * @param {React.ReactNode} children - Override label with children
 */
export default function MaterialButton({
  variant = 'filled',
  label,
  disabled = false,
  onClick,
  icon,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el && onClick) {
      el.addEventListener('click', onClick);
      return () => el.removeEventListener('click', onClick);
    }
  }, [onClick]);

  const Tag = {
    filled: 'md-filled-button',
    outlined: 'md-outlined-button',
    text: 'md-text-button',
    tonal: 'md-filled-tonal-button',
  }[variant] || 'md-filled-button';

  return (
    <Tag
      ref={ref}
      disabled={disabled || undefined}
      class={className || undefined}
      style={style}
      {...rest}
    >
      {children || label}
      {icon && <span slot="icon">{icon}</span>}
    </Tag>
  );
}
