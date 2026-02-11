"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

// useEffect(() => {
//   gsap.fromTo(".counter",
//     { innerText: 0 },
//     {
//       innerText: 30,
//       duration: 2,
//       snap: { innerText: 1 },
//       ease: "power1.out"
//     }
//   );
// }, []);

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white h-screen flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6">
          Tradição e Tecnologia em Automação Fiscal
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Mais de 30 anos desenvolvendo sistemas robustos em Delphi com
          total conformidade fiscal.
        </p>
        <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold">
          Solicitar Demonstração
        </button>
      </motion.div>
      <section className="hero">
    <div>
        <h2>Tradição e Tecnologia</h2>
        <p>
            Com mais de três décadas de atuação, desenvolvemos sistemas robustos em Delphi,
            garantindo performance, estabilidade e total conformidade com a legislação fiscal.
        </p>
    </div>
</section>

<section>
    <div>
        <h2>Nossas Soluções</h2>
        <div>
            <div>
                <h3>NF-e</h3>
                <p>Emissão e gerenciamento completo de Nota Fiscal Eletrônica.</p>
            </div>
            <div>
                <h3>NFC-e</h3>
                <p>Solução ágil para o varejo e emissão de cupom fiscal eletrônico.</p>
            </div>
            <div>
                <h3>CT-e & MDF-e</h3>
                <p>Gestão completa para transportadoras e logística.</p>
            </div>
            <div>
                <h3>SPED Fiscal</h3>
                <p>Conformidade e integração com obrigações acessórias.</p>
            </div>
        </div>
    </div>
</section>

<section>
    <div>
        <h2>Fale com um Especialista</h2>
        <p>Descubra como podemos modernizar sua gestão fiscal.</p>
        <a href="#">Entrar em Contato</a>
    </div>
</section>

<footer>
    <div>
        <p>© 2026 Empresa de Automação Fiscal - Todos os direitos reservados</p>
    </div>
</footer>
      </section>
  );

  
}
