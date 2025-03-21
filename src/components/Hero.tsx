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

const translations =
[
  { "language": "Sanskrit", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Assamese", "part1": "সৰ্বে ভবন্তু সুখিনঃ", "part2": "সৰ্বে সন্তু নিৰাময়াঃ।" },
  { "language": "Bengali", "part1": "সর্বে ভবন্তু সুখিনঃ", "part2": "সর্বে সন্তু নিরাময়াঃ।" },
  { "language": "Bodo", "part1": "सर्वे भवंतु सुखिनः", "part2": "सर्वे संतु निरामयाः।" },
  { "language": "Dogri", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Gujarati", "part1": "સર્વે ભવન્તુ સુખિનઃ", "part2": "સર્વે સન્તુ નિરામયાઃ।" },
  { "language": "Hindi", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Kannada", "part1": "ಸರ್ವೇ ಭವಂತು ಸುಖಿನಃ", "part2": "ಸರ್ವೇ ಸಂತು ನಿರಾಮಯಾಃ।" },
  { "language": "Kashmiri", "part1": "سَروے بھَوَنتو سُکھِنَہ", "part2": "سَروے سَنتو نِرامَیَاہ۔" },
  { "language": "Konkani", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Maithili", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Malayalam", "part1": "സർവേ ഭവന്തു സുഖിനഃ", "part2": "സർവേ സന്തു നിരാമയാഃ।" },
  { "language": "Manipuri", "part1": "ꯁꯥꯔꯕꯤ ꯕꯥꯋꯟꯇꯨ ꯁꯨꯈꯤꯅꯥꯡ", "part2": "ꯁꯥꯔꯕꯤ ꯁꯟꯇꯨ ꯅꯤꯔꯥꯃꯌꯥꯡ।" },
  { "language": "Marathi", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Nepali", "part1": "सर्वे भवन्तु सुखिनः", "part2": "सर्वे सन्तु निरामयाः।" },
  { "language": "Odia", "part1": "ସର୍ବେ ଭବନ୍ତୁ ସୁଖିନଃ", "part2": "ସର୍ବେ ସନ୍ତୁ ନିରାମୟାଃ।" },
  { "language": "Punjabi", "part1": "ਸਰਵੇ ਭਵੰਤੁ ਸੁਖਿਨ੃", "part2": "ਸਰਵੇ ਸੰਤੁ ਨਿਰਾਮਯ੃।" },
  { "language": "Santali", "part1": "ᱥᱟᱨᱵᱮ ᱵᱦᱟᱣᱟᱱᱴᱩ ᱥᱩᱠᱷᱤᱱᱟᱹ", "part2": "ᱥᱟᱨᱵᱮ ᱥᱟᱱᱴᱩ ᱱᱤᱨᱟᱢᱟᱹᱭᱟ।" },
  { "language": "Sindhi", "part1": "سروے ڀونتو سکينھ", "part2": "سروے سنتو نيرامياه۔" },
  { "language": "Tamil", "part1": "சர்வே பவந்து சுகிந:", "part2": "சர்வே சந்து நிராமயா:" },
  { "language": "Telugu", "part1": "సర్వే భవంతు సుఖినః", "part2": "సర్వే సంతు నిరామయాః।" },
  { "language": "Urdu", "part1": "سروے بھونتو سکینھ", "part2": "سروے سنتو نیرامیاہ۔" }
]


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
              className="block text-black text-4xl sm:text-5xl md:text-6xl my-2 py-2" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {translations[index].part1}
            </motion.span>
            <motion.span
              key={`translation-${index}`}
              className="block p-4 text-4xl sm:text-5xl md:text-6xl my-2 bg-gradient-to-r from-[#2596be] via-[#1e81a0] to-[#155e75] text-transparent bg-clip-text mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {translations[index].part2}
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