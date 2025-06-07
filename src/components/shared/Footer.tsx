import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para manejar la suscripción
    console.log("Email suscrito:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#E5E5E5] text-[#1A1A1A] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#BB1919]">Contacto</h3>
            <div className="space-y-2">
              <p>Email: informacion.lavoz@gmail.com</p>
              <p>Teléfono: (123) 456-7890</p>
              
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#BB1919]">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-[#BB1919]">Sobre Nosotros</a></li>
              <li><a href="/contact" className="hover:text-[#BB1919]">Contacto</a></li>
              <li><a href="/privacy" className="hover:text-[#BB1919]">Política de Privacidad</a></li>
              <li><a href="/terms" className="hover:text-[#BB1919]">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Suscripción */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#BB1919]">Suscríbete</h3>
            <p className="mb-4">Recibe las últimas noticias directamente en tu correo.</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[#D1D1D1] text-[#1A1A1A] placeholder:text-[#4A4A4A]"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-[#BB1919] text-white hover:bg-[#A51717]"
              >
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-[#D1D1D1] mt-8 pt-8">
          <p className="text-center text-sm text-[#4A4A4A]">
            
            © {new Date().getFullYear()} La Voz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 