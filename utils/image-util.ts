import { createApi } from "unsplash-js";
import { Photo } from "../types";
import lqip from "lqip-modern";

async function getDataUrl(url: string) {
	const imgData = await fetch(url);

	const arrayBufferData = await imgData.arrayBuffer();
	const lqipData = await lqip(Buffer.from(arrayBufferData));

	return lqipData.metadata.dataURIBase64;
}

export async function getImages(
	cli: ReturnType<typeof createApi>,
	collectionId: string
): Promise<Photo[]> {
	const mappedPhotos: Photo[] = [];

	const photos = await cli.collections.getPhotos({ collectionId });
	// const photos = await cli.photos.getRandom({
	// 	count: 10,
	// 	query,
	// });

	if (photos.type === "success") {
		// const responseArr = Array.isArray(photos.response)
		// 	? photos.response
		// 	: [photos.response];

		const photosArr = photos.response.results.map((photos, idx) => ({
			src: photos.urls.full,
			thumb: photos.urls.thumb,
			width: photos.width,
			height: photos.height,
			alt: photos.alt_description ?? `people img - ${idx}`,
		}));

		const ArrwithUrl: Photo[] = [];

		for (const photo of photosArr) {
			const blurdataURL = await getDataUrl(photo.src);
			ArrwithUrl.push({ ...photo, blurdataURL });
		}
		mappedPhotos.push(...ArrwithUrl);
	} else {
		console.log("Could not get photos");
	}

	return mappedPhotos;
}
