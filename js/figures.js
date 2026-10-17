// Original schematic diagrams (inline SVG). Colours come from CSS variables so
// they follow light/dark mode. Not to scale.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.figures = {
  // Lateral view, right side, face to the right.
  triangle: `
<svg viewBox="0 0 440 320" role="img" aria-label="Lateral view of the right submandibular triangle">
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--fig-muscle)" stroke-width="1" opacity=".35"/>
    </pattern>
  </defs>
  <!-- sternocleidomastoid -->
  <path d="M70 70 L120 70 L200 315 L150 315 Z" fill="var(--fig-muscle)" opacity=".18"/>
  <text x="112" y="196" class="fig-label small" transform="rotate(68 112 196)">Sternocleidomastoid</text>
  <!-- mandible -->
  <path d="M110 20 L118 110 Q122 128 140 128 L360 118 Q392 116 396 96 L398 60 L360 64 L160 70 L150 20 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <text x="196" y="102" class="fig-label">Mandible</text>
  <!-- triangle -->
  <path d="M146 129 L360 119 L250 222 Z" fill="url(#hatch)"/>
  <!-- gland -->
  <ellipse cx="238" cy="160" rx="62" ry="28" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <text x="238" y="164" class="fig-label" text-anchor="middle">Submandibular gland</text>
  <!-- digastric posterior belly + stylohyoid -->
  <path d="M96 70 Q160 140 246 222" fill="none" stroke="var(--fig-muscle)" stroke-width="11" stroke-linecap="round"/>
  <path d="M112 62 Q170 130 252 214" fill="none" stroke="var(--fig-muscle)" stroke-width="3" opacity=".7"/>
  <text x="8" y="232" class="fig-label">Post. belly digastric</text>
  <text x="8" y="245" class="fig-label small">+ stylohyoid</text>
  <line x1="92" y1="228" x2="190" y2="170" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- anterior belly -->
  <path d="M258 220 Q320 170 372 122" fill="none" stroke="var(--fig-muscle)" stroke-width="10" stroke-linecap="round"/>
  <text x="340" y="214" class="fig-label">Ant. belly</text>
  <text x="340" y="227" class="fig-label">digastric</text>
  <line x1="338" y1="208" x2="318" y2="174" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- hyoid -->
  <ellipse cx="252" cy="232" rx="22" ry="7" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <text x="280" y="248" class="fig-label">Hyoid</text>
  <!-- facial artery & vein -->
  <path d="M190 210 Q200 150 260 130 Q282 124 284 112 Q286 90 296 60" fill="none" stroke="var(--fig-artery)" stroke-width="3.5"/>
  <path d="M270 60 Q268 95 270 118 Q262 150 230 190 Q215 210 196 236" fill="none" stroke="var(--fig-vein)" stroke-width="3.5"/>
  <text x="300" y="58" class="fig-label small">Facial a.</text>
  <text x="228" y="56" class="fig-label small">Facial v.</text>
  <!-- marginal mandibular nerve -->
  <path d="M128 112 Q160 146 220 140 Q262 136 290 122 Q320 106 350 104" fill="none" stroke="var(--fig-nerve)" stroke-width="3" stroke-dasharray="7 4"/>
  <text x="8" y="146" class="fig-label small">Marginal</text>
  <text x="8" y="158" class="fig-label small">mandibular n.</text>
  <line x1="72" y1="150" x2="146" y2="130" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- incision -->
  <path d="M170 262 Q240 278 320 254" fill="none" stroke="var(--fig-incision)" stroke-width="2.5" stroke-dasharray="3 5"/>
  <text x="330" y="262" class="fig-label small">Incision ≥3–4 cm</text>
  <text x="330" y="275" class="fig-label small">below mandible</text>
  <text x="250" y="200" class="fig-label strong" text-anchor="middle">Level IB</text>
</svg>`,

  // Coronal section through the floor of the mouth, right side, viewed from
  // in front. The gland's two parts are drawn together to show how they wrap
  // around the free posterior border of mylohyoid (which in reality lies
  // behind this plane).
  coronal: `
<svg viewBox="0 0 440 320" role="img" aria-label="Coronal section showing the gland wrapping around mylohyoid">
  <!-- skin & platysma -->
  <path d="M60 300 Q300 300 392 250 L400 120" fill="none" stroke="var(--fig-stroke)" stroke-width="1.4"/>
  <path d="M60 290 Q296 290 382 244 L390 120" fill="none" stroke="var(--fig-muscle)" stroke-width="4" opacity=".6"/>
  <text x="70" y="314" class="fig-label small">Skin</text>
  <text x="70" y="284" class="fig-label small">Platysma</text>
  <!-- investing fascia -->
  <path d="M60 272 Q286 276 352 230" fill="none" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="170" y="268" class="fig-label small">Investing fascia</text>
  <!-- mandible -->
  <path d="M340 60 Q372 56 378 90 L380 200 Q376 226 352 226 Q330 224 330 200 L332 90 Q332 62 340 60 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <text x="356" y="48" class="fig-label" text-anchor="middle">Mandible</text>
  <!-- tongue -->
  <path d="M60 40 Q170 20 250 70 Q270 120 230 150 L60 150 Z" fill="var(--fig-muscle)" opacity=".22"/>
  <text x="120" y="90" class="fig-label">Tongue</text>
  <!-- hyoglossus -->
  <path d="M200 70 Q204 140 196 222" fill="none" stroke="var(--fig-muscle)" stroke-width="6" opacity=".85"/>
  <text x="206" y="64" class="fig-label small">Hyoglossus</text>
  <!-- mylohyoid -->
  <path d="M332 128 Q260 190 70 220" fill="none" stroke="var(--fig-muscle)" stroke-width="8"/>
  <text x="76" y="240" class="fig-label">Mylohyoid</text>
  <!-- gland superficial + deep parts wrapping -->
  <path d="M248 175 Q228 128 262 118 Q300 110 320 132 Q290 150 250 172 Z" fill="var(--fig-gland)" stroke="var(--fig-stroke)"/>
  <path d="M250 180 Q300 160 326 144 Q352 170 340 210 Q320 250 270 246 Q236 238 236 210 Q238 192 250 180 Z" fill="var(--fig-gland)" stroke="var(--fig-stroke)"/>
  <text x="266" y="140" class="fig-label small">Deep part</text>
  <text x="270" y="215" class="fig-label">Superficial part</text>
  <!-- duct -->
  <circle cx="234" cy="120" r="5" fill="var(--fig-duct)" stroke="var(--fig-stroke)"/>
  <text x="226" y="132" class="fig-label small" text-anchor="end">Duct</text>
  <!-- lingual nerve above -->
  <circle cx="252" cy="100" r="5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)"/>
  <text x="262" y="92" class="fig-label small">Lingual n.</text>
  <!-- hypoglossal on hyoglossus -->
  <circle cx="212" cy="176" r="5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)"/>
  <text x="120" y="172" class="fig-label small">Hypoglossal n.</text>
  <!-- lingual artery deep to hyoglossus -->
  <circle cx="186" cy="160" r="4.5" fill="var(--fig-artery)"/>
  <text x="112" y="152" class="fig-label small">Lingual a.</text>
  <!-- facial vein on gland surface, MMN superficial to it -->
  <circle cx="336" cy="226" r="5" fill="var(--fig-vein)"/>
  <circle cx="356" cy="238" r="4" fill="var(--fig-nerve)" stroke="var(--fig-stroke)"/>
  <text x="300" y="268" class="fig-label small">Facial v.</text>
  <text x="396" y="232" class="fig-label small" text-anchor="end">MMN</text>
  <line x1="372" y1="230" x2="360" y2="236" stroke="var(--fig-stroke)" stroke-width=".8"/>
</svg>`
};
