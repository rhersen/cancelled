import { error } from '@sveltejs/kit';
import type { TrainAnnouncement } from './TrainAnnouncement';

export async function load() {
	const response = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
		method: 'POST',
		body: getBody(),
		headers: {
			'Content-Type': 'application/xml',
			Accept: 'application/json'
		}
	});

	if (!response.ok) throw error(response.status, response.statusText);

	const data = await response.json();
	const [body] = data.RESPONSE.RESULT;
	const announcements: TrainAnnouncement[] = body.TrainAnnouncement;
	return { announcements };
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
