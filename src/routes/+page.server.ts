import { error } from '@sveltejs/kit';

export async function load() {
	const locationsPromise = fetch('https://trafikverket-locations.netlify.app/geometry.json');
	const announcementsPromise = fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody(),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});

	const locationsResponse = await locationsPromise;
	const announcementsResponse = await announcementsPromise;

	if (!locationsResponse.ok) throw error(locationsResponse.status, locationsResponse.statusText);
	if (!announcementsResponse.ok)
		throw error(announcementsResponse.status, announcementsResponse.statusText);

	return {
		locations: await locationsResponse.json(),
		announcements: (await announcementsResponse.json()).RESPONSE.RESULT[0].TrainAnnouncement
	};
}

function getBody() {
	return `
<REQUEST>
    <LOGIN authenticationkey='${process.env.TRAFIKVERKET_API_KEY}'/>
    <QUERY sseurl='false' objecttype='TrainAnnouncement' schemaversion='1.6'>
        <FILTER>
            <GT name='AdvertisedTimeAtLocation' value='$dateadd(-0.01:00:00)'/>
            <LT name='AdvertisedTimeAtLocation' value='$dateadd(0.20:00:00)'/>
            <EQ name='Canceled' value='true'/>
            <EQ name='ActivityType' value='Avgang'/>
            <OR>
              <EQ name='LocationSignature' value='Mr'/>
              <EQ name='LocationSignature' value='Sub'/>
              <EQ name='LocationSignature' value='Tul'/>
            </OR>
        </FILTER>
        <INCLUDE>AdvertisedTrainIdent</INCLUDE>
        <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
        <INCLUDE>Canceled</INCLUDE>
        <INCLUDE>LocationSignature</INCLUDE>
        <INCLUDE>ProductInformation</INCLUDE>
        <INCLUDE>TimeAtLocation</INCLUDE>
        <INCLUDE>ToLocation</INCLUDE>
        <INCLUDE>FromLocation</INCLUDE>
    </QUERY>
</REQUEST>
`;
}
