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
