// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { Calendar, MessageSquare, Pill, Users } from 'lucide-react';

// const Hero: React.FC = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#313333] via-[#ecce25] to-[#155e75]">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-[rgb(16,42,67)] via-[rgb(7,112,210)] to-[rgb(71,90,97)]
// ">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full"
//             initial={{
//               x: Math.random() * window.innerWidth,
//               y: Math.random() * window.innerHeight,
//               scale: Math.random() * 0.5 + 0.5,
//             }}
//             animate={{
//               x: [
//                 Math.random() * window.innerWidth,
//                 Math.random() * window.innerWidth,
//                 Math.random() * window.innerWidth,
//               ],
//               y: [
//                 Math.random() * window.innerHeight,
//                 Math.random() * window.innerHeight,
//                 Math.random() * window.innerHeight,
//               ],
//               scale: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 1, Math.random() * 0.5 + 0.5],
//             }}
//             transition={{
//               duration: Math.random() * 20 + 20,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//             style={{
//               width: `${Math.random() * 300 + 50}px`,
//               height: `${Math.random() * 300 + 50}px`,
//               filter: 'blur(40px)',
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center"
//         >
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
//             <span className="block text-black ">सर्वे भवन्तु सुखिनः </span>
//             <span className="block bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 text-transparent bg-clip-text mt-2">
//             सर्वे सन्तु निरामयाः।
//             </span>
//           </h1>
//           <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
//           Transforming Healthcare for Rural Communities
//           Bringing accessible, secure, and AI-driven healthcare solutions to every corner.
//           </p>
//           <div className="mt-10 flex justify-center space-x-4">
//             <Link
//               to="/appointments"
//               className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 hover:opacity-90 md:py-4 md:text-lg md:px-10 shadow-lg transform transition hover:scale-105"
//             >
//               Book Appointment
//             </Link>
//             <Link
//               to="/doctors"
//               className="px-8 py-3 border border-black text-base font-medium rounded-md text-black hover:bg-white/10 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105"
//             >
//               Find Doctors
//             </Link>
//           </div>
//         </motion.div>
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MessageSquare, Pill, Users } from 'lucide-react';


const translations = [
  { sanskrit: 'सर्वे भवन्तु सुखिनः', translation: 'सर्वे सन्तु निरामयाः।' },
  { sanskrit: 'सभी सुखी रहें', translation: 'सभी निरोगी रहें।' },
  { sanskrit: 'সবাই সুখী থাকুন', translation: 'সকলেই রোগমুক্ত থাকুন।' },
  { sanskrit: 'அனைவரும் மகிழ்ச்சியாக இருப்பாராக', translation: 'அனைவரும் நோயின்றி இருப்பாராக' },
  { sanskrit: 'అందరూ సంతోషంగా ఉండాలి', translation: 'అందరూ రోగములేని జీవితం గడపాలి' },
  { sanskrit: 'ಎಲ್ಲರೂ ಸಂತೋಷವಾಗಿರಲಿ', translation: 'ಎಲ್ಲರೂ ಆರೋಗ್ಯವಾಗಿರಲಿ' },
  { sanskrit: 'എല്ലാവരും സന്തോഷവാന്മാരാകട്ടെ', translation: 'എല്ലാവരും രോഗമുക്തരാകട്ടെ' },
  { sanskrit: 'सर्व जण सुखी असोत', translation: 'सर्व जण रोगमुक्त असोत' },
  { sanskrit: 'બધા સુખી રહે', translation: 'બધા નિરોગી રહે' },
  { sanskrit: 'ਸਭ ਖੁਸ਼ ਰਹਣ', translation: 'ਸਭ ਨਿਰੋਗ ਰਹਣ' },
  { sanskrit: 'ସମସ୍ତେ ସୁଖୀ ରହନ୍ତୁ', translation: 'ସମସ୍ତେ ରୋଗମୁକ୍ତ ରହନ୍ତୁ' },
  { sanskrit: 'সকলোৱে সুখী হওক', translation: 'সকলোৱে ৰোগমুক্ত হওক' },
  { sanskrit: 'سب خوش رہیں', translation: 'سب صحت مند رہیں' },
  { sanskrit: 'सगळे सुखी असू', translation: 'सगळे निरोगी असू' },
  { sanskrit: 'सभे सुखी रहथु', translation: 'सभे निरोग रहथु' },
  { sanskrit: 'ᱛᱟᱞᱟ ᱯᱩᱞᱟ ᱠᱩᱴᱩ', translation: 'ᱛᱟᱞᱟ ᱚᱢ ᱞᱟᱠᱟᱴᱩ' },
];


