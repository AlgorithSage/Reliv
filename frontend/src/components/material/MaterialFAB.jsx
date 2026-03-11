import { useRef, useEffect } from 'react';
import '@material/web/fab/fab.js';
import '@material/web/fab/branded-fab.js';

/**
 * MaterialFAB — React wrapper for Material Web Floating Action Button.
 *
 * @param {'surface'|'primary'|'secondary'|'tertiary'} variant - FAB color variant
 * @param {'small'|'medium'|'large'} size - FAB size
 * @param {string} label - Optional extended FAB label
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} icon - Icon element to render inside
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
export default function MaterialFAB({
  variant = 'primary',
  size = 'medium',
  label = '',
  onClick,
  icon,
  className = '',
  style = {},
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

  return (
    <md-fab
      ref={ref}
      variant={variant}
      size={size}
      label={label || undefined}
      class={className || undefined}
      style={style}
      {...rest}
    >
      {icon && <span slot="icon">{icon}</span>}
    </md-fab>
  );
}
