import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./dashboardComponents.module.css";

interface DialogProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}

export function Dialog({ title, onClose, children, wide = false }: DialogProps) {
  useEffect(() => {
    const dismiss = (event: KeyboardEvent): void => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [onClose]);

  return (
    <div className={styles.dialogBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={`${styles.dialog} ${wide ? styles.dialogWide : ""}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header className={styles.dialogHeader}><h2 id="dialog-title">{title}</h2><button type="button" className={styles.iconButton} aria-label="Close dialog" onClick={onClose}><X size={17} /></button></header>
        <div className={styles.dialogBody}>{children}</div>
      </section>
    </div>
  );
}