<script type="ts">
	import type { Location, TrainAnnouncement } from './TrainAnnouncement';
	export let data: { announcements: TrainAnnouncement[] };

	function hhmm(AdvertisedTimeAtLocation: string) {
		return AdvertisedTimeAtLocation?.substring(11, 16);
	}

	function name(a: Location[]) {
		return a?.map(({ LocationName }) => LocationName);
	}
</script>

<h1>{data.announcements.length} inställda tåg</h1>
{#each data.announcements as { AdvertisedTimeAtLocation, FromLocation, LocationSignature, ProductInformation, ToLocation }}
	<div>
		{ProductInformation.map(({ Description }) => Description)}
		{name(FromLocation)}-{name(ToLocation)}
		{hhmm(AdvertisedTimeAtLocation)} från {LocationSignature}
		är inställt
	</div>
{/each}

<style>
	h1 {
		font-family: sans-serif;
	}
</style>
