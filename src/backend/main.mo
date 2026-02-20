import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Int "mo:core/Int";
import List "mo:core/List";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Flight = {
    flightNumber : Text;
    origin : Text;
    destination : Text;
    aircraftType : Text;
    departureTime : Time.Time;
    arrivalTime : Time.Time;
  };

  module Flight {
    public func compareByDepartureTime(flight1 : Flight, flight2 : Flight) : Order.Order {
      Int.compare(flight1.departureTime, flight2.departureTime);
    };
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

  let flights = Map.empty<Text, Flight>();
  let reservationsList = List.empty<Reservation>();
  let cabinCrewApplicationsList = List.empty<CabinCrewApplication>();
  let atcApplicationsList = List.empty<AtcApplication>();

  var currentFlightStatus : ?FlightStatus = null;

  // Admin authentication
  public shared ({ caller }) func authenticate(password : Text) : async () {
    if (password != "Flighttime415!!") {
      Runtime.trap("Invalid Credentials. Security notified.");
    };
  };

  // Add a new flight (admin only)
  public shared ({ caller }) func addFlight(
    flightNumber : Text,
    origin : Text,
    destination : Text,
    aircraftType : Text,
    departureTime : Time.Time,
    arrivalTime : Time.Time,
  ) : async () {
    let newFlight : Flight = {
      flightNumber;
      origin;
      destination;
      aircraftType;
      departureTime;
      arrivalTime;
    };
    flights.add(flightNumber, newFlight);
  };

  // Get all flights sorted by departure time
  public query ({ caller }) func getAllFlights() : async [Flight] {
    flights.values().toArray().sort(Flight.compareByDepartureTime);
  };

  // Save flight reservation
  public shared ({ caller }) func saveReservation(
    passengerName : Text,
    discordUsername : Text,
    robloxUsername : Text,
    flightNumber : Text,
  ) : async () {
    switch (flights.get(flightNumber)) {
      case (null) { Runtime.trap("Flight not found") };
      case (?flightDetails) {
        let reservation : Reservation = {
          passengerName;
          discordUsername;
          robloxUsername;
          flightDetails;
        };
        reservationsList.add(reservation);
      };
    };
  };

  // Get all reservations
  public query ({ caller }) func getAllReservations() : async [Reservation] {
    reservationsList.toArray();
  };

  // Submit Cabin Crew application
  public shared ({ caller }) func submitCabinCrewApplication(
    applicantName : Text,
    discordUsername : Text,
    robloxUsername : Text,
    experience : Text,
    motivation : Text,
    availability : Text,
    languages : Text,
    previousRoles : Text,
    trainingReceived : Text,
    customerServiceSkills : Text,
  ) : async () {
    let application : CabinCrewApplication = {
      applicantName;
      discordUsername;
      robloxUsername;
      experience;
      motivation;
      availability;
      languages;
      previousRoles;
      trainingReceived;
      customerServiceSkills;
    };
    cabinCrewApplicationsList.add(application);
  };

  // Submit ATC application
  public shared ({ caller }) func submitAtcApplication(
    applicantName : Text,
    discordUsername : Text,
    robloxUsername : Text,
    experience : Text,
    motivation : Text,
    preferredPosition : Text,
    availability : Text,
    understandingOfAtcProcedures : Text,
    previousRoles : Text,
  ) : async () {
    let application : AtcApplication = {
      applicantName;
      discordUsername;
      robloxUsername;
      experience;
      motivation;
      preferredPosition;
      availability;
      understandingOfAtcProcedures;
      previousRoles;
    };
    atcApplicationsList.add(application);
  };

  // Get all Cabin Crew applications
  public query ({ caller }) func getAllCabinCrewApplications() : async [CabinCrewApplication] {
    cabinCrewApplicationsList.toArray();
  };

  // Get all ATC applications
  public query ({ caller }) func getAllAtcApplications() : async [AtcApplication] {
    atcApplicationsList.toArray();
  };

  // Set flight status (admin only)
  public shared ({ caller }) func setFlightStatus(status : Text) : async () {
    let newStatus : FlightStatus = {
      status;
      timestamp = Time.now();
    };
    currentFlightStatus := ?newStatus;
  };

  // Get current flight status
  public query ({ caller }) func getFlightStatus() : async ?FlightStatus {
    currentFlightStatus;
  };
};
