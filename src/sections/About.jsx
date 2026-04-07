import { CardMe } from "@/components/cardMe";
export const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary drop-shadow-lg">
          <span className="text-white">Sobre </span>
          Mí
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-primary via-secondary to-highlight rounded-full flex items-center justify-center text-6xl font-bold text-primary-foreground shadow-2xl shadow-primary/20 animate-pulse">
              JD
            </div>
            <h1>jsjsj</h1>
          </div>
          <div className="md:w-2/3 space-y-6">
            <CardMe
              title="Web Development"
              description="He creado sitios web responsivos y aplicaciones web con herramientas modernas como ReactJS, TailwindCSS y Blade."
              icon="default"
            />
            <CardMe
              title="Entornos de desarrollo"
              description="Manejo entornos de desarrollo tanto en local con Linux y Windows como en la nube con AWS, Hosting mediante SSH."
              icon="monitor"
            />
            <CardMe
              title="Back-end Development"
              description="He creado sitios y aplicaciones web con FrameWorks modernos como NodeJS."
              icon="server"
            />



            <div className="flex flex-wrap gap-3 mt-8">
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                HTML5
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                CSS3
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                JavaScript
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                React
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                Node.js
              </span>
              <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 cursor-pointer">
                Git
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
