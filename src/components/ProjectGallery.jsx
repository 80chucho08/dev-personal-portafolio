import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";

const navButton =
  "inline-flex size-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground";

/* Visor ampliado con <dialog> nativo: foco atrapado, Esc para cerrar y fondo bloqueado.
   Flechas del teclado y botones para cambiar de captura; clic fuera para cerrar. */
const Lightbox = ({ name, images, index, onIndexChange, onClose }) => {
  const dialogRef = useRef(null);
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  const go = useCallback(
    (step) => onIndexChange((index + step + total) % total),
    [index, total, onIndexChange],
  );

  const handleKeyDown = (event) => {
    if (total < 2) return;
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Capturas de ${name}`}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[min(1100px,94vw)] max-w-none overflow-visible border border-border bg-card p-0 text-foreground backdrop:bg-foreground/70"
    >
      <div className="p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {name} · {index + 1} / {total}
          </p>
          <button type="button" onClick={onClose} className={navButton} aria-label="Cerrar visor">
            <FiX aria-hidden="true" />
          </button>
        </div>

        <figure>
          <div className="flex max-h-[72vh] justify-center overflow-auto border border-border bg-background p-2">
            <img src={current.src} alt={current.caption} className="max-h-[68vh] w-auto max-w-full object-contain" />
          </div>
          <figcaption className="mt-3 text-base italic text-muted-foreground sm:text-lg">{current.caption}</figcaption>
        </figure>

        {total > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={() => go(-1)} className={navButton} aria-label="Captura anterior">
              <FiChevronLeft aria-hidden="true" />
            </button>
            <p className="font-hand text-xl text-primary">← →</p>
            <button type="button" onClick={() => go(1)} className={navButton} aria-label="Captura siguiente">
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};

/* Captura principal + miniaturas "pegadas" (si hay más de una). Clic en la principal la amplía. */
export const ProjectGallery = ({ name, images }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = images[index];
  const hasMany = images.length > 1;

  return (
    <div>
      <div className="relative border border-border bg-background p-2">
        <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group/img relative block w-full cursor-zoom-in overflow-hidden"
          aria-label={`Ampliar captura de ${name}: ${current.caption}`}
        >
          <img
            src={current.src}
            alt={current.caption}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground opacity-80 transition-opacity duration-200 group-hover/img:opacity-100"
          >
            <FiMaximize2 /> {hasMany ? `${index + 1}/${images.length}` : "ampliar"}
          </span>
        </button>
      </div>

      {hasMany && (
        <ul className="mt-3 flex gap-2" aria-label={`Capturas de ${name}`}>
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver captura ${i + 1} de ${images.length}: ${image.caption}`}
                aria-current={i === index ? "true" : undefined}
                className={`block border-2 bg-background p-0.5 transition duration-200 ${
                  i === index ? "border-primary" : "border-border opacity-70 hover:border-primary hover:opacity-100"
                }`}
              >
                <img src={image.src} alt="" loading="lazy" className="h-11 w-[4.5rem] object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Lightbox name={name} images={images} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};
