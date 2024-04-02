import Link from "next/link";
import { Tab } from "@headlessui/react";

import classNames from "classnames";
import Image from "next/image";

import Gallery from "../../components/Gallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import type { Photo } from "../../types";

import bg from "../../public/bottom_bg.jpg";

import { GetStaticProps } from "next";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import { getImages } from "../../utils/image-util";
import { useMemo } from "react";

// type CreateApi = ReturnType<typeof createApi>;
// type SearchPhotos = CreateApi["search"];
// type GetPhotos = SearchPhotos["getPhotos"];
// type PhotoResponse = Awaited<ReturnType<GetPhotos>>;

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
		display: "Landscape",
	},
];

type HomeProps = {
	people: Photo[];
	nature: Photo[];
};

export const getStaticProps: GetStaticProps<any> = async () => {
	const unsplash = createApi({
		accessKey: process.env.UNSPLASH_ACCESS_KEY!,
		fetch: nodeFetch as unknown as typeof fetch,
	});

	const unsplash1 = createApi({
		accessKey: process.env.UNSPLASH1_ACCESS_KEY!,
		fetch: nodeFetch as unknown as typeof fetch,
	});

	const results = await Promise.all([
		getImages(unsplash, "eiqFD4mX6Qs"),
		getImages(unsplash1, "4CucR0a6Lms"),
	]);
	return Promise.resolve({
		props: {
			people: results[0],
			nature: results[1],
		},
	});
};

export default function Home({ people, nature }: HomeProps) {
	const allPhotos = useMemo(() => {
		const all = [...people, ...nature];

		return all.sort((a, b) => b.likes - a.likes);
	}, [people, nature]);
	return (
		<div className="h-full bg-black  overflow-auto">
			<Image
				src={bg}
				alt="background-image"
				className="fixed left-0 top-0 z-0"
				placeholder="blur"
			/>

			<header className="fixed top-0 flex w-full z-30 justify-between items-center h-[80px] px-10">
				<div className="text-xl">Sid's Photography Portfolio</div>
				<Link
					href="https://www.instagram.com/sid_harth_ks/"
					className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
					target="_blank"
					rel="noopener noreferrer"
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
								<Gallery photos={allPhotos} />
							</Tab.Panel>

							<Tab.Panel className="overflow-auto">
								<Gallery photos={people} />
							</Tab.Panel>
							<Tab.Panel className="overflow-auto">
								<Gallery photos={nature} />
							</Tab.Panel>
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
