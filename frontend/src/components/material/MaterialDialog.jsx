import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import '@material/web/dialog/dialog.js';

/**
 * MaterialDialog — React wrapper for Material Web dialog.
 *
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Called when dialog closes (reason: 'cancel' or 'confirm')
 * @param {string} headline - Dialog title
 * @param {React.ReactNode} children - Dialog body content
 * @param {React.ReactNode} actions - Dialog action buttons (footer)
 * @param {string} className - Additional CSS class
 * @param {object} style - Additional inline styles
 */
const MaterialDialog = forwardRef(function MaterialDialog({
  open = false,
  onClose,
  headline = '',
  children,
  actions,
  className = '',
  style = {},
}, forwardedRef) {
  const ref = useRef(null);

  useImperativeHandle(forwardedRef, () => ref.current, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) {
      el.show();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (el && onClose) {
      const handler = (e) => onClose(e.detail?.returnValue || 'cancel');
      el.addEventListener('close', handler);
      return () => el.removeEventListener('close', handler);
    }
  }, [onClose]);

  return (
    <md-dialog
      ref={ref}
      class={className || undefined}
      style={style}
    >
      {headline && <div slot="headline">{headline}</div>}
      <div slot="content">
        {children}
      </div>
      {actions && (
        <div slot="actions">
          {actions}
        </div>
      )}
    </md-dialog>
  );
});

export default MaterialDialog;
