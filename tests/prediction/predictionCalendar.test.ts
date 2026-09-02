import { describe, it } from "node:test";
import assert from "node:assert";
import { PredictionCalendarEngine } from "../../src/lib/prediction/predictionCalendarEngine";
import { UserProfile } from "../../src/types";

describe("ASTRO360 Prediction Calendar Engine Test Suite", () => {
  const mockProfile: UserProfile = {
    id: "test_user_1",
    name: "Alexander Vance",
    birthDate: "1990-05-20",
    birthTime: "11:15",
    birthPlace: {
      name: "New Delhi, India",
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: "Asia/Kolkata"
    }
  } as UserProfile;

  it("generates deterministic canonical prediction events across multiple categories", () => {
    const events = PredictionCalendarEngine.generatePredictions(mockProfile, 12);
    assert.ok(events.length >= 5);
    assert.ok(events.some(e => e.category === "CAREER"));
    assert.ok(events.some(e => e.category === "MONEY"));
    assert.ok(events.some(e => e.category === "RELATIONSHIP"));
    assert.ok(events.some(e => e.category === "ECLIPSE"));
  });

  it("filters predictions accurately by category", () => {
    const events = PredictionCalendarEngine.generatePredictions(mockProfile, 12);
    const careerEvents = PredictionCalendarEngine.filterPredictions(events, {
      startDate: "",
      endDate: "",
      category: "CAREER"
    });
    assert.ok(careerEvents.length > 0);
    assert.strictEqual(careerEvents.every(e => e.category === "CAREER"), true);
  });

  it("filters predictions accurately by participating engine", () => {
    const events = PredictionCalendarEngine.generatePredictions(mockProfile, 12);
    const kpEvents = PredictionCalendarEngine.filterPredictions(events, {
      startDate: "",
      endDate: "",
      engineId: "kp"
    });
    assert.ok(kpEvents.length > 0);
    assert.strictEqual(
      kpEvents.every(e => e.engineFindings.some(f => f.engineId === "kp")),
      true
    );
  });

  it("filters predictions by minimum agreement threshold (>= 80%)", () => {
    const events = PredictionCalendarEngine.generatePredictions(mockProfile, 12);
    const highAgreement = PredictionCalendarEngine.filterPredictions(events, {
      startDate: "",
      endDate: "",
      minAgreementPercent: 80
    });
    assert.ok(highAgreement.length > 0);
    assert.strictEqual(
      highAgreement.every(e => e.agreement.directionAgreementPercent >= 80),
      true
    );
  });

  it("generates standards-compliant RFC 5545 iCalendar (.ics) string", () => {
    const events = PredictionCalendarEngine.generatePredictions(mockProfile, 12);
    const careerEvent = events.find(e => e.category === "CAREER")!;
    const ics = PredictionCalendarEngine.generateIcsContent(careerEvent);

    assert.ok(ics.includes("BEGIN:VCALENDAR"));
    assert.ok(ics.includes("BEGIN:VEVENT"));
    assert.ok(ics.includes(`UID:${careerEvent.id}@astro.tarikislam.in`));
    assert.ok(ics.includes("SUMMARY:ASTRO360:"));
    assert.ok(ics.includes("BEGIN:VALARM"));
    assert.ok(ics.includes("END:VCALENDAR"));
  });
});
