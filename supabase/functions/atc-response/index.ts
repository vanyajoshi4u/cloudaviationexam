import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { pilotMessage, scenarioId, scenarioContext, flightInfo, frequencies, squawk, currentQuestion } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a realistic ATC (Air Traffic Controller) examiner for the DGCA RTR Part 2 examination in India. You respond ONLY as ATC/Ground/Tower/Approach/Control stations.

CRITICAL RULES:
- Respond ONLY with realistic ATC phraseology as per ICAO standards and Indian ATC practices.
- Keep responses concise and professional, exactly as a real ATC would respond.
- Use proper RT call signs, readbacks, and clearances.
- Match the station being communicated with (SMC, Tower, Approach, Area Control).
- Use the correct frequencies when instructing frequency changes.
- Include weather info, QNH, runway info when appropriate.
- If the pilot's transmission is unclear or incorrect, ask them to "Say again" or correct their phraseology.

CURRENT SCENARIO CONTEXT:
Scenario ${scenarioId}: ${scenarioContext}

FLIGHT INFORMATION:
- Aircraft: ${flightInfo.aircraftId} (${flightInfo.aircraftType})
- RT Call Sign: ${flightInfo.rtCallSign}
- Registration: ${flightInfo.registration}
- From: ${flightInfo.departure} To: ${flightInfo.destination}
- Route: ${flightInfo.atsRoute}
- Stand: ${flightInfo.standNo}, Runway: ${flightInfo.runwayInUse}, Taxiway: ${flightInfo.taxiway}
- FL: ${flightInfo.flightLevel}
- Alternate: ${flightInfo.alternateAirdrome}
- POB: ${flightInfo.pob}, Endurance: ${flightInfo.endurance}
- Start Time: ${flightInfo.exerciseStartTime}
- Squawk: ${squawk}

FREQUENCIES:
${frequencies.map((f: any) => `${f.description}: ${f.frequency}`).join('\n')}

CURRENT QUESTION/TASK: ${currentQuestion}

REFERENCE ATC RESPONSES (use these as guide for correct responses):

SCENARIO 1 (Delhi SMC):
- Radio Check → "Air India 887 heavy, Delhi Ground, readability 5" or "read you loud and clear"
- Time Check → "AIR INDIA 887, Ground, Time 05"
- Departure Info → "AIR INDIA 887-Ground: Monitor Information K, Runway 09, Wind 340 Degrees 03 Knots, QNH 1016, Temperature 12, Visibility 3000 Metres"

SCENARIO 2 (Delhi SMC):
- Pushback/Startup → "AIR INDIA 887/Ground: Pushback approved facing west, on completion of pushback start up approved."
- Taxi → "AIR INDIA 887-Ground: Taxi to holding point Runway 09 via taxiway C D, Time 1120."
- Taxiway light → "AIR INDIA 887-Ground Roger will reduce" or "WILCO"
- ATC Clearance → "AIR INDIA 887-Ground: Clearance: Cleared to Kolkata via V10 ALI G452 LKN R460, FL360. After Departure Runway-09, Turn right. Climb on track, initially climb to FL160. Request Level Change from Delhi Approach."

SCENARIO 3 (Delhi Tower):
- Holding Point entry → "AIR INDIA887(Heavy)-Delhi Tower: Enter Line up Runway-09. Report when ready for departure."
- Takeoff → "AIR INDIA 887-Tower: Wind 340 Degrees/03 Knots, Runway-09, Cleared for Take Off"
- Rejected takeoff (blue bull) → "AIC 887-Ground Roger"
- Revised clearance → "Air India 887-Tower: Roger. vacate Runway via taxiway D. Re cleared to holding point Runway 09 via taxi B, C & D. Report reaching holding point Runway 09."
- Second takeoff → "AIR INDIA 887-Tower: Wind 340 Degrees/03 Knots, Runway-09, Cleared for Take Off"
- Airborne report → "AIR INDIA 887-Delhi Tower: Roger, Contact Delhi Approach 121.35"

SCENARIO 4 (Delhi Approach):
- Passing 4000ft → "AIR INDIA 887(Heavy)/Delhi Approach, continue climb FL250, Report Passing FL160, stand by for FL 360"
- Weather deviation → "AIR INDIA 887-Approach: Roger, Deviation 10 miles right of track upto LKN approved. Contact Delhi Control 119.5 and inform your deviation."

SCENARIO 5 (Delhi Area Control):
- Position over ALI → "AIRINDIA887(Heavy)/Delhi Control - Roger, Continue climb to FL360, Report passing FL-250 when clear of weather and resuming normal navigation Report LKN."
- Position report LKN → "AIC 887-Control Maintain FL-360 Report BBN"

SCENARIO 6 (Kolkata Control):
- Position GAYA → "AIC-887-Kolkata Control Descend to FL 150 report Dhanbad"
- MAYDAY pressurization → "AIR INDIA 887-Kolkata Control: Roger Mayday. Report reaching FL 100. Report if any assistance required."
- Cancel emergency → "Roger. All STATION KOLKTTA CONTROL DISTRESS TRAFFIC ENDED"

Respond naturally based on the pilot's transmission. Keep it SHORT and realistic.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Pilot transmission: "${pilotMessage}"` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const atcResponse = data.choices?.[0]?.message?.content || "Say again, Air India 887.";

    return new Response(JSON.stringify({ response: atcResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("atc-response error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
