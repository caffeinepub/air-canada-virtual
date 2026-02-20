import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type Flight = {
    flightNumber : Text;
    origin : Text;
    destination : Text;
    aircraftType : Text;
    departureTime : Time.Time;
    arrivalTime : Time.Time;
  };

  type Reservation = {
    passengerName : Text;
    discordUsername : Text;
    robloxUsername : Text;
    flightDetails : Flight;
  };

  type CabinCrewApplication = {
    applicantName : Text;
    discordUsername : Text;
    robloxUsername : Text;
    experience : Text;
    motivation : Text;
    availability : Text;
    languages : Text;
    previousRoles : Text;
    trainingReceived : Text;
    customerServiceSkills : Text;
  };

  type AtcApplication = {
    applicantName : Text;
    discordUsername : Text;
    robloxUsername : Text;
    experience : Text;
    motivation : Text;
    preferredPosition : Text;
    availability : Text;
    understandingOfAtcProcedures : Text;
    previousRoles : Text;
  };

  type FlightStatus = {
    status : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    flights : Map.Map<Text, Flight>;
    reservationsList : List.List<Reservation>;
    cabinCrewApplicationsList : List.List<CabinCrewApplication>;
    atcApplicationsList : List.List<AtcApplication>;
  };

  type NewActor = {
    flights : Map.Map<Text, Flight>;
    reservationsList : List.List<Reservation>;
    cabinCrewApplicationsList : List.List<CabinCrewApplication>;
    atcApplicationsList : List.List<AtcApplication>;
    currentFlightStatus : ?FlightStatus;
  };

  public func run(old : OldActor) : NewActor {
    { old with currentFlightStatus = null };
  };
};
