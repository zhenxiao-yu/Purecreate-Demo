import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { CustomButton } from "../components";
import state from "../store";
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from "../config/motion";

const Home = () => {
	const snap = useSnapshot(state);

	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section className="home" {...slideAnimation("left")}>
					<motion.header {...slideAnimation("down")}>
						<a
							href="https://samarth-portfolio-website.000webhostapp.com"
							target="_blank"
						>
							<img
								src="./apple-touch-icon.png"
								alt="logo"
								className="w-12 h-12 object-contain"
							/>
						</a>
					</motion.header>

					<motion.div className="home-content" {...headContainerAnimation}>
						<motion.div {...headTextAnimation}>
							<h1 className="head-text">
								LET'S <br className="x1:block hidden" />DO IT.
							</h1>
						</motion.div>

						<motion.div
							{...headContentAnimation}
							className="flex flex-col gap-6"
						>
							<h3 className="max-w-md font-medium text-black-600 text-xl">
								Create your unique and exclusive shirt with our brand-new 3D
								Shirt Designer Web Application.{" "}
								<strong className="font-black">Unleash your imagination</strong>{" "}
								and define your own style.
							</h3>

							<CustomButton
								type="filled"
								title="Customize It"
								handleClick={() => (state.intro = false)}
								customStyles="w-fit px-4 py-2.5 font-bold text-sm"
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Home;
