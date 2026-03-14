import { useState, useRef, useEffect } from 'react';

/**
 * MaterialButton — Refactored to custom Neomorphic interactive buttons
 * This overrides the default Material Web components to provide a consistent
 * neomorphic aesthetic with premium hover transitions across the app.
 *
 * @param {'filled'|'outlined'|'text'|'tonal'} variant - Legacy prop (mostly ignored now for unified style)
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
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Extract a meaningful primary color from inline styles
  const extractColor = (str) => {
    if (typeof str !== 'string') return null;
    const match = str.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
    if (match) {
      for (const hex of match) {
        const hexLower = hex.toLowerCase();
        if (!['#fff', '#ffffff', '#e5e7eb', '#efece9'].includes(hexLower)) {
          return hex;
        }
      }
    }
    return null;
  };

  const primaryColor = extractColor(style.backgroundColor) 
    || extractColor(style.background) 
    || extractColor(style.color) 
    || '#F06922';
  
  // Clean up styles that might conflict
  const customStyles = { ...style };
  if(customStyles['--md-filled-button-container-height']) delete customStyles['--md-filled-button-container-height'];
  if(customStyles['--md-filled-button-label-text-size']) delete customStyles['--md-filled-button-label-text-size'];
  delete customStyles.background;
  delete customStyles.backgroundColor;
  delete customStyles.color;

  // Calculate hex to rgba for shadow
  const hexToRgba = (hex, alpha) => {
    let raw = hex.replace('#', '');
    if (raw.length === 3) raw = raw.split('').map(c => c + c).join('');
    if (raw.length !== 6) return `rgba(240, 105, 34, ${alpha})`; // fallback orange
    const r = parseInt(raw.substring(0, 2), 16);
    const g = parseInt(raw.substring(2, 4), 16);
    const b = parseInt(raw.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowColor = hexToRgba(typeof primaryColor === 'string' && primaryColor.startsWith('#') ? primaryColor : '#F06922', 0.25);

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: 'none',
    borderRadius: style.borderRadius || 16,
    padding: style.padding || '16px 28px',
    fontSize: style.fontSize || 17,
    fontWeight: style.fontWeight || 700,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fontFamily: 'inherit',
    transform: isActive && !disabled ? 'translateY(0) scale(0.97)' : (isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)'),
    boxShadow: disabled 
      ? 'none' 
      : (isActive 
          ? `inset 3px 3px 8px rgba(0, 0, 0, 0.1), inset -3px -3px 8px rgba(255, 255, 255, 0.5)`
          : (isHovered 
              ? `0 8px 24px ${shadowColor}`
              : `4px 4px 10px rgba(0, 0, 0, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)`)),
    ...customStyles,
    
    // Core interaction logic overriding backgrounds/text
    background: disabled ? '#E5E7EB' : (isHovered ? primaryColor : '#FFFFFF'),
    color: disabled ? '#9CA3AF' : (isHovered ? '#FFFFFF' : primaryColor),
  };

  return (
    <button
      disabled={disabled}
      className={className}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => !disabled && setIsActive(false)}
      {...rest}
    >
      {children || label}
      {icon && <span>{icon}</span>}
    </button>
  );
}
