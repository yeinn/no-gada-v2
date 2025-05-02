import Lottie from 'lottie-react';
import animationData from '@/assets/animation.json';

const DocumentLottie = () => {
  return <Lottie animationData={animationData} loop={true} className="w-full h-full" />;
};

export default DocumentLottie;
