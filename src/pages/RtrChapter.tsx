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
