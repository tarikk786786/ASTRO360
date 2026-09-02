import { describe, it } from "node:test";
import assert from "node:assert";
import { AgreementEngine, EngineFinding } from "../../src/lib/prediction/agreementEngine";

describe("ASTRO360 Multi-Engine Agreement Mathematics Suite", () => {
  it("calculates 80% direction agreement for 4 supportive out of 5 eligible engines", () => {
    const findings: EngineFinding[] = [
      { engineId: "vedic", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.9, start: "2026-09-01", peak: "2026-09-15", end: "2026-09-30", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.9, stability: "HIGH", assumptions: [], version: "1.0" },
      { engineId: "western", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.85, start: "2026-09-05", peak: "2026-09-20", end: "2026-10-05", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.85, stability: "HIGH", assumptions: [], version: "1.0" },
      { engineId: "kp", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.92, start: "2026-09-08", peak: "2026-09-18", end: "2026-09-28", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.92, stability: "HIGH", assumptions: [], version: "1.0" },
      { engineId: "jaimini", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.8, start: "2026-09-10", peak: "2026-09-25", end: "2026-10-10", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.8, stability: "HIGH", assumptions: [], version: "1.0" },
      { engineId: "tajika", category: "CAREER", eventType: "CAREER_CHANGE", direction: "MIXED", strength: 0.6, start: "2026-09-01", peak: "2026-09-15", end: "2026-09-30", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.6, stability: "MODERATE", assumptions: [], version: "1.0" }
    ];

    const eligible = ["vedic", "western", "kp", "jaimini", "tajika"];
    const res = AgreementEngine.calculateAgreement(findings, eligible);

    assert.strictEqual(res.directionAgreement, 80);
    assert.strictEqual(res.participatingEngines, 5);
    assert.strictEqual(res.supportingEngines.length, 4);
    assert.ok(res.commonTimeWindow !== null);
  });

  it("excludes failed engines from the denominator strictly", () => {
    const findings: EngineFinding[] = [
      { engineId: "vedic", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.9, start: "2026-09-01", peak: "2026-09-15", end: "2026-09-30", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.9, stability: "HIGH", assumptions: [], version: "1.0" },
      { engineId: "western", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.85, start: "2026-09-05", peak: "2026-09-20", end: "2026-10-05", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.85, stability: "HIGH", assumptions: [], version: "1.0" }
    ];

    const eligible = ["vedic", "western"];
    const failed = ["tajika"];
    const res = AgreementEngine.calculateAgreement(findings, eligible, failed);

    assert.strictEqual(res.directionAgreement, 100);
    assert.strictEqual(res.participatingEngines, 2);
    assert.strictEqual(res.failedEngines.length, 1);
  });

  it("returns null agreement percentage when fewer than 2 eligible engines participate", () => {
    const findings: EngineFinding[] = [
      { engineId: "vedic", category: "CAREER", eventType: "CAREER_CHANGE", direction: "SUPPORTIVE", strength: 0.9, start: "2026-09-01", peak: "2026-09-15", end: "2026-09-30", precision: "WEEK", factors: [], rules: [], evidence: [], contradictions: [], confidence: 0.9, stability: "HIGH", assumptions: [], version: "1.0" }
    ];

    const eligible = ["vedic"];
    const res = AgreementEngine.calculateAgreement(findings, eligible);

    assert.strictEqual(res.agreementPercent, null);
    assert.strictEqual(res.agreementLevel, "Single-System Result");
  });
});
