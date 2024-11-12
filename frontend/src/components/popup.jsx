import { motion } from 'framer-motion';


const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
        duration: 0.1,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
        
      }}
    >
      <motion.div className="bg-[#bd9dcf] rounded-lg p-6 w-11/12 max-w-lg relative"
       initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01]
      }}

      
      
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Popup;
