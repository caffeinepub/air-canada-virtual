import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    passengerName: string;
    discordUsername: string;
    robloxUsername: string;
    flightDetails: Flight;
}
export interface FlightStatus {
    status: string;
    timestamp: Time;
}
export type Time = bigint;
export interface CabinCrewApplication {
    applicantName: string;
    previousRoles: string;
    trainingReceived: string;
    languages: string;
    customerServiceSkills: string;
    experience: string;
    availability: string;
    motivation: string;
    discordUsername: string;
    robloxUsername: string;
}
export interface Flight {
    destination: string;
    arrivalTime: Time;
    flightNumber: string;
    departureTime: Time;
    origin: string;
    aircraftType: string;
}
export interface AtcApplication {
    applicantName: string;
    previousRoles: string;
    preferredPosition: string;
    experience: string;
    availability: string;
    motivation: string;
    discordUsername: string;
    robloxUsername: string;
    understandingOfAtcProcedures: string;
}
export interface backendInterface {
    addFlight(flightNumber: string, origin: string, destination: string, aircraftType: string, departureTime: Time, arrivalTime: Time): Promise<void>;
    authenticate(password: string): Promise<void>;
    getAllAtcApplications(): Promise<Array<AtcApplication>>;
    getAllCabinCrewApplications(): Promise<Array<CabinCrewApplication>>;
    getAllFlights(): Promise<Array<Flight>>;
    getAllReservations(): Promise<Array<Reservation>>;
    getFlightStatus(): Promise<FlightStatus | null>;
    saveReservation(passengerName: string, discordUsername: string, robloxUsername: string, flightNumber: string): Promise<void>;
    setFlightStatus(status: string): Promise<void>;
    submitAtcApplication(applicantName: string, discordUsername: string, robloxUsername: string, experience: string, motivation: string, preferredPosition: string, availability: string, understandingOfAtcProcedures: string, previousRoles: string): Promise<void>;
    submitCabinCrewApplication(applicantName: string, discordUsername: string, robloxUsername: string, experience: string, motivation: string, availability: string, languages: string, previousRoles: string, trainingReceived: string, customerServiceSkills: string): Promise<void>;
}
