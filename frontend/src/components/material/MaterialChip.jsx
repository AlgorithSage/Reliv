import { useRef, useEffect } from 'react';
import '@material/web/chips/filter-chip.js';
import '@material/web/chips/assist-chip.js';
import '@material/web/chips/chip-set.js';

/**
 * MaterialChip — React wrapper for Material Web chips.
 *
 * @param {'filter'|'assist'} variant - Chip type
 * @param {string} label - Chip label text
 * @param {boolean} selected - Whether chip is selected (filter only)
 * @param {function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {React.ReactNode} icon - Optional leading icon element
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
export function MaterialChip({
  variant = 'filter',
  label = '',
  selected = false,
  onClick,
  disabled = false,
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

  const Tag = variant === 'assist' ? 'md-assist-chip' : 'md-filter-chip';

  return (
    <Tag
      ref={ref}
      label={label}
      selected={selected || undefined}
      disabled={disabled || undefined}
      class={className || undefined}
      style={style}
      {...rest}
    >
      {icon && <span slot="icon">{icon}</span>}
    </Tag>
  );
}

/**
 * MaterialChipSet — Container for organizing chips.
 *
 * @param {React.ReactNode} children - MaterialChip components
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
export function MaterialChipSet({ children, className = '', style = {} }) {
  return (
    <md-chip-set class={className || undefined} style={style}>
      {children}
    </md-chip-set>
  );
}

export default MaterialChip;
