import { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { Lightbox } from "@/components/Lightbox";

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
