import { describe, it } from "node:test";
import assert from "node:assert";
import { TraditionRegistry } from "../../src/ai/traditions/TraditionRegistry";
import { PredictionMethodRegistry } from "../../src/ai/prediction/PredictionMethodRegistry";
import { PredictionMethodRouter } from "../../src/ai/prediction/PredictionMethodRouter";
import { ScenarioEngine } from "../../src/ai/prediction/ScenarioEngine";
import { ConclusionEngine } from "../../src/ai/prediction/ConclusionEngine";
import { DeepResearchEngine } from "../../src/ai/research/DeepResearchEngine";
import { BacktestEngine } from "../../src/ai/research/BacktestEngine";
import { PersonalAstrologyOrchestrator } from "../../src/ai/orchestrator/PersonalAstrologyOrchestrator";
import { UserIntakeEngine } from "../../src/ai/intake/UserIntakeEngine";

describe("ASTRO360 Omni Prediction Platform Test Suite", () => {
  it("TraditionRegistry lists all 7 canonical domains with independence groups", () => {
    const domains = TraditionRegistry.DOMAINS;
    assert.ok(domains.length >= 7);
    assert.ok(domains.some(d => d.domainId === "VEDIC_PARASHARI"));
    assert.ok(domains.some(d => d.domainId === "WESTERN_TROPICAL"));
    assert.ok(domains.some(d => d.domainId === "ISLAMIC_KNOWLEDGE"));
  });

  it("PredictionMethodRegistry defines validated techniques across categories", () => {
    const methods = PredictionMethodRegistry.METHODS;
    assert.ok(methods.length >= 7);
    assert.ok(methods.some(m => m.methodId === "VEDIC_DASHA_VIMSHOTTARI"));
    assert.ok(methods.some(m => m.methodId === "VEDIC_D10_DASHAMSHA"));
    assert.ok(methods.some(m => m.methodId === "KP_CUSPAL_SIGNIFICATORS"));
  });

  it("PredictionMethodRouter routes career question to D10, Dashas, transits, and KP", () => {
    const plan = PredictionMethodRouter.routeQuestion("CAREER", "NEXT_6_MONTHS");
    assert.strictEqual(plan.area, "CAREER");
    assert.ok(plan.selectedMethodIds.includes("VEDIC_D10_DASHAMSHA"));
    assert.ok(plan.relevantDivisionalCharts.includes("D10 (Dashamsha)"));
  });

  it("ScenarioEngine compares Decision Option A vs Option B with checklists and runway", () => {
    const scenario = ScenarioEngine.compareOptions(
      "Should I stay at my job or accept the startup offer?",
      "Jupiter-Saturn Dasha",
      "10th House",
      "2nd House"
    );
    assert.ok(scenario.optionA.practicalSupport.keyAdvantages.length > 0);
    assert.ok(scenario.optionB.practicalSupport.financialRunwayRequirement.includes("months"));
    assert.ok(scenario.decisionChecklist.length >= 3);
  });

  it("DeepResearchEngine provides primary classical shloka citations with provenance", () => {
    const research = DeepResearchEngine.executeResearch("Career promotion and executive timing");
    assert.ok(research.primaryCitations.length >= 2);
    assert.strictEqual(research.primaryCitations[0].provenanceGrade, "TIER_1_CANONICAL");
    assert.ok(research.contradictoryInterpretations.length > 0);
    assert.ok(research.evidenceQualityScore >= 90);
  });

  it("BacktestEngine calculates precision and mean timing error against historical events", () => {
    const report = BacktestEngine.runBacktest("Test Seeker", [
      { title: "First Senior Promotion", date: "2021-04-15", expectedTechnique: "Vimshottari Dasha" },
      { title: "Relocation Overseas", date: "2023-08-10", expectedTechnique: "Transits" }
    ]);
    assert.strictEqual(report.totalEventsTested, 2);
    assert.strictEqual(report.precisionRatePercent, 100);
    assert.ok(report.meanTimingErrorDays >= 0);
    assert.ok(report.methodologicalIntegrityNotice.includes("leakage"));
  });

  it("ConclusionEngine synthesizes actionable conclusions with explicit uncertainty bounds", () => {
    const conclusion = ConclusionEngine.synthesize(
      "Career breakthrough is strongly supported in Q4 2026.",
      "Executive Authority and Recognition",
      ["D10 Lagna Lord transit", "Vimshottari Dasha activation"],
      ["Saturn demands disciplined patience"],
      "2026-10-01",
      "2026-11-15",
      "2027-01-30",
      "Peak Growth Window",
      92,
      ["Prepare portfolio", "Seek executive sponsorship"]
    );
    assert.strictEqual(conclusion.conclusionCategory, "STRONGLY_SUPPORTED_THEME");
    assert.strictEqual(conclusion.engineAgreementPercent, 92);
    assert.ok(conclusion.conditionsThatWouldAlterConclusion.length > 0);
    assert.ok(conclusion.whatCannotBeDetermined.length > 0);
  });

  it("PersonalAstrologyOrchestrator runs full end-to-end pipeline cleanly", async () => {
    const intake = UserIntakeEngine.createInitialIntake("Will I get a promotion this year?", "PROMOTION");
    intake.fullName = "Eleanor Vance";
    intake.dateOfBirth = "1990-09-24";
    intake.birthTime = "08:15";
    intake.birthPlace = "Chicago, IL, USA";
    intake.countryOfBirth = "USA";
    intake.userConfirmed = true;
    intake.historicalRectificationEvents = [
      { id: "1", eventType: "College Graduation", eventDate: "2012-05-15", isExactDate: true, confidence: "HIGH" }
    ];

    const result = await PersonalAstrologyOrchestrator.execute(intake, { compareScenario: true });

    assert.strictEqual(result.status, "SUCCESS");
    assert.strictEqual(result.validation.isValid, true);
    assert.ok(result.routedPlan);
    assert.ok(result.researchDossier);
    assert.ok(result.backtestReport);
    assert.ok(result.scenarioAnalysis);
    assert.ok(result.conclusion);
    assert.strictEqual(result.agreementSummary.directionAgreementPercent, 100);
    assert.ok(result.multitraditionBreakdown.vedic.findings.length > 0);
    assert.ok(result.multitraditionBreakdown.western.findings.length > 0);
  });
});
