import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useRef } from "react";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import Image from "next/image";
import type { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import bg from "../../public/bottom_bg.jpg";
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

const images = [Car1, Car2, Car3, Car4, Car5];

export default function Home() {
	const lightboxRef = useRef<LightGallery | null>(null);
	return (
		<div className="h-full bg-black  overflow-auto">
			<Image
				src={bg}
				alt="background-image"
				className="fixed left-0 top-0 z-0"
				placeholder="blur"
			/>

			<header className="fixed top-0 flex w-full z-30 justify-between items-center h-[80px] px-10">
				<div className="">Photgraphy Portfolio</div>
				<Link
					href="#"
					className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
				>
					Get in Touch
				</Link>
			</header>
			<main className=" relative pt-[80px] z-20">
				<div className="h-full bg-black z-20 bg-opacity-90 flex flex-col items-center">
					<Tab.Group>
						<Tab.List className="flex items-center gap-12 z-20">
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
									{images.map((image, idx) => (
										<Image
											key={image.src}
											src={image}
											alt="placeholder"
											className="my-5 cursor-pointer transform hover:scale-105 hover:opacity-80"
											placeholder="blur"
											onClick={() => {
												lightboxRef.current?.openGallery(idx);
											}}
										/>
									))}
								</Masonry>
								<LightGalleryComponent
									onInit={(ref) => {
										if (ref) {
											lightboxRef.current = ref.instance;
										}
									}}
									speed={500}
									plugins={[lgThumbnail, lgZoom]}
									dynamic
									dynamicEl={images.map((image) => ({
										src: image.src,
										thumb: image.src,
									}))}
								/>
							</Tab.Panel>

							<Tab.Panel>Content 2</Tab.Panel>
							<Tab.Panel>Content 3</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</main>
			<footer className="relative h-[80px] flex justify-center items-center  bg-[url('/bottom_bg.jpg')] bg-bottom bg-cover uppercase text-lg font-medium z-20">
				<p>Sidharth's Portfolio</p>
			</footer>
		</div>
	);
}
