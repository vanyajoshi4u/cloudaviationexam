import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChapterContent {
  title: string;
  sections: { heading?: string; body: string[] }[];
}

const rtrChapters: Record<string, ChapterContent> = {
  "rtr-ch1": {
    title: "Ch 1 – Broad Guidelines & Syllabus",
    sections: [
      {
        heading: "Radio Telephone Operator (Restricted) Certificate & License Examination",
        body: [
          "Civil Aviation Requirements Section 7 – Flight Crew Standards Training and Licensing Series 'G' Part VI",
          "Radio Telephone Operator (Restricted) Certificate and License Rules 2025 interalia authorizes the Directorate General of Civil Aviation to issue directions relating to the examination, grant and extension of Radio Telephone Operator (Restricted) Certificate and Licence to personnel engaged in the operation of radio telephone or telegraph for the conduct of operation and maintenance of aircraft and associated equipment. This CAR lays down the requirements to be fulfilled by the applicant for appearing in the examination, conduct of examination and requirements for issue of Radio Telephone Operator (Restricted) Certificate and License.",
        ],
      },
      {
        heading: "RTR Examination",
        body: [
          "The Radio Telephone Operator (Restricted) Certificate and Licence examination consists of the following parts:",
          "a) Written Examination\nb) Practical Examination",
          "An applicant is required to pass both the examinations for issue of RTR Certificate and Licence, unless exempted. The candidate shall obtain Computer number from Central Examination Organization (CEO), DGCA as per requirements mentioned in Para 6 of CAR Section 7 Series B Part 1 for appearing in Radio Telephone Operator's (Restricted) written and practical examination.",
        ],
      },
      {
        heading: "Payment of Examination Fees",
        body: [
          "The requirement of Examination Fee as applicable for written examination and practical examination is stipulated in the Rule 9 of the Radio Telephone Operator (Restricted) Certificate and License Rules 2025. The mode of payment for written examination is described in the \"User Manual for RTR Certificate and License Examination\" published in pariksha.dgca.gov.in. Fee for practical examination is to be paid online through \"bharatkosh.gov.in\" on the eGCA portal.",
        ],
      },
      {
        heading: "Procedure of RTR Certificate & Licence Written Examination",
        body: [
          "The details regarding submission of online application for RTR Certificate and Licence written examination, publication of list of Admitted / Rejected Candidates, procedure of conducting Radio Telephone Operator's (Restricted) Written Examination, identification of Candidates and publication of result are available in Para 6 of CAR Section 7 Series B Part 1.",
        ],
      },
      {
        heading: "Syllabus and Pattern of Examination",
        body: [
          "The RTR Certificate and Licence written examination will be online computer based theoretical knowledge examination of 50 Multiple Choice (Objective) questions as per the syllabus prescribed in Annexure A. The examinations will be conducted in English language.",
        ],
      },
      {
        heading: "Pass Marks for Written Examination",
        body: [
          "A candidate who secures a minimum of 70% marks in the Radio Telephone Operator's (Restricted) Certificate and Licence written examination will be declared pass and will be eligible to appear in Radio Telephone Operator's (Restricted) Practical examination.",
        ],
      },
      {
        heading: "Validity of RTR",
        body: [
          "The Radio Telephone Operator's (Restricted) written examination will be valid for three years from the date of passing the written examination.",
        ],
      },
      {
        heading: "Procedure for Practical Examination",
        body: [
          "Applicant is required to register in eGCA portal on DGCA website www.dgca.gov.in.",
          "The total duration of the practical examination will be approximate 30 minutes. The practical test will comprise of practical exercise conducted over simulated environment based on flight radiotelephony in English language.",
          "The candidate will be assessed on:\n1. Practical knowledge of radiotelephone operation and procedure for different phases of flight.\n2. Ability to send correctly and to receive correctly message by radiotelephone.\n3. General knowledge of Regulations applying to radiotelephony communications and specifically of that part of those Regulations relating to the safety of life.\n4. Knowledge of the special provisions governing aeronautical fixed, mobile and radio navigation service (for aeronautical service only).",
        ],
      },
      {
        heading: "Passing Marks for Practical Examination",
        body: [
          "A candidate who secures a minimum of 50% marks in the practical Examination will be declared pass in the exam.",
        ],
      },
      {
        heading: "Result of Practical Examination",
        body: [
          "The result of the RTR practical exam will be made available to the respective candidate on his eGCA portal or registered email. The candidate will have a total of three attempts to appear for practical examination subject to the validity of his written examination after payment of requisite fees. In case, an applicant fails in all the three attempts of practical examination, he/she shall be required to re-appear in the written examination for appearing in further practical examination.",
        ],
      },
      {
        heading: "Syllabus – Regulations and Procedure",
        body: [
          "• International Telecommunication Convention and Radio Regulations.\n• General and Aeronautical 'Q' Code signals and other abbreviations as contained in Annex 10 (Vol. I & II) of ICAO.\n• General Radio-telephone Communication procedure and radio telephone communication procedure for distress, urgency and direction finding.\n• Procedure for distress communication in maritime mobile service.\n• Words and figures spelling used in radio telephony.\n• Licensing requirement of installation and operation of radio apparatus used in aircraft.\n• Minimum requirement of radio equipment to be carried on aircraft as prescribed in Annexure 6 of the ICAO and DGCA in India.\n• FIR in India and main Radio communication and Navigation facilities available together with principal frequencies to be used for communication and navigation within India.\n• Meteorological codes, Pre Flight briefing service and their usages.\n• Knowledge of notices to airmen issued by the Civil Aviation Authorities in India, as applicable to the Aeronautical mobile and Air traffic control services.",
        ],
      },
      {
        heading: "Syllabus – Radio Principles and Practice",
        body: [
          "Electrical units such as volt, Ampere, Ohm and Watt, Wavelength, frequency and their relationship.",
          "Radio frequency propagation day and night frequencies, skip distance fading ground shadow and its effect on communication choice of frequencies to attain maximum efficiency in handling air ground HF communications.",
          "System employed for air ground communications including, intercommunications and announcing system of aircraft, Radio-navigation Aids, operation of microphones and headphones, squelch, AVC, Volume control tuning of transmitter, simplex and duplex operation; advantages and disadvantages of Radio telephone communication; limitations of range due to frequency interference etc.",
        ],
      },
      {
        heading: "Syllabus – Radio Telephony",
        body: [
          "• Transfer of communications, Issue of clearance and read-back requirements, Test procedures.\n• General phraseology: Role of phraseologies and plain language, Level instructions, Position reporting, Flight plans.\n• Aerodrome control: Departure information, Engine starting procedures, Push-back, Taxi instructions, Take-off procedures, Aerodrome traffic circuit, Final approach and landing, Go around, After landing, Essential aerodrome information.\n• General ATS surveillance service phraseology: Identification and vectoring, Traffic information and avoiding action, Secondary surveillance radar, Radar assistance to aircraft with radio communications failure, Alerting phraseologies.\n• Approach control: IFR departures, VFR departures, IFR arrivals, VFR arrivals, Vectors to final approach, Surveillance radar approach, Precision radar approach.\n• Area control: Area control units, Position information, Level information, Flights joining airways, Flights leaving airways, crossing airways, Flights holding en route, ATS Surveillance, Automatic Dependent Surveillance (ADS), Oceanic control.\n• Distress and urgency procedures and communications failure procedures.\n• Transmission of meteorological and other aerodrome information: Runway Visual Range (RVR), Runway surface conditions.\n• Miscellaneous: Selective Calling (SELCAL), Fuel dumping, Wake turbulence, Wind shear, Direction finding, ACAS.",
        ],
      },
    ],
  },
  "rtr-ch2": {
    title: "Ch 2 – Definitions Related with Annex-10 Services",
    sections: [
      {
        heading: "Aeronautical Broadcasting Service",
        body: ["A broadcasting service intended for the transmission of information relating to air navigation."],
      },
      {
        heading: "Aeronautical Fixed Service",
        body: ["Telecommunication service between specified fixed points provided primarily for the safety of air navigation and for the regular, efficient and economical operation of air services."],
      },
      {
        heading: "Aeronautical Fixed Telecommunication Network (AFTN)",
        body: ["A worldwide system of aeronautical fixed circuits provided as part of the aeronautical fixed service for the exchange of messages and/or digital data between aeronautical fixed stations having the same or compatible communications characteristics."],
      },
      {
        heading: "Aeronautical Mobile Service",
        body: ["A mobile service between aeronautical stations and aircraft stations, or between aircraft stations, in which survival craft stations may participate; emergency position-indicating radio beacon stations may also participate in this service on designated distress and emergency frequencies."],
      },
      {
        heading: "Aeronautical Mobile-Satellite Service (RR S1.35)",
        body: ["A mobile satellite service in which mobile earth stations are located on board aircraft; survival craft stations and emergency position-indicating radio beacon stations may also participate in this service."],
      },
      {
        heading: "Aeronautical Mobile-Satellite Service (RR S1.36)",
        body: ["An aeronautical mobile-satellite service reserved for communications relating to safety and regularity of flights, primarily along national or international civil air routes."],
      },
      {
        heading: "Aeronautical Radio Navigation Service (RR S1.46)",
        body: [
          "A radio navigation service intended for the benefit and for the safe operation of aircraft.",
          "Note — The following Radio Regulations are quoted for reference:\n• RR S1.10 Radio navigation: Radio determination used for the purpose of navigation, including obstruction warning.\n• RR S1.9 Radio determination: The determination of the position, velocity and/or other characteristics of an object, or the obtaining of information relating to these parameters, by means of the propagation properties of radio waves.",
        ],
      },
      {
        heading: "Aeronautical Telecommunication Service",
        body: ["A telecommunication service provided for any aeronautical purpose."],
      },
      {
        heading: "International Telecommunication Service",
        body: ["A telecommunication service between offices or stations of different States, or between mobile stations which are not in the same State, or are subject to different States."],
      },
      {
        heading: "Stations",
        body: [
          "Aerodrome Control Radio Station: A station providing radio communication between an aerodrome control tower and aircraft or mobile aeronautical stations.",
          "Aeronautical Fixed Station: A station in the aeronautical fixed service.",
          "Aeronautical Station (RR S1.81): A land station in the aeronautical mobile service. In certain instances, an aeronautical station may be located, for example, on board ship or on a platform at sea.",
          "Aeronautical Telecommunication Station: A station in the aeronautical telecommunication service.",
          "AFTN Communication Center: An AFTN station whose primary function is the relay or retransmission of AFTN traffic from (or to) a number of other AFTN stations connected to it.",
          "AFTN Destination Station: An AFTN station to which messages and/or digital data are addressed for processing for delivery to the addressee.",
          "AFTN Origin Station: An AFTN station where messages and/or digital data are accepted for transmission over the AFTN.",
          "AFTN Station: A station forming part of the aeronautical fixed telecommunication network (AFTN) and operating as such under the authority or control of a State.",
          "Air-Ground Control Radio Station: An aeronautical telecommunication station having primary responsibility for handling communications pertaining to the operation and control of aircraft in a given area.",
          "Aircraft Station (RR S1.83): A mobile station in the aeronautical mobile service, other than a survival craft station, located on board an aircraft.",
          "Communication Center: An aeronautical fixed station which relays or retransmits telecommunication traffic from (or to) a number of other aeronautical fixed stations directly connected to it.",
          "Mobile Surface Station: A station in the aeronautical telecommunication service, other than an aircraft station, intended to be used while in motion or during halts at unspecified points.",
          "Network Station: An aeronautical station forming part of a radiotelephony network.",
        ],
      },
      {
        heading: "Radiotelephony & Direction Finding",
        body: [
          "Radiotelephony: A form of radio-communication primarily intended for the exchange of information in the form of speech.",
          "Radio Direction Finding (RR S1.12): Radio determination using the reception of radio waves for the purpose of determining the direction of a station or object.",
          "Radio Direction-Finding Station (RR S1.91): A radio determination station using radio direction finding. Note: The aeronautical application of radio direction finding is in the aeronautical radio navigation service.",
          "Regular Station: A station selected from those forming an en route air-ground radiotelephony network to communicate with or to intercept communications from aircraft in normal conditions.",
          "Tributary Station: An aeronautical fixed station that may receive or transmit messages and/or digital data but which does not relay except for the purpose of serving similar stations connected through it to a communication center.",
        ],
      },
      {
        heading: "Communication Methods",
        body: [
          "Air-Ground Communication: Two-way communication between aircraft and stations or locations on the surface of the earth.",
          "Air-to-Ground Communication: One-way communication from aircraft to stations or locations on the surface of the earth.",
          "Blind Transmission: A transmission from one station to another station in circumstances where two-way communication cannot be established but where it is believed that the called station is able to receive the transmission.",
          "Broadcast: A transmission of information relating to air navigation that is not addressed to a specific station or stations.",
          "Duplex: A method in which telecommunication between two stations can take place in both directions simultaneously.",
          "Ground-to-Air Communication: One-way communication from stations or locations on the surface of the earth to aircraft.",
          "Interpilot Air-to-Air Communication: Two-way communication on the designated air-to-air channel to enable necessary operational information and to facilitate the resolution of operational problems.",
          "Non-Network Communications: Radiotelephony communications conducted by a station of the aeronautical mobile service, other than those conducted as part of a radiotelephony network.",
          "Radiotelephony Network: A group of radiotelephony aeronautical stations which operate on and guard frequencies from the same family and which support each other in a defined manner to ensure maximum dependability of air-ground communications and dissemination of air-ground traffic.",
          "Readback: A procedure whereby the receiving station repeats a received message or an appropriate part thereof back to the transmitting station so as to obtain confirmation of correct reception.",
          "Simplex: A method in which telecommunication between two stations takes place in one direction at a time.",
          "Telecommunication (RR S1.3): Any transmission, emission, or reception of signs, signals, writing, images and sounds or intelligence of any nature by wire, radio, optical or other electromagnetic systems.",
        ],
      },
      {
        heading: "Direction Finding",
        body: [
          "Homing: The procedure of using the direction-finding equipment of one radio station with the emission of another radio station, where at least one of the stations is mobile, and whereby the mobile station proceeds continuously towards the other station.",
          "Radio Bearing: The angle between the apparent direction of a definite source of emission of electromagnetic waves and a reference direction, as determined at a radio direction finding station. A true radio bearing is one for which the reference direction is that of true North. A magnetic radio bearing is one for which the reference direction is that of magnetic North.",
        ],
      },
      {
        heading: "Teletypewriter Systems",
        body: [
          "Automatic Relay Installation: A teletypewriter installation where automatic equipment is used to transfer messages from incoming to outgoing circuits.",
          "Fully Automatic Relay Installation: A teletypewriter installation where interpretation of the relaying responsibility and the resultant setting up of connections is carried out automatically, obviating the need for operator intervention except for supervisory purposes.",
          "Semi-Automatic Relay Installation: A teletypewriter installation where interpretation of the relaying responsibility requires the intervention of an operator but where all other normal operations of relay are carried out automatically.",
          "Message Field: An assigned area of a message containing specified elements of data.",
          "Teletypewriter Tape: A tape on which signals are recorded in the 5-unit Start-Stop code by completely severed perforations (Chad Type) or by partially severed perforations (Chadless Type) for transmission over teletypewriter circuits.",
          "\"Torn-Tape\" Relay Installation: A teletypewriter installation where messages are received and relayed in teletypewriter tape form and where all operations of relay are performed as the result of operator intervention.",
        ],
      },
      {
        heading: "Agencies",
        body: [
          "Aeronautical Telecommunication Agency: An agency responsible for operating a station or stations in the aeronautical telecommunication service.",
          "Aircraft Operating Agency: The person, organization or enterprise engaged in, or offering to engage in, an aircraft operation.",
        ],
      },
      {
        heading: "Frequencies",
        body: [
          "Primary Frequency: The radiotelephony frequency assigned to an aircraft as a first choice for air-ground communication in a radiotelephony network.",
          "Secondary Frequency: The radiotelephony frequency assigned to an aircraft as a second choice for air-ground communication in a radiotelephony network.",
          "Frequency Channel: A continuous portion of the frequency spectrum appropriate for a transmission utilizing a specified class of emission.",
        ],
      },
      {
        heading: "Data Link Communications",
        body: [
          "Controller-Pilot Data Link Communications (CPDLC): A means of communication between controller and pilot, using data link for ATC communications.",
          "Current Data Authority: The designated ground system through which a CPDLC dialogue between a pilot and a controller currently responsible for the flight is permitted to take place.",
          "Downstream Data Authority: A designated ground system, different from the current data authority, through which the pilot can contact an appropriate ATC unit for the purposes of receiving a downstream clearance.",
          "Next Data Authority: The ground system so designated by the current data authority through which an onward transfer of communications and control can take place.",
          "Meteorological Operational Telecommunication Network: An integrated system of meteorological operational channels, as part of the aeronautical fixed service (AFS), for the exchange of aeronautical meteorological information between the aeronautical fixed stations within the network.",
          "Operational Control Communications: Communications required for the exercise of authority over the initiation, continuation, diversion or termination of a flight in the interest of the safety of the aircraft and the regularity and efficiency of a flight.",
        ],
      },
    ],
  },
  "rtr-ch3": {
    title: "Ch 3 – Definitions Related with DOC 4444, DOC 9432, AIP",
    sections: [
      {
        heading: "Aerodrome",
        body: [
          "A defined area on land or water (including any buildings, installations and equipment) intended to be used either wholly or in part for the arrival, departure and surface movement of aircraft.",
          "Note — The term \"aerodrome\" where used in the provisions relating to flight plans and ATS messages is intended to cover also sites other than aerodromes which may be used by certain types of aircraft, e.g. helicopters or balloons.",
        ],
      },
      {
        heading: "Aerodrome Elevation",
        body: ["The elevation of the highest point of the landing area."],
      },
      {
        heading: "Advisory Airspace",
        body: ["Airspace of defined dimensions, or designated route, within which air traffic advisory service is available."],
      },
      {
        heading: "Advisory Route",
        body: ["A designated route along which air traffic advisory service is available."],
      },
      {
        heading: "Aeronautical Fixed Station",
        body: ["A station in the aeronautical fixed service."],
      },
      {
        heading: "Aeronautical Information Publication (AIP)",
        body: [
          "A publication issued by or with the authority of a State (DGCA in India) and containing aeronautical information of a lasting character essential to air navigation.",
          "Note: In India AIP is published by Airports Authority of India on behalf of DGCA. AIP is a legal document, whereas Jeppeson charts etc are not a legal document, but Jeppeson charts are widely used in aviation.",
        ],
      },
      {
        heading: "Airborne Collision Avoidance System (ACAS)",
        body: ["An aircraft system based on secondary surveillance radar (SSR) transponder signals which operates independently of ground-based equipment to provide advice to the pilot on potential conflicting aircraft that are equipped with SSR transponders."],
      },
      {
        heading: "Aircraft",
        body: ["Any machine that can derive support in the atmosphere from the reactions of the air other than the reactions of the air against the earth's surface."],
      },
      {
        heading: "Aircraft Identification",
        body: ["A group of letters, figures or a combination thereof which is either identical to, or the coded equivalent of, the aircraft call sign to be used in air-ground communications, and which is used to identify the aircraft in ground-ground air traffic services communications."],
      },
      {
        heading: "Aircraft Proximity",
        body: [
          "A situation in which, in the opinion of a pilot or air traffic services personnel, the distance between aircraft as well as their relative positions and speed have been such that the safety of the aircraft involved may have been compromised. An aircraft proximity is classified as follows:",
          "Risk of collision: The risk classification of an aircraft proximity in which serious risk of collision has existed.",
          "Safety not assured: The risk classification of an aircraft proximity in which the safety of the aircraft may have been compromised.",
          "No risk of collision: The risk classification of an aircraft proximity in which no risk of collision has existed.",
          "Risk not determined: The risk classification of an aircraft proximity in which insufficient information was available to determine the risk involved, or inconclusive or conflicting evidence precluded such determination.",
        ],
      },
      {
        heading: "AIRMET Information",
        body: ["Information issued by a meteorological watch office concerning the occurrence or expected occurrence of specified en-route weather phenomena which may affect the safety of low-level aircraft operations and which was not already included in the forecast issued for low-level flights in the flight information region concerned or sub-area thereof."],
      },
      {
        heading: "AIRPROX (AIRMISS)",
        body: ["The code word used in an air traffic incident report to designate aircraft proximity."],
      },
      {
        heading: "Air-report (AIREP)",
        body: ["A report from an aircraft in flight prepared in conformity with requirements for position, and operational and/or meteorological reporting."],
      },
      {
        heading: "Air-taxiing",
        body: [
          "Movement of a helicopter/VTOL above the surface of an aerodrome, normally in ground effect and at a ground speed normally less than 37 km/h (20 kt).",
          "Note — The actual height may vary, and some helicopters may require air-taxiing above 8 m (25 ft) AGL to reduce ground effect turbulence or provide clearance for cargo sling loads.",
        ],
      },
      {
        heading: "Air Traffic",
        body: ["All aircraft in flight or operating on the manoeuvring area of an aerodrome."],
      },
      {
        heading: "Air Traffic Advisory Service",
        body: ["A service provided within advisory airspace to ensure separation, in so far as practical, between aircraft which are operating on IFR flight plans."],
      },
      {
        heading: "Air Traffic Control Clearance (ATC CLEARANCE)",
        body: [
          "Authorization for an aircraft to proceed under conditions specified by an air traffic control unit.",
          "Note 1 — For convenience, the term \"air traffic control clearance\" is frequently abbreviated to \"clearance\" when used in appropriate contexts.",
          "Note 2 — The abbreviated term \"clearance\" may be prefixed by the words \"taxi\", \"take-off\", \"departure\", \"en-route\", \"approach\" or \"landing\" to indicate the particular portion of flight to which the air traffic control clearance relates.",
        ],
      },
      {
        heading: "Air Traffic Control Instruction",
        body: ["Directives issued by air traffic control for the purpose of requiring a pilot to take a specific action. Expeditious flow of air traffic by ensuring that ATC capacity is utilized to the maximum extent possible."],
      },
      {
        heading: "Air Traffic Service (ATS)",
        body: ["A generic term meaning variously, flight information service, alerting service, air traffic advisory service, air traffic control service (area control service, approach control service or aerodrome control service). Control unit, flight information centre or air traffic services reporting office."],
      },
      {
        heading: "Airway",
        body: ["A control area or portion thereof established in the form of a corridor."],
      },
      {
        heading: "ALERFA",
        body: ["The code word used to designate an alert phase."],
      },
      {
        heading: "Alerting Service",
        body: ["A service provided to notify appropriate organizations regarding aircraft in need of search and rescue aid, and assist such organizations as required."],
      },
      {
        heading: "Alert Phase",
        body: ["A situation wherein apprehension exists as to the safety of an aircraft and its occupants."],
      },
      {
        heading: "Alternate Aerodrome",
        body: [
          "An aerodrome to which an aircraft may proceed when it becomes either impossible or inadvisable to proceed to or to land at the aerodrome of intended landing. Alternate aerodromes include the following:",
          "Take-off alternate: An alternate aerodrome at which an aircraft can land should this become necessary shortly after take-off and it is not possible to use the aerodrome of departure.",
          "En-route alternate: An aerodrome at which an aircraft would be able to land after experiencing an abnormal or emergency condition while en route.",
          "Destination alternate: An alternate aerodrome to which an aircraft may proceed should it become either impossible or inadvisable to land at the aerodrome of intended landing.",
          "Note: The aerodrome from which a flight departs may also be an en-route or a destination alternate aerodrome for that flight.",
        ],
      },
      {
        heading: "Altitude",
        body: ["The vertical distance of a level, a point or an object considered as a point, measured from mean sea level (MSL)."],
      },
      {
        heading: "Apron",
        body: ["A defined area, on a land aerodrome, intended to accommodate aircraft for purposes of loading or unloading passengers, mail or cargo, fuelling, parking or maintenance."],
      },
      {
        heading: "ATIS",
        body: ["The symbol used to designate automatic terminal information service."],
      },
      {
        heading: "ATS Route",
        body: [
          "A specified route designed for channeling the flow of traffic as necessary for the provision of air traffic services.",
          "Note 1 — The term \"ATS route\" is used to mean variously, airway, advisory route, controlled or uncontrolled route, arrival or departure route, etc.",
          "Note 2 — An ATS route is defined by route specifications which include an ATS route designator, the track to or from significant points (waypoints), distance between significant points, reporting requirements and, as determined by the appropriate ATS authority, the lowest safe altitude.",
        ],
      },
      {
        heading: "Automatic Terminal Information Service (ATIS)",
        body: [
          "The automatic provision of current, routine information to arriving and departing aircraft throughout 24 hours or a specified portion thereof.",
          "Data link-automatic terminal information service (D-ATIS): The provision of ATIS via data link.",
          "Voice-automatic terminal information service (Voice-ATIS): The provision of ATIS by means of continuous and repetitive voice broadcasts.",
        ],
      },
      {
        heading: "Ceiling",
        body: ["The height above the ground or water of the base of the lowest layer of cloud below 6 000 m (20 000 ft) covering more than half the sky."],
      },
      {
        heading: "Code (SSR)",
        body: ["The number assigned to a particular multiple pulse reply signal transmitted by a transponder in Mode A or Mode C."],
      },
      {
        heading: "Control Area",
        body: ["A controlled airspace extending upwards from a specified limit above the earth."],
      },
      {
        heading: "Controlled Aerodrome",
        body: [
          "An aerodrome at which air traffic control service is provided to aerodrome traffic.",
          "Note — The term \"controlled aerodrome\" indicates that air traffic control service is provided to aerodrome traffic but does not necessarily imply that a control zone exists.",
        ],
      },
      {
        heading: "Controlled Airspace",
        body: [
          "A controlled airspace of defined dimensions within which air traffic control service is provided in accordance with the airspace classification.",
          "Note — Controlled airspace is a generic term which covers ATS airspace Classes A, B, C, D and E as controlled airspace.",
        ],
      },
      {
        heading: "Controlled Flight",
        body: ["Any flight which is subject to an air traffic control clearance."],
      },
      {
        heading: "Control Zone",
        body: ["A controlled airspace extending upwards from the surface of the earth to a specified upper limit."],
      },
      {
        heading: "Cruising Level",
        body: ["A level maintained during a significant portion of a flight."],
      },
      {
        heading: "Decision Altitude (DA) or Decision Height (DH)",
        body: [
          "A specified altitude or height in the precision approach or approach with vertical guidance at which a missed approach must be initiated if the required visual reference to continue the approach has not been established.",
          "Note 1 — Decision altitude (DA) is referenced to mean sea level and decision height (DH) is referenced to the threshold elevation.",
          "Note 2 — The required visual reference means that section of the visual aids or of the approach area which should have been in view for sufficient time for the pilot to have made an assessment of the aircraft position and rate of change of position, in relation to the desired flight path. In Category III operations with a decision height the required visual reference is that specified for the particular procedure and operation.",
          "Note 3 — For convenience where both expressions are used they may be written in the form \"decision altitude/height\" and abbreviated \"DA/H\".",
        ],
      },
      {
        heading: "DETRESFA",
        body: ["The code word used to designate a distress phase."],
      },
      {
        heading: "Discrete Code",
        body: ["A four-digit SSR Code with the last two digits not being \"00\"."],
      },
      {
        heading: "Distress Phase",
        body: ["A situation wherein there is reasonable certainty that an aircraft and its occupants are threatened by grave and imminent danger or require immediate assistance."],
      },
      {
        heading: "Elevation",
        body: ["The vertical distance of a point or a level, on or affixed to the surface of the earth, measured from mean sea level."],
      },
      {
        heading: "Emergency Phase",
        body: ["A generic term meaning, as the case may be, uncertainty phase, alert phase or distress phase."],
      },
      {
        heading: "Estimated Elapsed Time",
        body: ["The estimated time required to proceed from one significant point to another."],
      },
      {
        heading: "Estimated Off-block Time",
        body: ["The estimated time at which the aircraft will commence movement associated with departure."],
      },
      {
        heading: "Estimated Time of Arrival",
        body: ["For IFR flights, the time at which it is estimated that the aircraft will arrive over that designated point, defined by reference to navigation aids, from which it is intended that an instrument approach procedure will be commenced, or, if no navigation aid is associated with the aerodrome, the time at which the aircraft will arrive over the aerodrome. For VFR flights, the time at which it is estimated that the aircraft will arrive over the aerodrome."],
      },
      {
        heading: "Expected Approach Time",
        body: [
          "The time at which ATC expects that an arriving aircraft, following a delay, will leave the holding point to complete its approach for a landing.",
          "Note — The actual time of leaving the holding point will depend upon the approach clearance.",
        ],
      },
      {
        heading: "Filed Flight Plan (FPL)",
        body: [
          "The flight plan as filed with an ATS unit by the pilot or a designated representative, without any subsequent changes.",
          "Note — When the word \"message\" is used as a suffix to this term, it denotes the content and format of the filed flight plan data as transmitted.",
        ],
      },
      {
        heading: "Flight Information Centre",
        body: ["A unit established to provide flight information service and alerting service."],
      },
      {
        heading: "Flight Information Region (FIR)",
        body: ["An airspace of defined dimensions within which flight information service and alerting service are provided."],
      },
      {
        heading: "Flight Information Service",
        body: ["A service provided for the purpose of giving advice and information useful for the safe and efficient conduct of flights."],
      },
      {
        heading: "Flight Level",
        body: [
          "A surface of constant atmospheric pressure which is related to a specific pressure datum, 1013.2 hectopascals (hPa), and is separated from other such surfaces by specific pressure intervals.",
          "Note 1 — A pressure type altimeter calibrated in accordance with the Standard Atmosphere:\na) When set to a QNH altimeter setting, will indicate altitude; b) when set to QFE altimeter setting, will indicate height above the QFE reference datum;\nc) When set to a pressure of 1 013.2 hPa, may be used to indicate flight levels.",
          "Note 2 — The terms \"height\" and \"altitude\", used in Note 1 above, indicate altimetric rather than geometric heights and altitudes.",
        ],
      },
      {
        heading: "Flight Visibility",
        body: ["The visibility forward from the cockpit of an aircraft in flight."],
      },
      {
        heading: "Ground Visibility",
        body: ["The visibility at an aerodrome, as reported by an accredited observer or by automatic systems."],
      },
      {
        heading: "Glide Path",
        body: ["A descent profile determined for vertical guidance during a final approach."],
      },
      {
        heading: "Heading",
        body: ["The direction in which the longitudinal axis of an aircraft is pointed, usually expressed in degrees from North (true, magnetic, compass or grid)."],
      },
      {
        heading: "Height",
        body: ["The vertical distance of a level, a point or an object considered as a point, measured from a specified datum."],
      },
      {
        heading: "Holding Point",
        body: ["A specified location, identified by visual or other means, in the vicinity of which the position of an aircraft in flight is maintained in accordance with air traffic control clearances."],
      },
      {
        heading: "Manoeuvring Area",
        body: ["That part of an aerodrome to be used for the take-off, landing and taxiing of aircraft, excluding aprons."],
      },
      {
        heading: "Movement Area",
        body: ["That part of an aerodrome to be used for the take-off, landing and taxiing of aircraft, consisting of the manoeuvring area and the apron(s)."],
      },
      {
        heading: "IFR",
        body: ["The symbol used to designate the instrument flight rules."],
      },
      {
        heading: "IFR Flight",
        body: ["A flight conducted in accordance with the instrument flight rules."],
      },
      {
        heading: "IMC",
        body: ["The symbol used to designate instrument meteorological conditions."],
      },
      {
        heading: "Instrument Meteorological Conditions (IMC)",
        body: ["Meteorological conditions expressed in terms of visibility, distance from cloud, and ceiling, less than the minima specified for visual meteorological conditions."],
      },
      {
        heading: "Landing Area",
        body: ["That part of a movement area intended for the landing or takeoff of aircraft."],
      },
      {
        heading: "Night",
        body: ["Hours between the end of evening civil twilight and the beginning of morning civil twilight or such other period between sunset and sunrise, as may be prescribed by the appropriate authority. Civil twilight ends in the evening when the centre of the sun's disc is 6 degrees below the horizon and begins in the morning when the centre of the sun's disc is 6 degrees below the horizon."],
      },
      {
        heading: "Operational Control Communications",
        body: ["Communications required for the exercise of authority over the initiation, continuation, diversion or termination of a flight in the interest of the safety of the aircraft and the regularity and efficiency of a flight."],
      },
      {
        heading: "Prohibited Area",
        body: ["An airspace of defined dimensions, above the land areas or territorial waters of a State, within which the flight of aircraft is prohibited."],
      },
      {
        heading: "Repetitive Flight Plan (RPL)",
        body: ["A flight plan related to a series of frequently recurring, regularly operated individual flights with identical basic features, submitted by an operator for retention and repetitive use by ATS units."],
      },
      {
        heading: "Reporting Point",
        body: ["A specified geographical location in relation to which the position of an aircraft can be reported."],
      },
      {
        heading: "Restricted Area",
        body: ["An airspace of defined dimensions, above the land areas or territorial waters of a State, within which the flight of aircraft is restricted in accordance with certain specified conditions."],
      },
      {
        heading: "Runway",
        body: ["A defined rectangular area on a land aerodrome prepared for the landing and take-off of Aircraft."],
      },
      {
        heading: "Runway-holding Position",
        body: ["A designated position intended to protect a runway, an obstacle limitation surface, or an ILS/MLS critical/sensitive area at which taxiing aircraft and vehicles shall stop and hold, unless otherwise authorized by the aerodrome control tower."],
      },
      {
        heading: "Runway Visual Range (RVR)",
        body: ["The RVR is the maximum distance in the direction of take-off or landing at which the runway or the specified light or markers delineating it can be seen from a height corresponding to the average eye-level of pilots at touchdown."],
      },
      {
        heading: "Signal Area",
        body: ["An area on an aerodrome used for the display of ground signals."],
      },
      {
        heading: "Special VFR Flight",
        body: ["A VFR flight cleared by air traffic control to operate within a control zone in meteorological conditions below VMC."],
      },
      {
        heading: "Taxiing",
        body: ["Movement of an aircraft on the surface of an aerodrome under its own power, excluding take-off and landing."],
      },
      {
        heading: "Taxiway",
        body: ["A defined path on a land aerodrome established for the taxiing of aircraft and intended to provide a link between one part of the aerodrome and another, including:"],
      },
      {
        heading: "Rapid Exit Taxiway",
        body: ["A taxiway connected to a runway at an acute angle and designed to allow landing aero planes to turn off at higher speeds than are achieved on other exit taxiways thereby minimizing runway occupancy times."],
      },
      {
        heading: "Track",
        body: ["The projection on the earth's surface of the path of an aircraft, the direction of which path at any point is usually expressed in degrees from North (true, magnetic or grid)."],
      },
      {
        heading: "Transition Altitude",
        body: ["The altitude at or below which the vertical position of an aircraft is controlled by reference to altitudes."],
      },
      {
        heading: "VFR",
        body: ["The symbol used to designate the visual flight rules."],
      },
      {
        heading: "VFR Flight",
        body: ["A flight conducted in accordance with the visual flight rules."],
      },
      {
        heading: "Visual Approach",
        body: ["An approach by an IFR flight when either part or all of an instrument approach procedure is not completed and the approach is executed in visual reference to terrain."],
      },
      {
        heading: "Visibility",
        body: ["Visibility for aeronautical purposes is the greater of: a) the greatest distance at which a black object of suitable dimensions, situated near the ground, can be seen and recognized when observed against a bright background; b) the greatest distance at which lights in the vicinity of 1000 candelas can be seen and identified against an unlit background."],
      },
      {
        heading: "Visual Meteorological Conditions (VMC)",
        body: ["Meteorological conditions expressed in terms of visibility, distance from cloud, and ceiling, equal to or better than specified minima."],
      },
      {
        heading: "VMC",
        body: ["The symbol used to designate visual meteorological conditions."],
      },
      {
        heading: "Automatic Telecommunication Log",
        body: ["A record of the activities of an aeronautical telecommunication station recorded by electrical or mechanical means."],
      },
      {
        heading: "Location Indicator",
        body: ["A four-letter code group formulated in accordance with rules prescribed by ICAO and assigned to the location of an aeronautical fixed station."],
      },
      {
        heading: "NOTAM",
        body: ["A notice distributed by means of telecommunication containing information concerning the establishment, condition or change in any aeronautical facility, service, procedure or hazard, the timely knowledge of which is essential to personnel concerned with flight operations."],
      },
      {
        heading: "SNOWTAM",
        body: ["A special series NOTAM notifying the presence or removal of hazardous conditions due to snow, ice, slush or standing water associated with snow, slush and ice on the movement area, by means of a specific format."],
      },
    ],
  },
  "rtr-ch18": {
    title: "Ch 18 – INS – Inertial Navigation System",
    sections: [
      {
        heading: "What is an Inertial Navigation System (INS)?",
        body: [
          "An inertial navigation system, commonly known as an INS, is an electronic system that uses a variety of environmental sensors that are able to detect and measure the change in motion of an object. Using sensor data, an inertial navigation system can determine the position of the vehicle or object relative to its starting point. This is known as dead-reckoning.",
        ],
      },
      {
        heading: "Inertial Sensors Used in an INS",
        body: [
          "There are a number of types of sensors used in inertial navigation systems, however, the two primary types are accelerometers and gyroscopes.",
          "Accelerometers can measure changes in linear velocity. As most objects can move in three-dimensional space, it is typical to use three accelerometers mounted orthogonally; that is, the axis of each accelerometer is at 90° to the others. They are usually given the labels of X-axis, Y-axis and Z-axis.",
          "Gyroscopes measure rotational velocity, and again, as most objects are free to rotate in three-dimensional space, using three gyroscope axes is typical. They are also mounted on the object orthogonally, and aligned as best possible with the three accelerometer axes.",
        ],
      },
      {
        heading: "How Does INS Work?",
        body: [
          "The system measures the aircraft's acceleration and angular velocity from a known starting point.",
          "Accelerometers detect changes in velocity along different axes.",
          "Gyroscopes measure the aircraft's angular rotation.",
          "By integrating these measurements over time, the INS calculates the current position, direction, and speed.",
        ],
      },
      {
        heading: "Key Features",
        body: [
          "Self-contained: Does not depend on external signals like GPS or radio beacons, making it useful in areas where such signals are unavailable.",
          "Continuous Navigation Data: Provides real-time position and velocity updates.",
          "Error Accumulation: Errors build up over time (called drift), so INS is usually combined with other navigation aids for correction.",
        ],
      },
      {
        heading: "Use of INS in Aviation",
        body: [
          "Commonly used in aircraft for precise navigation during flight, especially over oceans or remote areas.",
          "Supports autopilots and flight management systems by providing accurate positioning and heading data.",
          "Often integrated with GPS in modern systems to improve overall accuracy.",
        ],
      },
      {
        heading: "Summary",
        body: [
          "The INS is a vital onboard navigation tool that uses internal sensors to track an aircraft's position and movement independently, enhancing reliability and safety in flight navigation.",
        ],
      },
      {
        heading: "Types of Navigation in Aviation",
        body: [
          "Modern aviation employs several types of navigation methods, each with unique principles and uses.",
        ],
      },
      {
        heading: "1. Pilotage",
        body: [
          "Definition: Navigation by visual reference to landmarks and terrain features on the ground.",
          "How It Works: Pilots use charts and visible checkpoints (such as rivers, roads, and buildings) to determine their position and direction.",
          "Best For: Daytime flying under Visual Flight Rules (VFR), especially in areas with prominent features.",
        ],
      },
      {
        heading: "2. Dead Reckoning",
        body: [
          "Definition: Calculation of position based on a previously known position, elapsed time, speed, and heading.",
          "How It Works: Pilots plot a straight-line course ('track') from the last known position and use airspeed, wind, and estimated time to calculate current location.",
          "Use Case: Useful when visual references are sparse and provides a navigation backup.",
        ],
      },
      {
        heading: "3. Radio Navigation",
        body: [
          "Definition: Uses radio signals from ground-based stations to determine position and direction.",
          "Main Systems:",
          "• ADF (Automatic Direction Finder): Guides pilots toward or away from Non-Directional Beacons (NDBs) by showing the direction of the station relative to the aircraft's nose.",
          "• VOR/DME (VHF Omnidirectional Range/Distance Measuring Equipment): VOR provides azimuth (direction) information; DME tells the pilot their distance from the station. Allows for accurate point-to-point navigation.",
          "• RNAV (Area Navigation): Enables aircraft to navigate on any desired course within a network of navigation beacons or GPS waypoints, not just to and from ground-based stations.",
        ],
      },
      {
        heading: "4. Electronic Navigation",
        body: [
          "Definition: Relies on sophisticated electronic systems and satellites.",
          "Major Types:",
          "• Loran (Long Range Navigation): Now mostly obsolete, Loran used low-frequency radio signals from fixed transmitters to provide position fixes.",
          "• GPS (Global Positioning System): Satellite-based navigation offering precise latitude, longitude, altitude, and speed information worldwide.",
          "• Inertial Navigation: Uses accelerometers and gyroscopes (INS) to provide continuous position updates without external signals; often backed up by GPS for error correction.",
        ],
      },
      {
        heading: "5. Celestial Navigation",
        body: [
          "Definition: Determining position by observing celestial bodies (sun, moon, planets, stars).",
          "How It Works: Using a sextant and accurate timepiece, pilots (usually in oceanic or remote flight before GPS) can fix their position based on the angles of celestial bodies.",
          "Modern Use: Rare due to electronic systems but still a valuable backup for long-distance and polar flights.",
        ],
      },
      {
        heading: "Table: Overview of Navigation Types",
        body: [
          "Pilotage — Principle: Visual ground reference — Tools: Sectional charts, landmarks — Modern Use: Basic VFR, backup",
          "Dead Reckoning — Principle: Time, speed, heading — Tools: Stopwatches, compasses — Modern Use: Backup",
          "ADF — Principle: Radio direction finding — Tools: ADF/NDB — Modern Use: Limited",
          "VOR/DME/RNAV — Principle: Radio position & ranging — Tools: VOR/DME, RNAV — Modern Use: Wide",
          "Loran — Principle: Electronic timing (obsolete) — Tools: Loran-C receivers — Modern Use: Largely obsolete",
          "GPS — Principle: Satellite position fix — Tools: GPS receivers, FMS — Modern Use: Standard",
          "Inertial — Principle: Motion/rotation sensors — Tools: INS, IRS — Modern Use: Supplementary",
          "Celestial — Principle: Astronomical observations — Tools: Sextant, chronometer — Modern Use: Rare, backup",
        ],
      },
    ],
  },
};

const RtrChapter = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const chapter = chapterId ? rtrChapters[chapterId] : null;

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-aviation flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chapter not found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-aviation">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground tracking-wide">
              RTR Part 1 (DGCA)
            </span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            {chapter.title}
          </h1>
        </motion.div>

        <div className="flex flex-col gap-6">
          {chapter.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card p-5 sm:p-6"
            >
              {section.heading && (
                <h2 className="font-display text-sm sm:text-base font-semibold text-primary mb-3">
                  {section.heading}
                </h2>
              )}
              {section.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-2 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RtrChapter;
