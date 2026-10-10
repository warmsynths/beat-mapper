// Builds BEAT_AUDIT_REFERENCE.md with full verified audit findings and web references for all 135 beats.
// Writes to public/BEAT_AUDIT_REFERENCE.md and repo-root BEAT_AUDIT_REFERENCE.md.
// Run from repo root: node .scratch/generate_reference_doc.cjs

require('./generate_enhanced_reference_doc.cjs');
