# ASTRO360 — Hybrid RAG & Vector Retrieval Architecture

- **Embedding Model**: BAAI/bge-m3 multilingual dense + sparse embeddings.
- **Corpus Collections**: `VEDIC`, `WESTERN`, `KP`, `JAIMINI`, `TAJIKA`, `PANCHANGA`, `ASTRONOMY`, `ASTROLOGY_TERMS`, `METHODOLOGY`, `RESEARCH`, `USER_APPROVED_MEMORY`.
- **Hybrid Scoring**: $$S_{\text{final}} = 0.65 \times S_{\text{semantic}} + 0.35 \times S_{\text{BM25}}$$.
