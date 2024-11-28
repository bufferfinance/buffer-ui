import { SummaryData } from "@Views/Perps/Perps.types";

type NA = "NA";
type L = "L";
type PossibleTypes = SummaryData | NA | L;


export const handleNAandL = (resp: PossibleTypes): resp is NA|L => {
    if (resp === "NA" || resp === "L") {
      // Handling "NA" and "L"
      return true; // These are not `SummaryData`
    }
  
    // If it's not "NA" or "L", it must be `SummaryData`
    return false;
  };