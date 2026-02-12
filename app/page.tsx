"use client";

import { motion } from "framer-motion";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
})

export default function Hero() {
    return (<section>
        <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white h-screen flex items-center justify-center text-center px-6">
            <motion.div 
            initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
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

        <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white h-screen flex items-center justify-center text-center px-6">
            <div>
            <h2 className="text">Tradição e Tecnologia</h2>
            <p>
                Com mais de três décadas de atuação, desenvolvemos sistemas robustos em Delphi,
                garantindo performance, estabilidade e total conformidade com a legislação fiscal.
            </p>
            </div>
        </section>
        <div className="gradient"><br></br></div>
<h2 className="content tittle">Nossas Soluções</h2>
        <section className="content"> 
        <div className="cards">
            <div className="card">
                <h3 className="bolder">NF-e</h3>
                <p>Emissão e gerenciamento completo de Nota Fiscal Eletrônica.</p>
            </div>
            <div className="card">
                <h3 className="bolder">NFC-e</h3>
                <p>Solução ágil para o varejo e emissão de cupom fiscal eletrônico.</p>
            </div>
            <div className="card">
                <h3 className="bolder">CT-e & MDF-e</h3>
                <p>Gestão completa para transportadoras e logística.</p>
            </div>
            <div className="card">
                <h3 className="bolder">SPED Fiscal</h3>
                <p>Conformidade e integração com obrigações acessórias.</p>
            </div>
        </div>
</section>
        </section>
    );
}