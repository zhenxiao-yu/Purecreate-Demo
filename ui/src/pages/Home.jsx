import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';

/**
 * Home component - serves as the landing page for the PureCreate Designer Studio.
 *
 * @returns {JSX.Element} The JSX for the home page.
 */
const Home = () => {
  const snap = useSnapshot(state);

  return (
      <AnimatePresence>
        {snap.intro && (
            <motion.section
                className="home bg-gray-100 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8"
                {...slideAnimation('left')}
            >
              <motion.header
                  {...slideAnimation("down")}
              >
                <img
                    src='./threejs.png'
                    alt="PureCreate Designer Studio Logo"
                    className="w-16 h-16 object-contain"
                />
              </motion.header>

              <motion.div
                  className="home-content max-w-3xl mx-auto text-center"
                  {...headContainerAnimation}
              >
                <motion.div
                    {...headTextAnimation}
                >
                  <h1 className="head-text text-3xl sm:text-4xl xl:text-6xl text-gray-800 font-extrabold mb-4">
                    PureCreate <br className="hidden sm:block" /> Designer Studio
                  </h1>
                </motion.div>
                <motion.div
                    {...headContentAnimation}
                    className="flex flex-col items-center gap-5"
                >
                  <p className="max-w-md sm:max-w-lg font-normal text-gray-600 text-base sm:text-lg">
                    Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> and define your own style.
                  </p>

                  <CustomButton
                      type="filled"
                      title="Customize It"
                      handleClick={() => state.intro = false}
                      customStyles="w-full sm:w-fit px-6 py-3 font-bold text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  />
                </motion.div>
              </motion.div>
            </motion.section>
        )}
      </AnimatePresence>
  );
};

export default Home;