<script type="ts">
	import type { Description, Location, TrainAnnouncement } from './TrainAnnouncement';

	export let data: {
		announcements: TrainAnnouncement[];
		locations: Record<string, { AdvertisedShortLocationName: string }>;
	};

	function hhmm(time: string) {
		return time?.substring(11, 16);
	}

	function names(a: Location[]) {
		return a?.map(({ LocationName }) => LocationName)?.map(name);
	}

	function name(signature: string) {
		return data.locations[signature]?.AdvertisedShortLocationName ?? signature;
	}

	function description([{ Description }]: Description[]) {
		return Description.startsWith('SL ') ? Description.substring(3) : Description;
	}
</script>

<h1>{data.announcements.length} inställda tåg</h1>
{#each data.announcements as { AdvertisedTimeAtLocation,AdvertisedTrainIdent, FromLocation, LocationSignature, ProductInformation, ToLocation }}
	<div>
		{description(ProductInformation)}
		{AdvertisedTrainIdent}
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
