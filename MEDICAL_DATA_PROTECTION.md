# Medical Data Protection & Design Guidelines

## Critical Medical Information Protection

This system is designed to protect the integrity of medical treatment information while providing a professional, patient-centered presentation.

### Protected Medical Fields

The following information **MUST NEVER be modified, altered, or rewritten** by the AI system:

- **Injection Protocols**: needle gauge, insertion depth, angles, approach techniques
- **Exosome Data**: type, concentration, cell source, preparation methods
- **Dosages & Quantities**: all numerical values, units, measurements
- **Treatment Schedules**: timing, frequency, intervals, duration
- **Pharmaceutical Details**: drug names, formulations, brands
- **Protocol Sequences**: order of procedures, step-by-step instructions
- **Contraindications**: warnings, precautions, side effects
- **Clinical Data**: numbers, measurements, test results, findings

### What AI Can Do

The system is allowed to:
- ✓ Improve readability and formatting
- ✓ Organize information into logical sections
- ✓ Create patient-friendly headers and categories
- ✓ Improve grammar while maintaining medical accuracy
- ✓ Summarize complex medical concepts in accessible language
- ✓ Add clarifying explanations for laypersons
- ✓ Enhance visual structure with clear section breaks

### What AI Must Never Do

The system is **strictly prohibited** from:
- ✗ Inventing medical information
- ✗ Modifying treatment quantities or dosages
- ✗ Changing injection protocols or specifications
- ✗ Altering drug names or formulations
- ✗ Rewriting treatment schedules or timing
- ✗ Changing contraindications or warnings
- ✗ Simplifying to the point of losing medical accuracy
- ✗ Adding unverified claims or marketing language

## Design Philosophy

The treatment plan pages are designed to align with the premium, patient-centered aesthetic of modern regenerative medicine practices like Reju Stem Cells.

### Design Principles

**Visual Hierarchy**
- Large, generous spacing creates breathing room
- Clear section breaks prevent information overload
- Premium typography conveys trustworthiness

**Color Palette**
- Clean whites and soft grays as primary backgrounds
- Medical blue (#2563eb) as accent for credibility
- Minimal color to maintain focus on content

**Typography**
- Light font weights for elegant appearance
- Generous line spacing for readability
- Clear hierarchy between sections

**Patient Experience**
- Concierge-style presentation
- Educational, not sales-focused
- Calm, reassuring tone throughout

## Communication Guidelines

### Tone & Language

**Use**:
- "Personalized treatment"
- "Regenerative care"
- "Patient-centered approach"
- "Evidence-based protocol"
- "Long-term wellness goals"
- "Treatment designed to support"
- "Professional support"

**Avoid**:
- "Miracle cure"
- "Guaranteed results"
- "Transforms your life"
- "Revolutionary breakthrough"
- "Guaranteed healing"
- Superlatives without evidence
- Aggressive sales language

### Example Messaging

✓ **Good**: "This personalized treatment plan uses evidence-based regenerative medicine protocols designed to support your long-term wellness goals."

✗ **Bad**: "This miraculous breakthrough stem cell treatment will revolutionize your health and completely transform your life."

## System Prompt Implementation

The AI system prompt includes specific instructions:

1. **Extraction Phase**: Parse PDF text and identify medical data fields
2. **Preservation Phase**: Flag and protect critical medical information
3. **Enhancement Phase**: Improve readability while maintaining accuracy
4. **Validation Phase**: Ensure no medical data was altered

## Compliance Checklist

Before treatment information is published, verify:

- [ ] All injection protocols remain exactly as written
- [ ] All dosage quantities are unchanged
- [ ] All drug names are preserved correctly
- [ ] Treatment schedules match the original document
- [ ] No medical claims were invented
- [ ] No contraindications were removed
- [ ] Patient name is correctly formatted
- [ ] Pricing information is accurate
- [ ] Overall tone is professional and calm

## Error Handling

If the system detects potential data modification:

1. Log the issue with timestamps
2. Flag the treatment plan for manual review
3. Notify administrator before publication
4. Require human verification of critical fields
5. Document the discrepancy

## Human Review Recommended

For high-value or complex treatment plans:

1. Review medical sections for accuracy
2. Verify all critical data fields
3. Check tone and messaging
4. Confirm patient consent
5. Validate pricing and payment details

## Questions & Support

For medical data protection questions:
- Review this document first
- Check API system prompt
- Consult with medical compliance team
- Never override safety checks without approval