const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % translations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#bd75c8df] via-[#ecce25] to-[#ccdce1]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-r  from-[rgb(255,248,231)] via-[rgb(245,239,224)] to-[rgb(237,230,212)]
" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <motion.span 
              key={index} 
              className="block text-black" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {translations[index].sanskrit}
            </motion.span>
            <motion.span
              key={`translation-${index}`}
              className="block bg-gradient-to-r from-[#2596be] via-[#1e81a0] to-[#155e75] text-transparent bg-clip-text mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {translations[index].translation}
            </motion.span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl font-bold text-[rgb(37, 150, 190)]">
            Transforming Healthcare for Rural Communities
            Bringing accessible, secure, and AI-driven healthcare solutions to every corner.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/appointments"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#2596be] via-[#1e81a0] to-[#155e75] hover:opacity-90 md:py-4 md:text-lg md:px-10 shadow-lg transform transition hover:scale-105"
            >
              Book Appointment
            </Link>
            <Link
              to="/doctors"
              className="px-8 py-3 border border-black text-base font-medium rounded-md text-black hover:bg-white/10 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105"
            >
              Find Doctors
            </Link>
          </div>
        </motion.div>

        {/* Feature cards */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Niramaya Bot",
              description: "Connect with doctors through video consultations from the comfort of your home.",
              icon: <Calendar className="h-8 w-8 text-white" />,
              color: "from-red-600 to-red-400",
            },
            {
              title: "Ayurvedic Medicines",
              description: "Search and check availability of authentic Ayurvedic medicines.",
              icon: <Pill className="h-8 w-8 text-white" />,
              color: "from-pink-600 to-pink-400",
            },
            {
              title: "Expert Doctors",
              description: "Access a network of experienced doctors specializing in various fields.",
              icon: <Users className="h-8 w-8 text-white" />,
              color: "from-orange-600 to-orange-400",
            },
            {
              title: "Health Queries",
              description: "Ask health-related questions and get answers from qualified professionals.",
              icon: <MessageSquare className="h-8 w-8 text-white" />,
              color: "from-red-500 to-pink-500",
            },
            {
              title: "One Stop Health Report",
              description: "Ask health-related questions and get answers from qualified professionals.",
              icon: <MessageSquare className="h-8 w-8 text-white" />,
              color: "from-red-500 to-pink-500",
            },

          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 rounded-xl opacity-50 blur-lg group-hover:opacity-100 transition-opacity"></div>
              <div className="relative h-full bg-gray-800 border border-gray-700 rounded-xl p-6 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center h-12 w-12 rounded-md bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-white text-center">{feature.title}</h3>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/80 p-6 rounded-xl">
                    <p className="text-gray-200 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          // className="mt-20 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
          className="mt-20 bg-[#f5f5dc]/60 backdrop-blur-lg rounded-xl p-8 border border-[#d4af37]/50"

        >
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { label: "Doctors", value: "500+" },
              { label: "Patients Served", value: "10,000+" },
              { label: "Rural Areas", value: "200+" },
              { label: "Ayurvedic Medicines", value: "1,000+" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <dt className="text-sm font-medium text-gray-400">{stat.label}</dt>
                <dd className="text-3xl font-extrabold bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;