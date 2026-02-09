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
    </section>
  );

  
}
