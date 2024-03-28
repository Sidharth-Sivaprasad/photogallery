import Link from "next/link";
import { Tab } from "@headlessui/react";

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
		<div className="flex flex-col h-full bg-[url('/bottom_bg.jpg')] bg-top bg-cover">
			<header className="flex justify-between items-center h-[90px] px-6">
				<div className="">Logo</div>
				<Link
					href="#"
					className="rounded-3xl bg-white text-stone-700 px-3 py-2 hover:bg-opacity-90"
				>
					Get in Touch
				</Link>
			</header>
			<main className="grow">
				<div className="h-full flex flex-col items-center bg-black">
					<Tab.Group>
						<Tab.List className="flex items-center gap-12">
							{tabs.map((tab) => (
								<Tab key={tab.key} className="p-2">
									{({ selected }) => (
										<span
											className={selected ? "text-white" : "text-stone-600"}
										>
											{tab.display}
										</span>
									)}
								</Tab>
							))}
						</Tab.List>
						<Tab.Panels className="h-full bg-stone-900 bg-opacity-40 max-w-[900px] w-full p-2 sm:p-4 my-6">
							<Tab.Panel>Content 1</Tab.Panel>
							<Tab.Panel>Content 2</Tab.Panel>
							<Tab.Panel>Content 3</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</main>
			<footer className="h-[60px] flex justify-center items-center  bg-[url('/bottom_bg.jpg')] bg-bottom bg-cover">
				<p>Sidharth's Portfolio</p>
			</footer>
		</div>
	);
}
