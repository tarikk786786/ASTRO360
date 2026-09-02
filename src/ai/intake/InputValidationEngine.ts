/**
 * ASTRO360 Input Validation Engine
 * Validates dates, times, geographic coordinates, timezones, and ensures no calculation runs on invalid data.
 */

import { UserIntakeProfile, FieldRequirementLevel } from "./UserIntakeEngine";

export type ValidationStatus = 
  | "VALID"
  | "MISSING_REQUIRED_INFORMATION"
  | "UNCERTAIN_INFORMATION"
  | "CONFLICTING_INFORMATION"
  | "INVALID_COORDINATES"
  | "INVALID_DATE_FORMAT";

export interface ValidationResult {
  status: ValidationStatus;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missingFields: string[];
  uncertainFields: string[];
  confirmationGateReady: boolean;
}

export class InputValidationEngine {
  public static validate(intake: UserIntakeProfile, requirements: Record<string, FieldRequirementLevel>): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const missingFields: string[] = [];
    const uncertainFields: string[] = [];

    // 1. Name Check
    if (requirements.fullName === "REQUIRED" && (!intake.fullName || !intake.fullName.trim())) {
      missingFields.push("Full Name");
      errors.push("Full name is required for profile binding.");
    }

    // 2. Date of Birth Check
    if (requirements.dateOfBirth === "REQUIRED") {
      if (!intake.dateOfBirth || !intake.dateOfBirth.trim()) {
        missingFields.push("Date of Birth");
        errors.push("Date of birth is required for astronomical planetary calculations.");
      } else {
        const dateObj = new Date(intake.dateOfBirth);
        if (isNaN(dateObj.getTime()) || !/^\d{4}-\d{2}-\d{2}$/.test(intake.dateOfBirth)) {
          errors.push("Date of birth must be a valid date in YYYY-MM-DD format.");
        } else {
          const year = dateObj.getUTCFullYear();
          if (year < 1800 || year > 2100) {
            errors.push(`Date of birth year (${year}) is outside supported astronomical ephemeris range (1800-2100).`);
          }
        }
      }
    }

    // 3. Birth Time Check
    if (requirements.birthTime === "REQUIRED") {
      if (!intake.birthTime || !intake.birthTime.trim()) {
        if (intake.birthTimeConfidence === "EXACT") {
          missingFields.push("Birth Time");
          errors.push("Exact birth time is missing. If unknown, please set confidence to 'UNKNOWN' or 'APPROXIMATE'.");
        } else {
          uncertainFields.push("Birth Time (Estimated/Approximate)");
          warnings.push("Birth time is approximate. Ascendant cusps and Moon sub-degrees carry higher sensitivity.");
        }
      } else {
        if (!/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/.test(intake.birthTime)) {
          errors.push("Birth time must be in HH:MM (24-hour) format.");
        }
      }
    }

    // 4. Birth Place & Coordinates
    if (requirements.birthPlace === "REQUIRED") {
      if (!intake.birthPlace || !intake.birthPlace.trim()) {
        missingFields.push("Birth Place");
        errors.push("Birth place (city, country) is required to calculate topocentric Ascendant and houses.");
      } else if (intake.resolvedCoordinates) {
        const { latitude, longitude } = intake.resolvedCoordinates;
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
          errors.push(`Resolved coordinates (${latitude}, ${longitude}) are invalid.`);
        }
      }
    }

    // 5. Question & Area Check
    if (!intake.mainQuestion || !intake.mainQuestion.trim()) {
      missingFields.push("Main Question");
      errors.push("Please provide your core question or topic of inquiry.");
    }

    // 6. Relational Partner Check
    if (requirements.partnerProfile === "REQUIRED") {
      if (!intake.partnerProfile?.dateOfBirth) {
        missingFields.push("Partner Date of Birth");
        errors.push("Partner birth data is required for compatibility and synastry analysis.");
      }
    }

    const isValid = errors.length === 0;
    let status: ValidationStatus = "VALID";

    if (missingFields.length > 0) {
      status = "MISSING_REQUIRED_INFORMATION";
    } else if (errors.length > 0) {
      status = "INVALID_DATE_FORMAT";
    } else if (uncertainFields.length > 0) {
      status = "UNCERTAIN_INFORMATION";
    }

    return {
      status,
      isValid,
      errors,
      warnings,
      missingFields,
      uncertainFields,
      confirmationGateReady: isValid && intake.userConfirmed
    };
  }
}
