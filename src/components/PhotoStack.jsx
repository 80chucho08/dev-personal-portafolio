import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Lightbox } from "@/components/Lightbox";

// Inclinación de cada foto de la pila (la primera queda al frente) y cuánto se abre al pasar el cursor.
const stackLook = [
  { rest: "-rotate-2", hover: "group-hover:-rotate-3 group-hover:-translate-y-1 group-focus-visible:-rotate-3" },
  { rest: "rotate-3 translate-x-1.5", hover: "group-hover:rotate-6 group-hover:translate-x-4 group-focus-visible:rotate-6" },
  { rest: "-rotate-6 -translate-x-1", hover: "group-hover:-rotate-12 group-hover:-translate-x-4 group-focus-visible:-rotate-12" },
];

/*
 * "Cartera" de fotos: una pila de polaroids con la cuenta de fotos. Al hacer clic se abre el visor
 * con todas (adelante/atrás + miniaturas). Las miniaturas de la pila no se piden hasta que la
 * cartera está cerca de la pantalla; las fotos grandes y la tira de miniaturas solo al abrir el visor.
 */
export const PhotoStack = ({ name, images }) => {
  const ref = useRef(null);
  const near = useInView(ref, { margin: "300px 0px", once: true });
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (images.length === 0) return null;
  const pile = images.slice(0, 3);

  return (
    <div ref={ref} className="w-full max-w-[17rem]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Abrir ${images.length === 1 ? "la foto" : `las ${images.length} fotos`} de ${name}`}
        className="group relative block aspect-[4/3] w-full cursor-pointer outline-offset-8"
      >
        {pile
          .map((image, i) => (
            <span
              key={image.src}
              className={`absolute inset-0 border border-border bg-card p-1.5 shadow-sm transition-transform duration-300 ease-out ${stackLook[i].rest} ${stackLook[i].hover}`}
              style={{ zIndex: pile.length - i }}
            >
              {i === 0 && <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />}
              {near && (
                <img
                  src={image.thumb}
                  alt=""
                  width={image.w}
                  height={image.h}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              )}
            </span>
          ))
          .reverse()}
      </button>

      <p className="mt-5 font-hand text-xl text-primary">
        {images.length === 1 ? "ver foto →" : `ver las fotos →`}
      </p>

      {open && <Lightbox name={name} images={images} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} />}
    </div>
  );
};
