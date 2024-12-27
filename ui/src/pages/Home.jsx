import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { FaRocket, FaPalette, FaMagic, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
      <AnimatePresence>
        {snap.intro && (
            <motion.section
                key="home"
                className="home bg-gradient-to-br from-gray-100 to-white min-h-screen overflow-y-scroll flex flex-col justify-center items-center px-4 sm:px-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideAnimation("left")}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Hero Section */}
              <motion.header
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideAnimation("down")}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full flex justify-center py-4"
              >
                <img
                    src="./threejs.png"
                    alt="PureCreate Designer Studio Logo"
                    className="w-10 sm:w-14 h-10 sm:h-14 object-contain"
                />
              </motion.header>

              <motion.div
                  className="home-content max-w-screen-xl mx-auto text-center px-4"
                  variants={headContainerAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <motion.div
                    variants={headTextAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h1 className="head-text text-3xl sm:text-4xl lg:text-5xl text-gray-900 font-extrabold mb-4 sm:mb-6">
                    PureCreate <br className="hidden sm:block" /> Designer Studio
                  </h1>
                </motion.div>
                <motion.div
                    variants={headContentAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-4 sm:gap-5"
                >
                  <p className="max-w-2xl font-medium text-gray-700 text-sm sm:text-base leading-snug sm:leading-relaxed">
                    Welcome to a world of endless possibilities. <strong>Unleash your imagination</strong> with cutting-edge 3D design tools, a collaborative platform, and unparalleled customization options.
                  </p>
                  <CustomButton
                      type="filled"
                      title="Start Designing"
                      handleClick={() => (state.intro = false)}
                      customStyles="w-full sm:w-fit px-4 py-2 sm:px-6 sm:py-3 font-bold text-sm sm:text-base bg-black text-white hover:bg-gray-800 transition-all duration-200 rounded-full"
                  />
                </motion.div>
              </motion.div>

              {/* Features Section */}
              <motion.section
                  className="features mt-6 bg-gray-50 py-12 px-4 sm:px-8 lg:px-16 w-full text-center shadow-inner"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideAnimation("up")}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Why Choose PureCreate?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  <FeatureCard
                      title="Intuitive Interface"
                      description="Navigate effortlessly with tools designed for users of all levels."
                      icon={<FaPalette className="text-gray-900 w-8 h-8" />}
                  />
                  <FeatureCard
                      title="Professional Quality"
                      description="Achieve high-resolution results tailored for any purpose."
                      icon={<FaRocket className="text-gray-900 w-8 h-8" />}
                  />
                  <FeatureCard
                      title="Unlimited Creativity"
                      description="Transform your ideas into reality without boundaries."
                      icon={<FaMagic className="text-gray-900 w-8 h-8" />}
                  />
                </div>
              </motion.section>

              {/* User Profile Section */}
              <motion.section
                  className="user-profile bg-gradient-to-tl from-gray-50 to-white py-6 w-full text-center"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideAnimation("up")}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div
                    className="profile-header flex justify-between items-center px-4 sm:px-8 lg:px-16 cursor-pointer"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
                    My Purecreate Profile
                  </h2>
                  {isProfileOpen ? (
                      <FaChevronUp className="text-gray-900 w-6 h-6" />
                  ) : (
                      <FaChevronDown className="text-gray-900 w-6 h-6" />
                  )}
                </div>
                <AnimatePresence>
                  {isProfileOpen && (
                      <motion.div
                          className="profile-card mx-auto p-6 bg-gray-50 border border-gray-300 shadow-md rounded-lg max-w-md mt-5"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={slideAnimation("up")}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <img
                            src="https://img.freepik.com/premium-psd/western-man-meta-people-3d-avatar_698091-355.jpg"
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full mx-auto mb-4 shadow"
                        />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Welcome back, M4rkyu!
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Continue creating amazing designs or explore new features
                          today. Manage your projects effortlessly with your
                          PureCreate ID.
                        </p>
                        <div className="flex justify-center gap-4">
                          <CustomButton
                              type="outline"
                              title="Profile"
                              handleClick={() => console.log("Profile")}
                              customStyles="px-4 sm:px-6 py-2 border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-full"
                          />
                          <CustomButton
                              type="filled"
                              title="Connect"
                              handleClick={() => console.log("Connect")}
                              customStyles="px-4 sm:px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-full"
                          />
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>

              {/* Footer */}
              <footer className="footer bg-gray-900 text-gray-300 py-4 px-4 sm:px-6 w-full text-center mt-8 sm:mt-12">
                <p className="text-sm">
                  &copy; {new Date().getFullYear()} PureCreate Designer Studio. All
                  rights reserved.
                </p>
              </footer>
            </motion.section>
        )}
      </AnimatePresence>
  );
};

const FeatureCard = ({ title, description, icon }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="feature-card p-6 bg-white border border-gray-200 shadow-md rounded-lg w-64 sm:w-72 flex flex-col items-center gap-4"
    >
      {icon}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base text-center">
        {description}
      </p>
    </motion.div>
);

export default Home;
