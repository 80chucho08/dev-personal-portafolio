import { useCallback, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const navButton =
  "inline-flex size-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-200 hover:border-primary hover:text-primary";

/*
 * Visor ampliado con <dialog> nativo: foco atrapado, Esc para cerrar y fondo bloqueado.
 * Flechas del teclado y botones para cambiar de imagen; clic fuera para cerrar.
 * Si las imágenes traen `thumb`, muestra una tira de miniaturas (que solo se descargan al abrir el visor)
 * y precarga la anterior y la siguiente para que el paso sea inmediato.
 */
export const Lightbox = ({ name, images, index, onIndexChange, onClose }) => {
  const dialogRef = useRef(null);
  const activeThumbRef = useRef(null);
  const total = images.length;
  const current = images[index];
  const hasThumbs = total > 1 && Boolean(images[0].thumb);
  const alt = current.caption ?? `${name}, foto ${index + 1} de ${total}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  const go = useCallback((step) => onIndexChange((index + step + total) % total), [index, total, onIndexChange]);

  useEffect(() => {
    // Precarga de las imágenes vecinas.
    [-1, 1].forEach((step) => {
      const neighbor = images[(index + step + total) % total];
      if (neighbor) new Image().src = neighbor.src;
    });
    activeThumbRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index, images, total]);

  const handleKeyDown = (event) => {
    if (total < 2) return;
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Fotos de ${name}`}
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
          <div className="relative flex max-h-[68vh] justify-center overflow-hidden border border-border bg-background p-2">
            <img
              key={current.src}
              src={current.src}
              alt={alt}
              width={current.w}
              height={current.h}
              decoding="async"
              className="max-h-[64vh] w-auto max-w-full object-contain"
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className={`${navButton} absolute left-3 top-1/2 -translate-y-1/2 opacity-90`}
                  aria-label="Foto anterior"
                >
                  <FiChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className={`${navButton} absolute right-3 top-1/2 -translate-y-1/2 opacity-90`}
                  aria-label="Foto siguiente"
                >
                  <FiChevronRight aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          {current.caption && (
            <figcaption className="mt-3 text-base italic text-muted-foreground sm:text-lg">{current.caption}</figcaption>
          )}
        </figure>

        {hasThumbs && (
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Todas las fotos">
            {images.map((image, i) => (
              <li key={image.src} className="shrink-0">
                <button
                  type="button"
                  ref={i === index ? activeThumbRef : null}
                  onClick={() => onIndexChange(i)}
                  aria-label={`Ver foto ${i + 1} de ${total}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`block border-2 bg-background p-0.5 transition duration-200 ${
                    i === index ? "border-primary" : "border-border opacity-70 hover:border-primary hover:opacity-100"
                  }`}
                >
                  <img src={image.thumb} alt="" loading="lazy" decoding="async" className="h-12 w-[4.5rem] object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
};
