import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import carro1 from "../assets/carro1.jpg";
import carro2 from "../assets/carro2.jpg";
import carro3 from "../assets/carro3.jpg";
import carro4 from "../assets/carro4.jpg";
import carro5 from "../assets/carro5.jpg";

const images = [carro1, carro2, carro3, carro4, carro5];

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Muda a imagem a cada 7 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.8) 100%), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)", // Adiciona o desfoque
            transition: "background-image 1s ease-in-out", // Transição suave
            zIndex: -1          // Garante que o fundo fique atrás de outros elementos
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundSlider;
