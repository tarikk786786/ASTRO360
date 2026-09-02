# ASTRO360 — Landing Page Analytics & Privacy-Preserving Instrumentation

## 1. Event Telemetry Schema
All analytics events are strictly Zero-PII (no birth dates, coordinates, or names are logged):

| Event Name | Trigger | Payload |
| :--- | :--- | :--- |
| `landing_view` | Page load | `{ timestamp, referrer }` |
| `hero_cta_create_chart` | Hero 'Create Free Chart' click | `{ source: 'hero_primary' }` |
| `hero_cta_ask` | Hero 'Ask ASTRO360' click | `{ source: 'hero_secondary' }` |
| `demo_question_select` | User selects sample question | `{ category, question_id }` |
| `demo_tab_toggle` | User toggles [Why?] / [Compare] / [Timeline] | `{ active_view }` |
| `tradition_card_click` | User inspects an astrology engine | `{ engine_id }` |
| `chart_preview_zoom` | User interacts with chart viewer | `{ zoom_level }` |
| `map_city_select` | User clicks an astrocartography city | `{ city }` |
| `faq_toggle` | User opens an FAQ accordion item | `{ question_index }` |
