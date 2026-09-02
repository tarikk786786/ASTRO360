import { describe, it } from "node:test";
import assert from "node:assert";
import { UserIntakeEngine } from "../../src/ai/intake/UserIntakeEngine";
import { InputValidationEngine } from "../../src/ai/intake/InputValidationEngine";
import { FollowUpQuestionEngine } from "../../src/ai/intake/FollowUpQuestionEngine";

describe("ASTRO360 User Intake & Input Validation Suite", () => {
  it("determines strict requirements for natal career inquiry", () => {
    const reqs = UserIntakeEngine.getRequirementsForArea("CAREER");
    assert.strictEqual(reqs.fullName, "REQUIRED");
    assert.strictEqual(reqs.dateOfBirth, "REQUIRED");
    assert.strictEqual(reqs.birthTime, "REQUIRED");
    assert.strictEqual(reqs.birthPlace, "REQUIRED");
    assert.strictEqual(reqs.partnerProfile, "OPTIONAL");
  });

  it("adjusts requirements for Prashna / Horary and Islamic inquiry", () => {
    const prashnaReqs = UserIntakeEngine.getRequirementsForArea("PRASHNA");
    assert.strictEqual(prashnaReqs.birthTime, "NOT_APPLICABLE");
    assert.strictEqual(prashnaReqs.birthPlace, "REQUIRED");

    const islamicReqs = UserIntakeEngine.getRequirementsForArea("ISLAMIC_KNOWLEDGE");
    assert.strictEqual(islamicReqs.birthTime, "NOT_APPLICABLE");
    assert.strictEqual(islamicReqs.mainQuestion, "REQUIRED");
  });

  it("validates valid intake profile and permits confirmation gate readiness", () => {
    const intake = UserIntakeEngine.createInitialIntake("When will my career improve?", "CAREER");
    intake.fullName = "Alexander Wright";
    intake.dateOfBirth = "1992-07-15";
    intake.birthTime = "14:30";
    intake.birthPlace = "London, United Kingdom";
    intake.countryOfBirth = "United Kingdom";
    intake.userConfirmed = true;

    const reqs = UserIntakeEngine.getRequirementsForArea("CAREER");
    const val = InputValidationEngine.validate(intake, reqs);

    assert.strictEqual(val.isValid, true);
    assert.strictEqual(val.status, "VALID");
    assert.strictEqual(val.confirmationGateReady, true);
  });

  it("catches missing birth time and generates critical follow-up questions", () => {
    const intake = UserIntakeEngine.createInitialIntake("Career guidance", "CAREER");
    intake.fullName = "Sarah Connor";
    intake.dateOfBirth = "1985-05-12";
    intake.birthPlace = "Los Angeles, USA";
    intake.countryOfBirth = "USA";
    intake.birthTime = ""; // Missing

    const reqs = UserIntakeEngine.getRequirementsForArea("CAREER");
    const val = InputValidationEngine.validate(intake, reqs);

    assert.strictEqual(val.isValid, false);
    assert.strictEqual(val.missingFields.includes("Birth Time"), true);

    const followUps = FollowUpQuestionEngine.generateFollowUps(intake, val);
    assert.ok(followUps.some(f => f.fieldKey === "birthTime"));
    assert.ok(followUps.some(f => f.fieldKey === "birthTimeConfidence"));
  });

  it("handles unknown birth time with approximate uncertainty warning", () => {
    const intake = UserIntakeEngine.createInitialIntake("General life overview", "LIFE_OVERVIEW");
    intake.fullName = "David Miller";
    intake.dateOfBirth = "1978-11-20";
    intake.birthPlace = "Toronto, Canada";
    intake.countryOfBirth = "Canada";
    intake.birthTime = "";
    intake.birthTimeConfidence = "UNKNOWN";

    const reqs = UserIntakeEngine.getRequirementsForArea("LIFE_OVERVIEW");
    const val = InputValidationEngine.validate(intake, reqs);

    assert.strictEqual(val.isValid, true);
    assert.strictEqual(val.status, "UNCERTAIN_INFORMATION");
    assert.ok(val.warnings.some(w => w.includes("approximate")));
  });
});
