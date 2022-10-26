<script type="ts">
	import type { Location, TrainAnnouncement } from './TrainAnnouncement';

	export let data: {
		announcements: TrainAnnouncement[];
		locations: Record<string, { AdvertisedShortLocationName: string }>;
	};

	function hhmm(AdvertisedTimeAtLocation: string) {
		return AdvertisedTimeAtLocation?.substring(11, 16);
	}

	function names(a: Location[]) {
		return a?.map(({ LocationName }) => LocationName)?.map(name);
	}

	function name(LocationName: string) {
		return data.locations[LocationName]?.AdvertisedShortLocationName ?? LocationName;
	}

	function description(ProductInformation) {
		const description = ProductInformation?.[0]?.Description;
		return description.startsWith('SL') ? description.substring(3) : description;
	}
</script>

<h1>{data.announcements.length} inställda tåg</h1>
{#each data.announcements as { AdvertisedTimeAtLocation, FromLocation, LocationSignature, ProductInformation, ToLocation }}
	<div>
		{description(ProductInformation)}
		{names(FromLocation)}-{names(ToLocation)}
		{hhmm(AdvertisedTimeAtLocation)} från {name(LocationSignature)}
		är inställt
	</div>
{/each}

<style>
	h1,
	div {
		font-family: sans-serif;
	}
</style>
