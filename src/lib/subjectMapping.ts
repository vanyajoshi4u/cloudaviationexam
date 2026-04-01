// Maps topic IDs to their parent subject for analytics grouping
const topicSubjectMap: Record<string, string> = {};

// We'll derive subject from topic ID patterns
export function getSubjectForTopic(topicId: string): string {
  // Air Meteorology
  if (topicId.startsWith("atmosphere") || topicId.startsWith("temperature") || topicId.startsWith("pressure") || topicId.startsWith("wind") || topicId.startsWith("humidity") || topicId.startsWith("clouds") || topicId.startsWith("precipitation") || topicId.startsWith("visibility") || topicId.startsWith("air-masses") || topicId.startsWith("fronts") || topicId.startsWith("turbulence") || topicId.startsWith("icing") || topicId.startsWith("thunderstorm") || topicId.startsWith("metar") || topicId.startsWith("taf") || topicId.startsWith("sigwx") || topicId.startsWith("oxford-met") || topicId.startsWith("sk-met") || topicId.startsWith("dgca-prev-met")) {
    return "Air Meteorology";
  }
  // RTR
  if (topicId.startsWith("rtr") || topicId.startsWith("dgca-rtr")) {
    return "RTR";
  }
  // Air Regulations
  if (topicId.startsWith("redbird-airreg") || topicId.startsWith("sk-reg") || topicId.startsWith("dgca-prev-reg")) {
    return "Air Regulations";
  }
  // Technical General
  if (topicId.startsWith("redbird-tech") || topicId.startsWith("sk-tech") || topicId.startsWith("dgca-prev-tech")) {
    return "Technical General";
  }
  // Technical Specific
  if (topicId.startsWith("cessna") || topicId.startsWith("piper") || topicId.startsWith("da40") || topicId.startsWith("da42") || topicId.startsWith("pa34") || topicId.startsWith("tecnam")) {
    return "Technical Specific";
  }
  // Radio Navigation
  if (topicId.includes("radnav") || topicId.includes("radio-nav") || topicId.startsWith("oxford-radnav") || topicId.startsWith("kw-radnav") || topicId.startsWith("redbird-radnav") || topicId.startsWith("rkbali-radnav")) {
    return "Radio Navigation";
  }
  // Instrument Navigation
  if (topicId.includes("inst") || topicId.startsWith("oxford-inst") || topicId.startsWith("kw-inst") || topicId.startsWith("redbird-inst") || topicId.startsWith("rkbali-inst")) {
    return "Instrument Navigation";
  }
  // General Navigation
  if (topicId.includes("gennav") || topicId.includes("gen-nav") || topicId.startsWith("oxford-gennav") || topicId.startsWith("kw-gennav") || topicId.startsWith("redbird-gennav") || topicId.startsWith("rkbali-gennav") || topicId.startsWith("dgca-prev-nav")) {
    return "General Navigation";
  }
  // Default fallback - check broader patterns
  if (topicId.startsWith("oxford-")) return "Air Meteorology";
  return "Air Navigation";
}
