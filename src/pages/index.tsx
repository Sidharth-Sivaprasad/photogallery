import Link from "next/link";
import { Tab } from "@headlessui/react";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import Image from "next/image";

import Car1 from "../../public/Car-1.jpg";
import Car2 from "../../public/Car-2.jpg";
import Car3 from "../../public/Car-3.jpg";
import Car4 from "../../public/Car-4.jpg";
import Car5 from "../../public/Car-5.jpg";

const tabs = [
	{
		key: "all",
		display: "All",
	},
	{
		key: "people",
		display: "People",
	},
	{
		key: "Nature",
		display: "Nature",
	},
];

export default function Home() {
	return (
		<div className="h-full bg-black bg-[url('/bottom_bg.jpg')] bg-top bg-cover overflow-auto">
			<header className="fixed top-0 flex w-full z-10  justify-between items-center h-[80px] px-10">
				<div className="">Photgraphy Portfolio</div>
				<Link
					href="#"
					className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
				>
					Get in Touch
				</Link>
			</header>
			<main className="pt-[80px]">
				<div className="h-full bg-black bg-opacity-90 flex flex-col items-center">
					<Tab.Group>
						<Tab.List className="flex items-center gap-12 ">
							{tabs.map((tab) => (
								<Tab key={tab.key} className="p-2 outline-none">
									{({ selected }) => (
										<span
											className={classNames(
												"uppercase text-lg rounded-sm ",
												selected ? "text-white  " : "text-stone-600"
											)}
										>
											{tab.display}
										</span>
									)}
								</Tab>
							))}
						</Tab.List>
						<Tab.Panels className="h-full  max-w-[900px] w-full p-2 sm:p-4 my-6">
							<Tab.Panel className="overflow-auto">
								<Masonry
									breakpointCols={2}
									className="flex gap-4"
									columnClassName=""
								>
									<Image src={Car1} alt="placeholder" className="my-5" />
									<Image src={Car2} alt="placeholder" className="my-5" />
									<Image src={Car3} alt="placeholder" className="my-5" />
									<Image src={Car4} alt="placeholder" className="my-5" />
									<Image src={Car5} alt="placeholder" className="my-5" />
									{/* <img src="/Car-1.jpg" alt="Car-1" className="my-5" />
									<img src="./Car-2.jpg" alt="Car-2" className="my-5" />
									<img src="./Car-3.jpg" alt="Car-3" className="my-5" />
									<img src="./Car-4.jpg" alt="Car-4" className="my-5" />
									<img src="./Car-5.jpg" alt="Car-5" className="my-5" /> */}
								</Masonry>
							</Tab.Panel>

							<Tab.Panel>Content 2</Tab.Panel>
							<Tab.Panel>Content 3</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</main>
			<footer className="h-[80px] flex justify-center items-center  bg-[url('/bottom_bg.jpg')] bg-bottom bg-cover uppercase text-lg font-medium">
				<p>Sidharth's Portfolio</p>
			</footer>
		</div>
	);
}
