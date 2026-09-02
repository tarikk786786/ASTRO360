/**
 * ASTRO360 Follow-Up Question Engine
 * Detects underspecified inputs and generates targeted, minimal follow-up prompts.
 * Automatically stops once the minimum sufficient data is available.
 */

import { UserIntakeProfile } from "./UserIntakeEngine";
import { ValidationResult } from "./InputValidationEngine";

export interface FollowUpQuestionPrompt {
  fieldKey: string;
  questionText: string;
  inputType: 'text' | 'date' | 'time' | 'select' | 'radio';
  options?: { value: string; label: string }[];
  importance: 'CRITICAL' | 'RECOMMENDED' | 'OPTIONAL';
}

export class FollowUpQuestionEngine {
  public static generateFollowUps(
    intake: UserIntakeProfile,
    validation: ValidationResult
  ): FollowUpQuestionPrompt[] {
    const prompts: FollowUpQuestionPrompt[] = [];

    // 1. Missing Birth Time
    if (validation.missingFields.includes("Birth Time")) {
      prompts.push({
        fieldKey: "birthTime",
        questionText: "What is your exact birth time (from birth certificate or hospital records)?",
        inputType: "time",
        importance: "CRITICAL"
      });
      prompts.push({
        fieldKey: "birthTimeConfidence",
        questionText: "How confident are you in this birth time?",
        inputType: "select",
        options: [
          { value: "EXACT", label: "Exact (Birth Certificate / Hospital Record)" },
          { value: "VERY_CLOSE", label: "Very Close (Parent Memory within 15 mins)" },
          { value: "APPROXIMATE", label: "Approximate (Within 1 Hour)" },
          { value: "WIDE_RANGE", label: "Wide Range (Morning / Afternoon / Evening)" },
          { value: "UNKNOWN", label: "Completely Unknown" }
        ],
        importance: "CRITICAL"
      });
    }

    // 2. Missing Birth Place
    if (validation.missingFields.includes("Birth Place")) {
      prompts.push({
        fieldKey: "birthPlace",
        questionText: "In which city and country were you born?",
        inputType: "text",
        importance: "CRITICAL"
      });
    }

    // 3. Partner Birth Data for Synastry
    if (validation.missingFields.includes("Partner Date of Birth")) {
      prompts.push({
        fieldKey: "partnerDateOfBirth",
        questionText: "What is your partner's date of birth (YYYY-MM-DD)?",
        inputType: "date",
        importance: "CRITICAL"
      });
    }

    // 4. Missing Time Horizon
    if (!intake.timeHorizon) {
      prompts.push({
        fieldKey: "timeHorizon",
        questionText: "What time horizon would you like to examine?",
        inputType: "select",
        options: [
          { value: "NEXT_30_DAYS", label: "Next 30 Days (Immediate Horizon)" },
          { value: "NEXT_6_MONTHS", label: "Next 6 Months (Medium Term)" },
          { value: "NEXT_12_MONTHS", label: "Next 12 Months (Annual Cycle)" },
          { value: "NEXT_2_YEARS", label: "Next 2 Years (Strategic Outlook)" }
        ],
        importance: "RECOMMENDED"
      });
    }

    return prompts;
  }
}
