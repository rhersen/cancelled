export interface TrainAnnouncement {
	AdvertisedTimeAtLocation: string;
	AdvertisedTrainIdent: string;
	Canceled: boolean;
	LocationSignature: string;
	ProductInformation: Description[];
	TimeAtLocation: string;
	FromLocation: Location[];
	ToLocation: Location[];
}

export interface Location {
	LocationName: string;
	Priority: number;
	Order: number;
}

export interface Description {
	Code: string;
	Description: string;
}
