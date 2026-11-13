import { useEffect, useState } from "react";

// Servicio externo gratuito, sin cookies ni datos personales (https://abacus.jasoncameron.dev).
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "portafolio-bitacora-x9m2";
const KEY = "visitas";
const STORAGE_KEY = "visita-contada";

const readFlag = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeFlag = () => {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sin almacenamiento: se contará de nuevo en la próxima visita */
  }
};

/* Contador discreto. Suma una visita por navegador (no por recarga) y, si el servicio
   falla, no muestra nada. En desarrollo solo lee, para no inflar el número. */
export const VisitCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const shouldCount = !import.meta.env.DEV && !readFlag();
    const url = `${API}/${shouldCount ? "hit" : "get"}/${NAMESPACE}/${KEY}`;

    fetch(url, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.value !== "number") return;
        if (shouldCount) writeFlag();
        setCount(data.value);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (count === null) return null;

  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      Visitas · {count.toLocaleString("es-MX")}
    </p>
  );
};
