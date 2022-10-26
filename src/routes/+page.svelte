<script type="ts">
	import type { Location, TrainAnnouncement } from './TrainAnnouncement';
	export let data: { announcements: TrainAnnouncement[] };

	function hhmm(AdvertisedTimeAtLocation: string) {
		return AdvertisedTimeAtLocation?.substring(11, 16);
	}

	function from(s: string) {
		switch (s) {
			case 'Tul':
				return 'Tullinge';
			case 'Mr':
				return 'Märsta';
			case 'Söc':
				return 'Södertälje';
			default:
				return s;
		}
	}

	function to(a: Location[]) {
		return a?.map(({ LocationName }) => from(LocationName));
	}
</script>

<h1>{data.announcements.length} inställda tåg</h1>
{#each data.announcements as { AdvertisedTrainIdent, AdvertisedTimeAtLocation, LocationSignature, ToLocation }}
	<div>
		{AdvertisedTrainIdent}
		{hhmm(AdvertisedTimeAtLocation)} från {from(LocationSignature)} till {to(ToLocation)}
		är inställt
	</div>
{/each}
