import { PrimaryButton } from "../components/PrimaryButton";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Contacta<span className="text-primary">Me</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="glass rounded-[2rem] border border-white/10 bg-surface/70 p-8 shadow-2xl shadow-primary/10">
            <h3 className="text-3xl font-semibold text-foreground mb-6">Estoy disponible</h3>
            <p className="text-slate-300 leading-8 mb-8">
              Si quieres trabajar conmigo o tienes alguna duda, escríbeme. Estoy atento a nuevas oportunidades y proyectos desafiantes.
            </p>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-secondary/80 mb-2">Email</p>
                <p className="text-lg font-medium text-foreground">hola@tudominio.com</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-secondary/80 mb-2">Ubicación</p>
                <p className="text-lg font-medium text-foreground">Ciudad, País</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-secondary/80 mb-2">Teléfono</p>
                <p className="text-lg font-medium text-foreground">+57 300 000 0000</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-[2rem] border border-white/10 bg-surface/70 p-8 shadow-2xl shadow-primary/10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Redes profesionales</h3>
              <p className="text-slate-300 leading-7 mb-6">
                Conecta conmigo en GitHub y LinkedIn para ver mis proyectos, mi trabajo y mi actividad profesional.
              </p>

              <div className="flex flex-col gap-4">
                <PrimaryButton
                  href="https://github.com/tu-usuario"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  className="w-full"
                >
                  GitHub
                </PrimaryButton>
                <PrimaryButton
                  href="https://linkedin.com/in/tu-usuario"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="w-full"
                >
                  LinkedIn
                </PrimaryButton>
              </div>
            </div>

            <div className="glass rounded-[2rem] border border-white/10 bg-surface/70 p-8 shadow-2xl shadow-primary/10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">¿Quieres un mensaje rápido?</h3>
              <p className="text-slate-300 leading-7 mb-6">
                Envía un correo con una descripción breve de tu proyecto y te responderé lo antes posible.
              </p>
              <PrimaryButton
                href="mailto:hola@tudominio.com"
                variant="glass"
                className="w-full"
              >
                Enviar email
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};