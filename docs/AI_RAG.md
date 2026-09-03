# ASTRO360 — RAG & SOURCE RETRIEVAL ARCHITECTURE
================================================================================
Generated: 2026-09-03
Status: Approved Standard

## 1. Classical Corpus Grounding Hierarchy
- **Tier 1 (Foundational Canonical Treatises)**:
  - *Brihat Parashara Hora Shastra (BPHS)*
  - *Jaimini Upadesha Sutras*
  - *Phaladeepika by Mantreswara*
  - *Brihat Jataka & Saravali*
  - *Ptolemy's Tetrabiblos & Vettius Valens Anthologies*
- **Tier 2 (Authoritative Commentaries & Medieval Treatises)**:
  - *Uttara Kalamrita by Kalidasa*
  - *Lal Kitab (1952 edition)*
  - *Muhurta Chintamani*
  - *Abu Ma'shar's Greater Introduction to Astrology*
- **Tier 3 (Modern Synthesis & Empirical Case Research)**:
  - B.V. Raman, K.S. Krishnamurti (KP Reader 1–6), Marc Edmund Jones.

## 2. Chunking & Hybrid Retrieval Policy
- Semantic chunking strictly at the Adhyaya / Sloka boundary.
- Embeddings paired with exact keyword BM25 sparse matching for Sanskrit and Arabic terminology.
