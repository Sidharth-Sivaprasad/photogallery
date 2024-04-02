import type { LightGallery } from "lightgallery/lightgallery";
import LightGalleryComponent from "lightgallery/react";

import { useMemo, useRef } from "react";
import Masonry from "react-masonry-css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import { Photo } from "../types";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

type GalleryProps = {
	photos: Photo[];
};

function Gallery({ photos }: GalleryProps) {
	const lightboxRef = useRef<LightGallery | null>(null);

	const getRandomNumber = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return (
		<>
			<Masonry breakpointCols={3} className="flex gap-4" columnClassName="">
				{photos.map((photo, idx) => {
					// Call the random number generator function to get a new random number for each iteration
					const randomNumber = getRandomNumber(5, 10) * 2;

					return (
						<Image
							key={photo.src}
							src={photo.src}
							width={photo.width}
							height={photo.height}
							alt={photo.alt}
							className={`cursor-pointer transform hover:scale-105 hover:opacity-80 my-5 py-${randomNumber}`}
							blurDataURL={photo.blurdataURL}
							onClick={() => {
								lightboxRef.current?.openGallery(idx);
							}}
						/>
					);
				})}
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
				dynamicEl={photos.map((photo) => ({
					src: photo.src,
					thumb: photo.src,
				}))}
			/>
		</>
	);
}

export default Gallery;
