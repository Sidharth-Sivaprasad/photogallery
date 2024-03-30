import lqip from "lqip-modern";
import fetch from "node-fetch";

async function getDataUrl(url: string) {
	const imgData = await fetch(url);

	const arrayBufferData = await imgData.arrayBuffer();
	const lqipData = await lqip(Buffer.from(arrayBufferData));

	return lqipData.metadata.dataURIBase64;
}

getDataUrl(imgUrl).then();
