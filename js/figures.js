// Original schematic diagrams (inline SVG). Colours come from CSS variables so
// they follow light/dark mode. Not to scale.

window.ANATOMY = window.ANATOMY || { regions: {} };

window.ANATOMY.figures = {
  // The open mouth from the front (patient's right on the viewer's left), and
  // the floor of mouth with the tongue raised.
  oralCavitySubsites: `
<svg viewBox="0 0 600 380" role="img" aria-label="Open mouth from the front showing the oral cavity subsites and a 1 cm margin marked around a cancer on the right lateral border of the tongue, and the floor of mouth with the tongue raised">
  <text x="150" y="20" class="fig-label strong" text-anchor="middle">Mouth open</text>
  <text x="450" y="20" class="fig-label strong" text-anchor="middle">Tongue raised</text>
  <!-- left panel: lips -->
  <path d="M30 120 Q150 30 270 120 Q290 200 270 280 Q150 370 30 280 Q10 200 30 120 Z" fill="var(--fig-muscle)" opacity=".25" stroke="var(--fig-stroke)"/>
  <!-- buccal mucosa / oral cavity -->
  <path d="M50 130 Q150 60 250 130 Q266 200 250 270 Q150 340 50 270 Q34 200 50 130 Z" fill="var(--fig-gland)" opacity=".25" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- hard palate and upper teeth -->
  <path d="M70 120 Q150 70 230 120 L222 140 Q150 100 78 140 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="150" y="122" class="fig-label small" text-anchor="middle">Hard palate</text>
  <!-- soft palate, uvula, pillars, tonsils -->
  <path d="M90 150 Q150 128 210 150 L200 168 Q150 152 100 168 Z" fill="var(--fig-muscle)" opacity=".35"/>
  <path d="M144 160 Q150 186 156 160" fill="var(--fig-muscle)" opacity=".6"/>
  <text x="150" y="146" class="fig-label small" text-anchor="middle">Soft palate</text>
  <ellipse cx="100" cy="192" rx="10" ry="18" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <ellipse cx="200" cy="192" rx="10" ry="18" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="212" y="182" class="fig-label small">Tonsil</text>
  <text x="212" y="194" class="fig-label small">(oropharynx)</text>
  <!-- tongue -->
  <path d="M84 210 Q150 176 216 210 Q232 260 200 300 Q150 330 100 300 Q68 260 84 210 Z" fill="var(--fig-muscle)" opacity=".45" stroke="var(--fig-stroke)"/>
  <path d="M112 218 Q150 202 188 218" fill="none" stroke="var(--fig-stroke)" stroke-dasharray="2 4"/>
  <text x="150" y="232" class="fig-label small" text-anchor="middle">Circumvallate papillae</text>
  <text x="150" y="268" class="fig-label" text-anchor="middle">Oral tongue</text>
  <!-- tumour and margin on the patient's right lateral border (viewer's left) -->
  <ellipse cx="94" cy="252" rx="8" ry="14" fill="var(--fig-artery)" opacity=".75"/>
  <ellipse cx="96" cy="252" rx="22" ry="34" fill="none" stroke="var(--fig-incision)" stroke-width="2.5" stroke-dasharray="3 4"/>
  <text x="8" y="330" class="fig-label small">Tumour on the right lateral border, with</text>
  <text x="8" y="343" class="fig-label small">the 1 cm margin marked (dashed)</text>
  <line x1="60" y1="322" x2="86" y2="284" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- retromolar trigone & buccal mucosa labels -->
  <text x="8" y="120" class="fig-label small">Buccal mucosa</text>
  <line x1="40" y1="124" x2="56" y2="168" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="232" y="246" class="fig-label small">Retromolar</text>
  <text x="232" y="258" class="fig-label small">trigone</text>
  <line x1="240" y1="238" x2="226" y2="214" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- right panel: floor of mouth -->
  <path d="M330 110 Q450 50 570 110 Q590 200 570 280 Q450 350 330 280 Q310 200 330 110 Z" fill="var(--fig-gland)" opacity=".2" stroke="var(--fig-stroke)"/>
  <path d="M360 110 Q450 70 540 110 Q546 150 520 170 Q450 190 380 170 Q354 150 360 110 Z" fill="var(--fig-muscle)" opacity=".45" stroke="var(--fig-stroke)"/>
  <text x="450" y="128" class="fig-label small" text-anchor="middle">Underside of tongue</text>
  <path d="M450 170 L450 220" stroke="var(--fig-stroke)" stroke-width="2"/>
  <text x="458" y="208" class="fig-label small">Frenulum</text>
  <circle cx="440" cy="226" r="4" fill="var(--fig-duct)" stroke="var(--fig-stroke)"/>
  <circle cx="460" cy="226" r="4" fill="var(--fig-duct)" stroke="var(--fig-stroke)"/>
  <text x="472" y="242" class="fig-label small">Caruncles</text>
  <text x="472" y="254" class="fig-label small">(duct openings)</text>
  <path d="M436 230 Q400 236 360 220" fill="none" stroke="var(--fig-duct)" stroke-width="4"/>
  <path d="M464 230 Q500 236 540 220" fill="none" stroke="var(--fig-duct)" stroke-width="4"/>
  <path d="M430 222 Q394 214 356 206" fill="none" stroke="var(--fig-gland)" stroke-width="10" opacity=".7"/>
  <text x="340" y="196" class="fig-label small">Sublingual fold</text>
  <path d="M352 238 Q380 250 402 232" fill="none" stroke="var(--fig-nerve)" stroke-width="2.5"/>
  <text x="334" y="268" class="fig-label small">Lingual nerve loops under the duct</text>
  <path d="M340 270 Q450 300 560 270" fill="none" stroke="var(--fig-bone)" stroke-width="10" opacity=".8"/>
  <text x="450" y="300" class="fig-label small" text-anchor="middle">Lower alveolar ridge</text>
  <text x="450" y="318" class="fig-label" text-anchor="middle">Floor of mouth</text>
  <text x="6" y="360" class="fig-label small">Oral cavity subsites: lip, buccal mucosa, alveolar ridges, retromolar trigone, floor of mouth,</text>
  <text x="6" y="373" class="fig-label small">hard palate and oral tongue. Not to scale.</text>
</svg>`,
  // Right face from the side, face to the right: the five facial nerve branches
  // fanning from the parotid to the muscles they supply.
  facialNerveMuscles: `
<svg viewBox="0 0 560 440" role="img" aria-label="Right side of the face showing the temporal, zygomatic, buccal, marginal mandibular and cervical branches of the facial nerve, the muscles each supplies, Pitanguy's line and the parotid duct">
  <!-- head outline -->
  <path d="M120 40 Q250 0 380 40 Q440 70 450 140 L470 200 Q478 214 462 220 L468 252 Q474 262 460 268 L458 300 Q450 330 420 334 L360 344 Q330 380 300 396 L250 420" fill="none" stroke="var(--fig-stroke)" stroke-width="1.4"/>
  <path d="M120 40 Q70 120 96 230 Q110 300 150 350 L170 420" fill="none" stroke="var(--fig-stroke)" stroke-width="1.4"/>
  <!-- ear -->
  <path d="M150 170 Q130 140 150 120 Q180 110 190 150 Q196 190 176 220 Q160 236 154 214" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- zygomatic arch and mandible -->
  <path d="M196 182 L330 176" stroke="var(--fig-stroke)" stroke-width="5" opacity=".35" stroke-linecap="round"/>
  <path d="M196 236 Q206 320 232 336 L380 330" fill="none" stroke="var(--fig-stroke)" stroke-width="4" opacity=".3"/>
  <!-- muscles -->
  <path d="M250 40 Q330 30 400 60 L392 110 Q320 96 256 104 Z" fill="var(--fig-muscle)" opacity=".28"/>
  <text x="300" y="78" class="fig-label">Frontalis</text>
  <ellipse cx="384" cy="148" rx="42" ry="26" fill="none" stroke="var(--fig-muscle)" stroke-width="10" opacity=".45"/>
  <text x="432" y="152" class="fig-label small">Orbicularis oculi</text>
  <path d="M332 196 L404 272" stroke="var(--fig-muscle)" stroke-width="12" stroke-linecap="round" opacity=".5"/>
  <text x="412" y="226" class="fig-label small">Zygomaticus</text>
  <text x="412" y="238" class="fig-label small">major</text>
  <ellipse cx="434" cy="282" rx="30" ry="18" fill="none" stroke="var(--fig-muscle)" stroke-width="9" opacity=".45"/>
  <text x="470" y="292" class="fig-label small">Orbicularis oris</text>
  <path d="M402 300 L384 332 L420 330 Z" fill="var(--fig-muscle)" opacity=".45"/>
  <text x="430" y="352" class="fig-label small">Depressors of the</text>
  <text x="430" y="364" class="fig-label small">lower lip, mentalis</text>
  <path d="M196 330 Q260 370 360 360 L330 430 L190 430 Z" fill="var(--fig-muscle)" opacity=".16"/>
  <text x="236" y="404" class="fig-label small">Platysma</text>
  <!-- parotid and duct -->
  <path d="M184 186 Q228 190 232 230 Q238 290 214 318 Q190 300 186 250 Z" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <text x="120" y="300" class="fig-label small">Parotid</text>
  <path d="M232 214 L330 214 Q344 214 348 228" fill="none" stroke="var(--fig-duct)" stroke-width="5"/>
  <text x="250" y="284" class="fig-label small">Parotid duct</text>
  <line x1="282" y1="274" x2="292" y2="218" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- facial nerve: trunk, pes, five branches -->
  <path d="M178 232 L206 244" stroke="var(--fig-nerve)" stroke-width="5"/>
  <circle cx="206" cy="244" r="4" fill="var(--fig-nerve)"/>
  <path d="M206 244 Q226 200 250 150 Q270 110 300 104" fill="none" stroke="var(--fig-nerve)" stroke-width="3"/>
  <path d="M206 244 Q260 210 342 166" fill="none" stroke="var(--fig-nerve)" stroke-width="3"/>
  <path d="M206 244 Q280 228 400 262" fill="none" stroke="var(--fig-nerve)" stroke-width="3"/>
  <path d="M206 244 Q222 300 260 330 Q330 334 396 312" fill="none" stroke="var(--fig-nerve)" stroke-width="3"/>
  <path d="M206 244 Q210 320 226 380" fill="none" stroke="var(--fig-nerve)" stroke-width="3"/>
  <text x="222" y="130" class="fig-label strong">Temporal</text>
  <text x="264" y="182" class="fig-label strong">Zygomatic</text>
  <text x="292" y="256" class="fig-label strong">Buccal</text>
  <text x="252" y="318" class="fig-label strong">Marginal mandibular</text>
  <text x="140" y="372" class="fig-label strong">Cervical</text>
  <text x="120" y="252" class="fig-label small">Stylomastoid</text>
  <text x="120" y="264" class="fig-label small">foramen → pes</text>
  <!-- Pitanguy's line -->
  <path d="M178 222 L360 116" stroke="var(--fig-incision)" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="362" y="108" class="fig-label small">Pitanguy's line: 0.5 cm below the tragus</text>
  <text x="362" y="120" class="fig-label small">to 1.5 cm above the lateral eyebrow</text>
  <text x="6" y="424" class="fig-label small">Yellow: facial nerve. Grey bars: zygomatic arch and lower border of the mandible.</text>
  <text x="6" y="437" class="fig-label small">The zygomatic and buccal branches interconnect; the temporal and marginal mandibular rarely do. Not to scale.</text>
</svg>`,
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
</svg>`,

  // Neck dissection levels, left lateral view (face to the left). Zone colours
  // match the node colours in the 3D model (ANATOMY.LEVEL_COLORS).
  levels: `
<svg viewBox="0 0 440 360" role="img" aria-label="Neck dissection levels I to VI, left lateral view">
  <!-- zones -->
  <g opacity=".42" stroke="var(--fig-stroke)" stroke-width=".6">
    <polygon points="62,104 88,110 118,148 84,153" fill="#d4e36f"/>
    <polygon points="80,99 205,83 222,92 128,148 92,112" fill="#a9c43c"/>
    <polygon points="128,149 222,92 252,52 258,155 126,155" fill="#3fb6a8"/>
    <polygon points="252,52 287,58 270,155 258,155" fill="#2b8f86"/>
    <polygon points="100,155 270,155 242,232 108,232" fill="#4f8fdc"/>
    <polygon points="108,232 242,232 217,322 120,322" fill="#8a6ad6"/>
    <polygon points="287,58 332,46 372,232 242,232 270,155" fill="#e3913a"/>
    <polygon points="242,232 372,232 408,306 217,322" fill="#c8722a"/>
    <polygon points="76,155 100,155 120,330 94,330" fill="#e06a9a"/>
  </g>
  <!-- skin of the front of the neck -->
  <path d="M58 100 Q66 210 92 334" fill="none" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <!-- mandible -->
  <path d="M56 92 Q60 104 80 99 L205 83 Q214 82 216 70 L222 14 L246 14 L238 78 Q232 100 205 98 L80 112 Q58 114 52 98 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- mastoid -->
  <ellipse cx="268" cy="40" rx="14" ry="12" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- sternocleidomastoid -->
  <path d="M252 46 L287 56 L216 326 L150 330 Z" fill="var(--fig-muscle)" opacity=".16"/>
  <path d="M252 46 L150 330 M287 56 L216 326" fill="none" stroke="var(--fig-muscle)" stroke-width="1.6"/>
  <!-- trapezius anterior border -->
  <path d="M332 46 Q352 140 410 306" fill="none" stroke="var(--fig-muscle)" stroke-width="2.4"/>
  <!-- digastric -->
  <path d="M258 52 Q190 100 128 149 Q96 126 64 102" fill="none" stroke="var(--fig-muscle)" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <!-- hyoid and cricoid levels -->
  <ellipse cx="116" cy="152" rx="14" ry="4.5" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <line x1="40" y1="155" x2="300" y2="155" stroke="var(--fig-stroke)" stroke-width=".8" stroke-dasharray="4 3"/>
  <rect x="88" y="222" width="16" height="10" rx="2" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <line x1="46" y1="232" x2="380" y2="232" stroke="var(--fig-stroke)" stroke-width=".8" stroke-dasharray="4 3"/>
  <!-- clavicle -->
  <path d="M120 326 Q260 316 420 300" fill="none" stroke="var(--fig-stroke)" stroke-width="9" stroke-linecap="round" opacity=".55"/>
  <path d="M120 326 Q260 316 420 300" fill="none" stroke="var(--fig-bone)" stroke-width="7" stroke-linecap="round"/>
  <!-- accessory nerve -->
  <path d="M250 60 Q262 110 272 150 Q300 196 360 250" fill="none" stroke="var(--fig-nerve)" stroke-width="2.4" stroke-dasharray="6 3"/>
  <!-- level labels -->
  <g class="fig-level">
    <text x="84" y="134">IA</text>
    <text x="152" y="112">IB</text>
    <text x="200" y="132">IIA</text>
    <text x="266" y="112">IIB</text>
    <text x="176" y="198">III</text>
    <text x="164" y="284">IV</text>
    <text x="318" y="160">VA</text>
    <text x="318" y="282">VB</text>
    <text x="88" y="262">VI</text>
  </g>
  <!-- landmark labels -->
  <text x="6" y="158" class="fig-label small">Hyoid</text>
  <text x="6" y="236" class="fig-label small">Cricoid</text>
  <text x="300" y="344" class="fig-label small">Clavicle</text>
  <text x="372" y="96" class="fig-label small">Trapezius</text>
  <text x="110" y="76" class="fig-label small">Mandible</text>
  <text x="362" y="262" class="fig-label small">XI</text>
  <text x="212" y="250" class="fig-label small" transform="rotate(-72 212 250)">Sternocleidomastoid</text>
</svg>`,

  // Facial nerve trunk landmarks and branches, right lateral view (face to
  // the right).
  facial: `
<svg viewBox="0 0 440 330" role="img" aria-label="Facial nerve trunk landmarks and branches, right lateral view">
  <!-- zygomatic arch and mandible -->
  <path d="M150 92 L300 86 Q318 85 322 94 L300 100 L170 104 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M196 104 L214 106 L222 196 Q226 222 252 226 L380 228 Q400 230 404 214 L408 236 Q404 252 380 250 L250 250 Q210 248 200 214 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- eye and mouth for orientation -->
  <ellipse cx="350" cy="70" rx="22" ry="9" fill="none" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M352 176 Q372 184 392 176" fill="none" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <!-- ear, tragus, mastoid -->
  <path d="M150 70 Q112 74 112 128 Q112 176 140 186 Q154 190 156 172 Q150 156 160 146 Q172 132 168 112 Q166 82 150 70 Z" fill="var(--fig-auricle, #e7c3b4)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M168 112 L182 122 L172 132 Z" fill="var(--fig-auricle, #e7c3b4)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <ellipse cx="146" cy="206" rx="14" ry="20" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- parotid gland -->
  <path d="M176 98 L262 98 Q272 130 270 168 Q266 206 236 226 Q206 236 186 216 Q170 196 172 168 Q174 130 176 98 Z" fill="var(--fig-gland)" opacity=".55" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- duct -->
  <path d="M268 132 L330 136 Q338 137 340 146" fill="none" stroke="var(--fig-duct)" stroke-width="4"/>
  <path d="M268 132 L330 136 Q338 137 340 146" fill="none" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <!-- posterior belly of digastric -->
  <path d="M150 214 Q190 236 236 262" fill="none" stroke="var(--fig-muscle)" stroke-width="8" stroke-linecap="round" opacity=".8"/>
  <!-- trunk and branches -->
  <g fill="none" stroke="var(--fig-nerve)" stroke-linecap="round">
    <path d="M168 168 Q182 172 198 170" stroke-width="4.5"/>
    <path d="M198 170 Q214 150 232 120 Q246 92 262 60 Q268 46 280 30" stroke-width="2.6"/>
    <path d="M232 120 Q276 96 330 80" stroke-width="2.6"/>
    <path d="M206 160 Q260 146 340 150" stroke-width="2.6"/>
    <path d="M198 170 Q228 196 270 214 Q320 232 370 208" stroke-width="2.6"/>
    <path d="M204 182 Q214 230 226 300" stroke-width="2.4"/>
    <path d="M168 168 Q150 150 134 126" stroke-width="1.8"/>
  </g>
  <!-- Pitanguy's line -->
  <line x1="176" y1="140" x2="300" y2="40" stroke="var(--fig-incision)" stroke-width="1.2" stroke-dasharray="5 4"/>
  <!-- landmark callouts -->
  <circle cx="182" cy="122" r="3" fill="var(--fig-incision)"/>
  <text x="14" y="98" class="fig-label small">Tragal pointer</text>
  <line x1="78" y1="100" x2="180" y2="121" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="14" y="246" class="fig-label small">Mastoid</text>
  <line x1="50" y1="243" x2="134" y2="214" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="14" y="284" class="fig-label small">Post. belly digastric</text>
  <line x1="104" y1="280" x2="196" y2="246" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="14" y="178" class="fig-label small">Trunk</text>
  <line x1="44" y1="175" x2="172" y2="169" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="14" y="140" class="fig-label small">Posterior auricular</text>
  <line x1="98" y1="137" x2="140" y2="134" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <!-- branch labels -->
  <text x="284" y="28" class="fig-label small">Temporal</text>
  <text x="334" y="96" class="fig-label small">Zygomatic</text>
  <text x="344" y="154" class="fig-label small">Buccal</text>
  <text x="300" y="268" class="fig-label small">Marginal mandibular</text>
  <line x1="340" y1="258" x2="350" y2="222" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="232" y="312" class="fig-label small">Cervical</text>
  <text x="300" y="122" class="fig-label small">Parotid duct</text>
  <text x="208" y="72" class="fig-label small" transform="rotate(-39 208 72)">Pitanguy's line</text>
  <text x="214" y="196" class="fig-label">Parotid</text>
</svg>`,
  thyroid: `
<svg viewBox="0 0 460 380" role="img" aria-label="Back of the thyroid with the recurrent laryngeal nerves, thyroid arteries and parathyroids, posterior view">
  <!-- larynx (posterior laminae of the thyroid cartilage and cricoid) and trachea -->
  <path d="M176 40 L284 40 L292 150 L168 150 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M190 150 L270 150 L266 196 L194 196 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M198 196 L262 196 L262 356 L198 356 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <g stroke="var(--fig-stroke)" stroke-width=".6" opacity=".6">
    <line x1="198" y1="216" x2="262" y2="216"/><line x1="198" y1="236" x2="262" y2="236"/><line x1="198" y1="256" x2="262" y2="256"/>
    <line x1="198" y1="276" x2="262" y2="276"/><line x1="198" y1="296" x2="262" y2="296"/><line x1="198" y1="316" x2="262" y2="316"/><line x1="198" y1="336" x2="262" y2="336"/>
  </g>
  <!-- thyroid lobes (back surface), with a tubercle of Zuckerkandl on each -->
  <path d="M166 96 Q150 104 140 150 Q130 200 140 250 Q150 286 176 282 Q196 276 198 240 L198 200 Q186 176 180 140 Q176 108 166 96 Z" fill="var(--fig-gland)" opacity=".75" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M294 96 Q310 104 320 150 Q330 200 320 250 Q310 286 284 282 Q264 276 262 240 L262 200 Q274 176 280 140 Q284 108 294 96 Z" fill="var(--fig-gland)" opacity=".75" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M190 196 Q178 186 186 172 Q196 176 198 192 Z" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M270 196 Q282 186 274 172 Q264 176 262 192 Z" fill="var(--fig-gland)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- Berry's ligament -->
  <g stroke="var(--fig-stroke)" stroke-width=".8">
    <line x1="194" y1="200" x2="204" y2="210"/><line x1="194" y1="208" x2="204" y2="218"/><line x1="194" y1="216" x2="204" y2="226"/>
    <line x1="256" y1="210" x2="266" y2="200"/><line x1="256" y1="218" x2="266" y2="208"/><line x1="256" y1="226" x2="266" y2="216"/>
  </g>
  <!-- superior thyroid arteries to the upper poles -->
  <g fill="none" stroke="var(--fig-artery)" stroke-width="3.5" stroke-linecap="round">
    <path d="M74 30 Q120 50 160 100"/><path d="M386 30 Q340 50 300 100"/>
    <!-- inferior thyroid arteries arching in to the lower lobes -->
    <path d="M56 330 Q70 250 110 236 Q140 228 160 236"/><path d="M404 330 Q390 250 350 236 Q320 228 300 236"/>
    <path d="M128 232 Q140 206 160 196" stroke-width="2.4"/><path d="M332 232 Q320 206 300 196" stroke-width="2.4"/>
  </g>
  <!-- external branches of the superior laryngeal nerves -->
  <g fill="none" stroke="var(--fig-nerve)" stroke-width="1.6" stroke-dasharray="4 3">
    <path d="M100 20 Q140 46 168 84 Q176 98 178 112"/><path d="M360 20 Q320 46 292 84 Q284 98 282 112"/>
  </g>
  <!-- recurrent laryngeal nerves: left (image left) vertical in the groove, right (image right) oblique -->
  <g fill="none" stroke="var(--fig-nerve)" stroke-width="3" stroke-linecap="round">
    <path d="M196 370 Q194 300 196 240 Q197 214 200 192"/>
    <path d="M330 370 Q300 310 276 260 Q264 226 260 192"/>
  </g>
  <!-- parathyroids -->
  <g fill="#c79a4a" stroke="var(--fig-stroke)" stroke-width=".8">
    <ellipse cx="176" cy="164" rx="7" ry="5"/><ellipse cx="284" cy="164" rx="7" ry="5"/>
    <ellipse cx="160" cy="262" rx="7" ry="5"/><ellipse cx="300" cy="262" rx="7" ry="5"/>
  </g>
  <!-- labels -->
  <text x="230" y="98" class="fig-label small" text-anchor="middle">Thyroid cartilage</text>
  <text x="230" y="178" class="fig-label small" text-anchor="middle">Cricoid</text>
  <text x="230" y="300" class="fig-label small" text-anchor="middle">Trachea</text>
  <text x="8" y="14" class="fig-label small">Sup. thyroid a. + ext. branch SLN</text>
  <text x="8" y="356" class="fig-label small">Inf. thyroid a.</text>
  <text x="340" y="362" class="fig-label small">Right RLN (oblique)</text>
  <text x="96" y="374" class="fig-label small">Left RLN (vertical)</text>
  <text x="352" y="150" class="fig-label small">Sup. parathyroid</text>
  <line x1="350" y1="147" x2="292" y2="163" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="286" class="fig-label small">Inf. parathyroid</text>
  <line x1="350" y1="282" x2="308" y2="264" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="186" class="fig-label small">Zuckerkandl</text>
  <line x1="74" y1="183" x2="184" y2="184" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="214" class="fig-label small">Berry's ligament</text>
  <line x1="350" y1="211" x2="266" y2="214" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="130" class="fig-label small">Left lobe</text>
  <text x="400" y="130" class="fig-label small">Right lobe</text>
  <text x="230" y="20" class="fig-label small" text-anchor="middle">L ← posterior view → R</text>
</svg>`,

  laryngoscopy: `
<svg viewBox="0 0 460 380" role="img" aria-label="The larynx seen from above at laryngoscopy, with the vocal folds, vestibular folds, epiglottis, aryepiglottic folds, arytenoids and piriform fossae">
  <!-- tongue base and valleculae -->
  <path d="M60 46 Q230 0 400 46 L400 70 Q230 30 60 70 Z" fill="var(--fig-muscle)" opacity=".5" stroke="var(--fig-stroke)" stroke-width="1"/>
  <ellipse cx="190" cy="74" rx="30" ry="9" fill="#5a2a2a" opacity=".7"/>
  <ellipse cx="270" cy="74" rx="30" ry="9" fill="#5a2a2a" opacity=".7"/>
  <!-- outer pharynx -->
  <path d="M74 90 Q60 220 120 330 Q230 372 340 330 Q400 220 386 90 Z" fill="#e9b3a8" opacity=".55" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- piriform fossae -->
  <path d="M100 150 Q96 240 140 318 Q150 250 134 160 Z" fill="#5a2a2a" opacity=".55"/>
  <path d="M360 150 Q364 240 320 318 Q310 250 326 160 Z" fill="#5a2a2a" opacity=".55"/>
  <!-- laryngeal inlet bounded by epiglottis and aryepiglottic folds -->
  <path d="M150 104 Q230 70 310 104 Q332 200 296 300 L164 300 Q128 200 150 104 Z" fill="#d98a86" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <!-- epiglottis -->
  <path d="M146 106 Q230 60 314 106 Q300 122 230 110 Q160 122 146 106 Z" fill="var(--fig-auricle, #e8cf9a)" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- vestibular folds -->
  <path d="M220 128 Q170 190 176 284 L196 284 Q196 200 226 132 Z" fill="#c9726e" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M240 128 Q290 190 284 284 L264 284 Q264 200 234 132 Z" fill="#c9726e" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- glottis (dark) with tracheal rings -->
  <path d="M230 134 L206 278 L254 278 Z" fill="#2a1a1a"/>
  <g stroke="#7a6a60" stroke-width="1.2" fill="none" opacity=".8">
    <path d="M222 200 Q230 204 238 200"/><path d="M218 226 Q230 231 242 226"/><path d="M214 252 Q230 258 246 252"/>
  </g>
  <!-- vocal folds -->
  <path d="M230 134 Q212 200 200 280 L210 282 Q218 210 232 136 Z" fill="#f4eee6" stroke="var(--fig-stroke)" stroke-width="1"/>
  <path d="M230 134 Q248 200 260 280 L250 282 Q242 210 228 136 Z" fill="#f4eee6" stroke="var(--fig-stroke)" stroke-width="1"/>
  <!-- arytenoids (corniculate and cuneiform tubercles) and interarytenoid -->
  <ellipse cx="196" cy="300" rx="20" ry="13" fill="#e9c6b6" stroke="var(--fig-stroke)"/>
  <ellipse cx="264" cy="300" rx="20" ry="13" fill="#e9c6b6" stroke="var(--fig-stroke)"/>
  <circle cx="170" cy="286" r="7" fill="#e9c6b6" stroke="var(--fig-stroke)"/>
  <circle cx="290" cy="286" r="7" fill="#e9c6b6" stroke="var(--fig-stroke)"/>
  <!-- labels -->
  <text x="230" y="24" class="fig-label small" text-anchor="middle">Tongue base</text>
  <text x="230" y="92" class="fig-label small" text-anchor="middle">Epiglottis</text>
  <text x="8" y="80" class="fig-label small">Vallecula</text>
  <line x1="58" y1="78" x2="164" y2="76" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="136" class="fig-label small">Aryepiglottic fold</text>
  <line x1="100" y1="139" x2="146" y2="160" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="244" class="fig-label small">Piriform fossa</text>
  <line x1="84" y1="241" x2="118" y2="241" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="196" class="fig-label small">Vestibular fold</text>
  <line x1="350" y1="193" x2="278" y2="210" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="236" class="fig-label small">Vocal fold</text>
  <line x1="350" y1="233" x2="252" y2="236" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="140" class="fig-label small">Ant. commissure</text>
  <line x1="350" y1="137" x2="234" y2="136" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="352" y="276" class="fig-label small">Rima glottidis</text>
  <line x1="350" y1="273" x2="242" y2="266" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="300" y="350" class="fig-label small">Arytenoid</text>
  <line x1="320" y1="340" x2="274" y2="308" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="110" y="366" class="fig-label small">Cuneiform tubercle</text>
  <line x1="150" y1="356" x2="170" y2="294" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="230" y="376" class="fig-label small" text-anchor="middle">Posterior</text>
  <text x="14" y="16" class="fig-label small">L</text><text x="440" y="16" class="fig-label small">R</text>
</svg>`,

  larynxCoronal: `
<svg viewBox="0 0 460 400" role="img" aria-label="Coronal section of the larynx showing the supraglottis, glottis and subglottis, the vestibular and vocal folds, the ventricle and the paraglottic space">
  <!-- hyoid -->
  <rect x="96" y="20" width="268" height="16" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- thyrohyoid membrane -->
  <path d="M110 36 L118 84 M350 36 L342 84" stroke="#9c94c0" stroke-width="3"/>
  <!-- thyroid laminae -->
  <path d="M112 84 L128 84 L132 250 L114 250 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M348 84 L332 84 L328 250 L346 250 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- cricoid -->
  <path d="M150 262 L170 262 L174 346 L150 346 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M310 262 L290 262 L286 346 L310 346 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- trachea -->
  <path d="M176 352 L176 392 M284 352 L284 392" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <!-- paraglottic space (fat) -->
  <path d="M132 96 L196 110 L196 238 L176 264 L132 250 Z" fill="var(--fig-gland)" opacity=".35"/>
  <path d="M328 96 L264 110 L264 238 L284 264 L328 250 Z" fill="var(--fig-gland)" opacity=".35"/>
  <!-- quadrangular membranes -->
  <path d="M168 60 L196 112 L196 170" fill="none" stroke="#9c94c0" stroke-width="2.4"/>
  <path d="M292 60 L264 112 L264 170" fill="none" stroke="#9c94c0" stroke-width="2.4"/>
  <!-- vestibular folds -->
  <path d="M196 150 Q212 160 204 182 Q196 188 186 182 L186 156 Z" fill="#d98a86" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M264 150 Q248 160 256 182 Q264 188 274 182 L274 156 Z" fill="#d98a86" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- ventricles -->
  <path d="M196 186 Q182 192 180 200 Q190 204 206 200 Z" fill="#5a2a2a" opacity=".6"/>
  <path d="M264 186 Q278 192 280 200 Q270 204 254 200 Z" fill="#5a2a2a" opacity=".6"/>
  <!-- thyroarytenoid / vocalis -->
  <path d="M180 204 L214 210 L220 222 L176 236 Z" fill="var(--fig-muscle)" opacity=".85" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M280 204 L246 210 L240 222 L284 236 Z" fill="var(--fig-muscle)" opacity=".85" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- vocal fold edges (cover) -->
  <path d="M206 206 Q222 212 222 220 Q214 222 208 220 Z" fill="#f4eee6" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M254 206 Q238 212 238 220 Q246 222 252 220 Z" fill="#f4eee6" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- conus elasticus -->
  <path d="M220 222 L172 262" fill="none" stroke="#9c94c0" stroke-width="2.4"/>
  <path d="M240 222 L288 262" fill="none" stroke="#9c94c0" stroke-width="2.4"/>
  <!-- epiglottis tip -->
  <path d="M222 42 Q230 30 238 42 L234 96 L226 96 Z" fill="var(--fig-auricle, #e8cf9a)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- subsite brackets -->
  <g stroke="var(--fig-stroke)" stroke-width=".9" fill="none">
    <path d="M372 60 L380 60 L380 200 L372 200"/><path d="M372 204 L380 204 L380 232 L372 232"/><path d="M372 236 L380 236 L380 346 L372 346"/>
  </g>
  <text x="386" y="134" class="fig-label small">Supraglottis</text>
  <text x="386" y="222" class="fig-label small">Glottis</text>
  <text x="386" y="294" class="fig-label small">Subglottis</text>
  <!-- labels -->
  <text x="230" y="16" class="fig-label small" text-anchor="middle">Hyoid</text>
  <text x="8" y="60" class="fig-label small">Thyrohyoid membrane</text>
  <text x="8" y="120" class="fig-label small">Thyroid cartilage</text>
  <line x1="92" y1="117" x2="114" y2="130" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="150" class="fig-label small">Paraglottic space</text>
  <line x1="98" y1="147" x2="150" y2="160" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="176" class="fig-label small">Vestibular fold</text>
  <line x1="88" y1="173" x2="188" y2="170" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="200" class="fig-label small">Ventricle</text>
  <line x1="62" y1="197" x2="184" y2="198" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="226" class="fig-label small">Vocal fold / vocalis</text>
  <line x1="106" y1="223" x2="196" y2="220" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="262" class="fig-label small">Conus elasticus</text>
  <line x1="92" y1="259" x2="186" y2="250" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="306" class="fig-label small">Cricoid</text>
  <line x1="48" y1="303" x2="150" y2="303" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="244" y="76" class="fig-label small">Epiglottis</text>
  <text x="300" y="56" class="fig-label small">Quadrangular membrane</text>
</svg>`,

  carotidTriangle: `
<svg viewBox="0 0 460 400" role="img" aria-label="The right carotid triangle in lateral view with its boundaries, the carotid bifurcation, jugular vein and nerves">
  <!-- mandible and mastoid -->
  <path d="M250 20 L440 26 L440 60 Q350 70 290 92 Q262 100 250 80 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <ellipse cx="96" cy="44" rx="20" ry="26" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- hyoid and thyroid cartilage -->
  <ellipse cx="330" cy="168" rx="26" ry="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M330 196 L400 192 L404 262 L346 270 Z" fill="var(--fig-auricle, #e7c3b4)" stroke="var(--fig-stroke)"/>
  <!-- triangle shading -->
  <path d="M120 74 L306 166 L250 300 Z" fill="#7fb8e6" opacity=".18"/>
  <!-- sternocleidomastoid -->
  <path d="M84 60 L120 60 L300 392 L240 392 Z" fill="var(--fig-muscle)" opacity=".45" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- posterior belly of digastric and omohyoid -->
  <path d="M110 66 Q210 110 306 164" fill="none" stroke="var(--fig-muscle)" stroke-width="10" stroke-linecap="round" opacity=".85"/>
  <path d="M318 176 Q290 240 234 320 Q210 352 180 372" fill="none" stroke="var(--fig-muscle)" stroke-width="9" stroke-linecap="round" opacity=".85"/>
  <!-- internal jugular vein (lateral) -->
  <path d="M150 40 Q160 160 186 250 Q206 330 226 400" fill="none" stroke="var(--fig-vein)" stroke-width="14" opacity=".85"/>
  <!-- common facial vein -->
  <path d="M300 116 Q260 160 214 186" fill="none" stroke="var(--fig-vein)" stroke-width="5"/>
  <!-- carotids -->
  <g fill="none" stroke="var(--fig-artery)" stroke-linecap="round">
    <path d="M262 400 Q246 300 232 222" stroke-width="10"/>
    <path d="M232 222 Q214 150 196 40" stroke-width="8"/>
    <path d="M232 222 Q240 160 262 40" stroke-width="7"/>
    <!-- branches of the external carotid -->
    <path d="M238 196 Q272 206 310 238" stroke-width="3.5"/>
    <path d="M244 172 Q266 158 280 168 Q298 174 322 154" stroke-width="3.5"/>
    <path d="M248 140 Q290 120 330 96" stroke-width="3.5"/>
    <path d="M252 104 Q210 96 150 86" stroke-width="3.5"/>
  </g>
  <!-- vagus (behind, dashed) -->
  <path d="M190 40 Q204 160 226 250 Q240 330 250 400" fill="none" stroke="var(--fig-nerve)" stroke-width="3" stroke-dasharray="6 4"/>
  <!-- hypoglossal nerve crossing the carotids, and the ansa -->
  <g fill="none" stroke="var(--fig-nerve)" stroke-linecap="round">
    <path d="M176 40 Q180 108 186 118 Q200 130 236 132 Q290 134 350 138" stroke-width="3.2"/>
    <path d="M240 134 Q244 220 250 300 Q252 318 238 324" stroke-width="1.8"/>
    <path d="M150 196 Q190 280 238 324" stroke-width="1.8"/>
  </g>
  <!-- labels -->
  <text x="8" y="40" class="fig-label small">Mastoid</text>
  <text x="380" y="16" class="fig-label small">Mandible</text>
  <text x="300" y="192" class="fig-label small">Hyoid</text>
  <text x="410" y="236" class="fig-label small">Larynx</text>
  <text x="120" y="108" class="fig-label small" transform="rotate(26 120 108)">Post. belly digastric</text>
  <text x="196" y="364" class="fig-label small" transform="rotate(-52 196 364)">Omohyoid</text>
  <text x="44" y="246" class="fig-label small" transform="rotate(62 44 246)">Sternocleidomastoid</text>
  <text x="8" y="160" class="fig-label small">IJV</text>
  <line x1="30" y1="157" x2="168" y2="157" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="292" class="fig-label small">Vagus (in sheath)</text>
  <line x1="98" y1="289" x2="234" y2="289" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="8" y="214" class="fig-label small">Ansa cervicalis</text>
  <line x1="88" y1="211" x2="162" y2="214" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="268" y="360" class="fig-label small">Common carotid</text>
  <text x="150" y="28" class="fig-label small">ICA</text>
  <text x="266" y="28" class="fig-label small">ECA</text>
  <text x="330" y="88" class="fig-label small">Facial a.</text>
  <text x="362" y="160" class="fig-label small">Lingual a.</text>
  <line x1="360" y1="157" x2="324" y2="154" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="316" y="252" class="fig-label small">Sup. thyroid a.</text>
  <text x="94" y="80" class="fig-label small">Occipital a.</text>
  <text x="356" y="140" class="fig-label small">XII</text>
  <text x="8" y="128" class="fig-label small">Common facial v.</text>
  <line x1="100" y1="125" x2="256" y2="160" stroke="var(--fig-stroke)" stroke-width=".7"/>
  <text x="250" y="226" class="fig-label small">Bifurcation</text>
</svg>`,

  skullBase: `
<svg viewBox="0 0 460 460" role="img" aria-label="Internal skull base seen from above with the foramina of the right side labelled with their contents">
  <!-- outline of the cranial cavity -->
  <path d="M230 18 Q330 22 372 110 Q404 190 396 270 Q386 360 330 404 Q280 432 230 432 Q180 432 130 404 Q74 360 64 270 Q56 190 88 110 Q130 22 230 18 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- anterior fossa / lesser wings -->
  <path d="M96 150 Q160 128 206 152 L254 152 Q300 128 364 150" fill="none" stroke="var(--fig-stroke)" stroke-width="2"/>
  <!-- petrous ridges -->
  <path d="M84 300 L196 232 M376 300 L264 232" fill="none" stroke="var(--fig-stroke)" stroke-width="3"/>
  <!-- cribriform plate -->
  <rect x="214" y="70" width="32" height="64" rx="10" fill="#cdbb94" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <g fill="var(--fig-stroke)" opacity=".6">
    <circle cx="222" cy="84" r="1.6"/><circle cx="230" cy="84" r="1.6"/><circle cx="238" cy="84" r="1.6"/>
    <circle cx="222" cy="98" r="1.6"/><circle cx="230" cy="98" r="1.6"/><circle cx="238" cy="98" r="1.6"/>
    <circle cx="222" cy="112" r="1.6"/><circle cx="230" cy="112" r="1.6"/><circle cx="238" cy="112" r="1.6"/>
  </g>
  <!-- sella and clivus -->
  <ellipse cx="230" cy="190" rx="22" ry="16" fill="#e6c8a8" stroke="var(--fig-stroke)"/>
  <path d="M214 214 L246 214 L240 330 L220 330 Z" fill="#d9c9a2" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- foramen magnum -->
  <ellipse cx="230" cy="352" rx="30" ry="34" fill="#3b3226" stroke="var(--fig-stroke)"/>
  <!-- right-side foramina (image right: seen from above, anterior at the top) -->
  <g transform="translate(460 0) scale(-1 1)" fill="#3b3226" stroke="var(--fig-stroke)" stroke-width=".8">
    <ellipse cx="206" cy="160" rx="5" ry="4"/>
    <path d="M200 168 Q176 172 150 160 L148 166 Q178 182 198 174 Z"/>
    <circle cx="186" cy="188" r="4"/>
    <ellipse cx="176" cy="212" rx="7" ry="4.5"/>
    <circle cx="160" cy="220" r="3"/>
    <ellipse cx="200" cy="222" rx="5" ry="4"/>
    <ellipse cx="160" cy="268" rx="5" ry="4"/>
    <path d="M168 300 Q184 296 190 306 Q182 316 166 312 Z"/>
    <ellipse cx="196" cy="332" rx="4" ry="3"/>
  </g>
  <!-- labels with contents -->
  <g class="fig-label small">
    <text x="208" text-anchor="end" y="80">Cribriform plate · I</text>
    <text x="452" text-anchor="end" y="140">Optic canal · II, ophthalmic a.</text>
    <text x="452" text-anchor="end" y="160">Sup. orbital fissure · III, IV, V1, VI</text>
    <text x="452" text-anchor="end" y="186">F. rotundum · V2</text>
    <text x="452" text-anchor="end" y="208">F. ovale · V3</text>
    <text x="452" text-anchor="end" y="246">F. spinosum · middle meningeal a.</text>
    <text x="208" text-anchor="end" y="232">F. lacerum (carotid passes above)</text>
    <text x="452" text-anchor="end" y="262">Int. acoustic meatus · VII, VIII</text>
    <text x="452" text-anchor="end" y="300">Jugular foramen · IX, X, XI, IJV</text>
    <text x="452" text-anchor="end" y="336">Hypoglossal canal · XII</text>
    <text x="192" text-anchor="end" y="352">Foramen magnum · medulla,</text>
    <text x="192" text-anchor="end" y="366">vertebral aa., spinal root of XI</text>
    <text x="208" text-anchor="end" y="194">Sella · pituitary</text>
    <text x="160" text-anchor="end" y="120">Anterior fossa</text>
    <text x="130" text-anchor="end" y="262">Middle fossa</text>
    <text x="160" text-anchor="end" y="300">Posterior fossa</text>
    <text x="196" y="430">Posterior</text>
    <text x="200" y="14">Anterior</text>
  </g>
  <g transform="translate(460 0) scale(-1 1)" stroke="var(--fig-stroke)" stroke-width=".7">
    <line x1="134" y1="137" x2="202" y2="158"/><line x1="160" y1="157" x2="170" y2="168"/>
    <line x1="90" y1="183" x2="182" y2="188"/><line x1="70" y1="205" x2="168" y2="211"/>
    <line x1="130" y1="242" x2="158" y2="222"/><line x1="250" y1="229" x2="206" y2="222"/>
    <line x1="140" y1="259" x2="155" y2="266"/><line x1="140" y1="297" x2="166" y2="304"/>
    <line x1="118" y1="333" x2="192" y2="332"/>
  </g>
  <text x="8" y="452" class="fig-label small">Seen from above, anterior at the top: the patient's right (labelled) is on the right</text>
</svg>`,
  neckSpacesAxial: `
<svg viewBox="0 0 460 400" role="img" aria-label="Axial section at the level of the oropharynx showing the parapharyngeal, masticator, parotid, carotid, peritonsillar, retropharyngeal, danger and prevertebral spaces">
  <!-- skin outline -->
  <path d="M230 18 Q330 22 390 110 Q430 190 410 270 Q380 360 230 386 Q80 360 50 270 Q30 190 70 110 Q130 22 230 18 Z" fill="none" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <!-- mandible body, tongue -->
  <path d="M120 120 Q130 40 230 34 Q330 40 340 120 L326 122 Q316 54 230 50 Q144 54 134 122 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <ellipse cx="230" cy="104" rx="64" ry="42" fill="var(--fig-muscle)" opacity=".3" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <!-- paired structures: drawn on the image left (patient's right) and mirrored -->
  <g id="nsa-half">
    <!-- masticator space: masseter, ramus, medial pterygoid -->
    <path d="M56 118 L128 112 L134 206 L60 208 Z" fill="#f08a4b" opacity=".32" stroke="#f08a4b" stroke-width="1.2"/>
    <rect x="64" y="122" width="18" height="78" rx="6" fill="var(--fig-muscle)" opacity=".55"/>
    <rect x="86" y="124" width="12" height="74" rx="3" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
    <path d="M102 132 L124 140 L126 196 L104 196 Z" fill="var(--fig-muscle)" opacity=".55"/>
    <!-- parapharyngeal space (fat) -->
    <path d="M132 140 L170 150 L176 204 L138 208 Z" fill="#f2c14e" opacity=".55" stroke="#c99a1e" stroke-width="1"/>
    <!-- peritonsillar space and tonsil -->
    <ellipse cx="180" cy="164" rx="9" ry="15" fill="#ff9db0" opacity=".7"/>
    <ellipse cx="188" cy="164" rx="6" ry="12" fill="#c9a0d8" stroke="var(--fig-stroke)" stroke-width=".6"/>
    <!-- parotid space -->
    <path d="M48 214 L132 212 L140 262 L82 286 L46 250 Z" fill="#f7d76b" opacity=".55" stroke="#c9a52e" stroke-width="1"/>
    <circle cx="104" cy="236" r="5" fill="var(--fig-vein)"/>
    <!-- styloid process -->
    <circle cx="140" cy="216" r="4" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
    <!-- carotid space: ICA, IJV, vagus -->
    <ellipse cx="164" cy="234" rx="24" ry="16" fill="#e57fb0" opacity=".4" stroke="#c4528a" stroke-width="1"/>
    <circle cx="174" cy="228" r="6" fill="var(--fig-artery)"/>
    <circle cx="154" cy="238" r="8" fill="var(--fig-vein)"/>
    <circle cx="166" cy="243" r="2.6" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".4"/>
    <!-- longus capitis -->
    <ellipse cx="210" cy="228" rx="13" ry="8" fill="var(--fig-muscle)" opacity=".55"/>
    <!-- paraspinal muscles -->
    <path d="M160 270 Q190 260 214 280 L214 340 Q170 340 150 310 Z" fill="var(--fig-muscle)" opacity=".4"/>
  </g>
  <use href="#nsa-half" transform="translate(460 0) scale(-1 1)"/>
  <!-- pharynx: constrictor ring and airway -->
  <ellipse cx="230" cy="170" rx="46" ry="32" fill="var(--fig-muscle)" opacity=".5" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <ellipse cx="230" cy="168" rx="28" ry="16" fill="#3b3226"/>
  <!-- buccopharyngeal fascia -->
  <ellipse cx="230" cy="170" rx="50" ry="36" fill="none" stroke="var(--fig-stroke)" stroke-dasharray="3 2" stroke-width=".8"/>
  <!-- retropharyngeal, alar fascia, danger, prevertebral fascia -->
  <path d="M190 202 Q230 214 270 202 L272 209 Q230 221 188 209 Z" fill="#5fb3ff" opacity=".85"/>
  <path d="M188 209 Q230 221 272 209 L274 215 Q230 227 186 215 Z" fill="#e0503c" opacity=".85"/>
  <path d="M184 216 Q230 228 276 216 L280 282 Q230 296 180 282 Z" fill="#9b7be0" opacity=".3" stroke="#7d5cc4" stroke-width="1"/>
  <!-- vertebral body, cord -->
  <ellipse cx="230" cy="252" rx="26" ry="20" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M206 266 Q200 300 214 312 L246 312 Q260 300 254 266" fill="none" stroke="var(--fig-stroke)" stroke-width="5" opacity=".5"/>
  <circle cx="230" cy="292" r="11" fill="#3b3226"/>
  <circle cx="230" cy="292" r="6" fill="#e8d9b0"/>
  <!-- labels -->
  <g class="fig-label small">
    <text x="6" y="100">Masticator space</text>
    <text x="6" y="112">(masseter, ramus, pterygoids, V3)</text>
    <text x="6" y="300">Parotid space</text>
    <text x="6" y="312">(retromandibular v., VII)</text>
    <text x="300" y="316" text-anchor="start">Carotid space</text>
    <text x="300" y="328" text-anchor="start">(ICA, IJV, X)</text>
    <text x="6" y="156" font-weight="600">Parapharyngeal</text>
    <text x="6" y="168" font-weight="600">space (fat)</text>
    <text x="300" y="104" text-anchor="start">Peritonsillar space</text>
    <text x="300" y="196" text-anchor="start">Pharynx · buccopharyngeal</text>
    <text x="300" y="208" text-anchor="start">fascia (dashed)</text>
    <text x="320" y="236">Retropharyngeal</text>
    <text x="320" y="250">Danger</text>
    <text x="320" y="264">Prevertebral</text>
  </g>
  <g stroke="var(--fig-stroke)" stroke-width=".7" fill="none">
    <line x1="60" y1="114" x2="70" y2="130"/>
    <line x1="56" y1="302" x2="70" y2="270"/>
    <line x1="298" y1="318" x2="290" y2="244"/>
    <line x1="88" y1="164" x2="150" y2="176"/>
    <line x1="306" y1="108" x2="276" y2="160"/>
    <line x1="298" y1="198" x2="276" y2="186"/>
    <line x1="318" y1="233" x2="264" y2="208"/>
    <line x1="318" y1="247" x2="268" y2="214"/>
    <line x1="318" y1="261" x2="272" y2="250"/>
  </g>
  <text x="6" y="374" class="fig-label small">Seen from below as on CT: anterior at the top, the patient's right on the image left.</text>
  <text x="6" y="388" class="fig-label small">The styloid process (dot) divides the parapharyngeal space into pre- and post-styloid parts.</text>
</svg>`,

  neckSpacesSagittal: `
<svg viewBox="0 0 540 490" role="img" aria-label="Midline sagittal view showing the retropharyngeal space ending at T1 to T2, the danger space reaching the diaphragm and the prevertebral space reaching the coccyx">
  <!-- skull base -->
  <path d="M40 30 L330 30 L360 50 L330 62 L250 52 L60 52 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- mandible, tongue, hyoid -->
  <path d="M30 150 Q34 128 60 126 L72 126 L72 176 L44 184 Q30 176 30 150 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M74 120 Q110 70 200 84 Q236 96 236 140 Q220 170 160 172 L80 168 Z" fill="var(--fig-muscle)" opacity=".3" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <ellipse cx="150" cy="190" rx="14" ry="6" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- larynx and trachea -->
  <path d="M168 200 L222 204 L222 460 L188 460 L188 286 Q166 260 168 200 Z" fill="#d9b8a8" opacity=".6" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- pharynx and oesophagus -->
  <path d="M238 56 L268 56 L268 460 L238 460 Z" fill="var(--fig-muscle)" opacity=".45" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M236 56 Q228 120 236 196 L236 286" fill="none" stroke="#3b3226" stroke-width="2"/>
  <!-- visceral (pretracheal) space between airway and oesophagus front -->
  <path d="M222 286 L236 286 L236 460 L222 460 Z" fill="#6fcf97" opacity=".35"/>
  <!-- retropharyngeal space: skull base to T1-T2 -->
  <path d="M268 52 L276 52 L276 312 Q272 324 268 330 Z" fill="#5fb3ff" opacity=".9"/>
  <!-- danger space: skull base to diaphragm -->
  <path d="M276 52 L284 52 L284 452 L276 452 Z" fill="#e0503c" opacity=".85"/>
  <path d="M280 450 L280 464" stroke="#e0503c" stroke-width="2"/>
  <path d="M274 458 L280 468 L286 458 Z" fill="#e0503c"/>
  <!-- prevertebral space: skull base to coccyx -->
  <path d="M284 52 L298 52 L298 452 L284 452 Z" fill="#9b7be0" opacity=".45" stroke="#7d5cc4" stroke-width=".8"/>
  <path d="M291 450 L291 464" stroke="#7d5cc4" stroke-width="2"/>
  <path d="M285 458 L291 468 L297 458 Z" fill="#7d5cc4"/>
  <!-- vertebral column -->
  <g fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8">
    <rect x="300" y="66" width="18" height="14" rx="3"/>
    <path d="M300 86 L340 86 L340 120 L300 120 Z M314 66 L322 86 L310 86 Z"/>
    <rect x="300" y="125" width="40" height="22" rx="3"/>
    <rect x="300" y="152" width="40" height="22" rx="3"/>
    <rect x="300" y="179" width="40" height="22" rx="3"/>
    <rect x="300" y="206" width="40" height="22" rx="3"/>
    <rect x="300" y="233" width="40" height="22" rx="3"/>
    <rect x="300" y="260" width="40" height="22" rx="3"/>
    <rect x="300" y="287" width="40" height="23" rx="3"/>
    <rect x="300" y="315" width="40" height="23" rx="3"/>
    <rect x="300" y="343" width="40" height="23" rx="3"/>
    <rect x="300" y="371" width="40" height="23" rx="3"/>
    <rect x="300" y="399" width="40" height="23" rx="3"/>
    <rect x="300" y="427" width="40" height="23" rx="3"/>
  </g>
  <rect x="344" y="66" width="18" height="390" fill="#3b3226" opacity=".25"/>
  <g class="fig-label small">
    <text x="304" y="77">C1</text><text x="312" y="107">C2</text><text x="312" y="140">C3</text>
    <text x="312" y="221">C6</text><text x="312" y="275">T1</text><text x="312" y="303">T2</text>
    <text x="312" y="414">T6</text>
  </g>
  <!-- sternum -->
  <path d="M120 300 L150 296 L156 460 L126 460 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- labels -->
  <g class="fig-label small">
    <text x="370" y="120">Retropharyngeal</text>
    <text x="370" y="132">skull base → T1–T2</text>
    <text x="370" y="168">Alar fascia</text>
    <text x="370" y="200">Danger space</text>
    <text x="370" y="212">skull base → diaphragm</text>
    <text x="370" y="252">Prevertebral</text>
    <text x="370" y="264">skull base → coccyx</text>
    <text x="370" y="340">Alar fascia fuses</text>
    <text x="370" y="352">with visceral fascia</text>
    <text x="6" y="230">Hyoid</text>
    <text x="6" y="276">Visceral space →</text>
    <text x="6" y="288">anterior mediastinum</text>
    <text x="160" y="482">Pharynx / oesophagus</text>
    <text x="80" y="78">Tongue</text>
  </g>
  <g stroke="var(--fig-stroke)" stroke-width=".7" fill="none">
    <line x1="368" y1="124" x2="274" y2="124"/>
    <line x1="368" y1="165" x2="277" y2="165"/>
    <line x1="368" y1="204" x2="282" y2="204"/>
    <line x1="368" y1="256" x2="292" y2="256"/>
    <line x1="368" y1="344" x2="272" y2="326"/>
    <line x1="40" y1="226" x2="136" y2="192"/>
    <line x1="110" y1="282" x2="226" y2="300"/>
  </g>
  <text x="6" y="14" class="fig-label small">Midline sagittal, anterior on the left.</text>
  <text x="380" y="420" class="fig-label small">Danger-space infection</text>
  <text x="380" y="432" class="fig-label small">can reach the posterior</text>
  <text x="380" y="444" class="fig-label small">mediastinum</text>
</svg>`,

  infratemporalFossa: `
<svg viewBox="0 0 580 440" role="img" aria-label="Right infratemporal fossa seen from the side with the ramus and zygomatic arch removed: lateral and medial pterygoids, maxillary artery and its branches, and the branches of the mandibular nerve">
  <!-- skull base roof, zygomatic arch stumps, mastoid and styloid -->
  <path d="M70 62 Q230 44 470 66 L476 100 Q330 94 170 104 L76 110 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <rect x="130" y="70" width="40" height="18" rx="4" fill="none" stroke="var(--fig-stroke)" stroke-dasharray="3 2"/>
  <rect x="420" y="72" width="44" height="18" rx="4" fill="none" stroke="var(--fig-stroke)" stroke-dasharray="3 2"/>
  <path d="M136 104 Q160 128 186 108" fill="none" stroke="var(--fig-stroke)" stroke-width="1.5"/>
  <path d="M80 110 L106 112 L112 160 L88 168 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M122 118 L130 120 L144 196 L138 198 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- maxilla and lateral pterygoid plate -->
  <path d="M466 100 Q484 150 480 230 Q474 276 448 280 Q424 276 428 240 L436 104 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M382 104 L402 104 L400 280 L380 272 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- mandible body, ramus removed (dashed outline) -->
  <path d="M214 344 Q280 366 520 358 L526 398 Q320 410 210 386 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <path d="M214 344 Q182 260 186 150 L200 120 M276 356 Q254 260 316 160 L344 126" fill="none" stroke="var(--fig-stroke)" stroke-dasharray="4 3"/>
  <!-- medial pterygoid (deep), lateral pterygoid upper and lower heads -->
  <path d="M382 204 L400 242 L244 356 L216 340 Z" fill="var(--fig-muscle)" opacity=".4" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M386 108 L398 130 L206 138 L204 126 Z" fill="var(--fig-muscle)" opacity=".75" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <path d="M382 142 L398 202 L208 162 L206 146 Z" fill="var(--fig-muscle)" opacity=".75" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- foramen ovale and spinosum (in the roof, seen through) -->
  <circle cx="246" cy="100" r="5" fill="#3b3226"/>
  <circle cx="216" cy="98" r="3" fill="#3b3226"/>
  <!-- arteries -->
  <g fill="none" stroke="var(--fig-artery)" stroke-linecap="round">
    <path d="M160 440 L162 212" stroke-width="6"/>
    <path d="M162 214 Q158 130 154 30" stroke-width="3.5"/>
    <path d="M162 214 Q196 182 260 174 Q320 168 372 162 L414 158" stroke-width="4.5"/>
    <path d="M200 184 Q206 130 214 100" stroke-width="2.4"/>
    <path d="M210 182 Q236 240 254 306" stroke-width="2.2"/>
    <path d="M300 172 Q304 120 306 62" stroke-width="1.8"/>
    <path d="M346 166 Q350 120 352 62" stroke-width="1.8"/>
    <path d="M362 164 Q400 220 440 284" stroke-width="1.6"/>
    <path d="M398 160 Q420 180 432 214" stroke-width="1.6"/>
  </g>
  <!-- nerves -->
  <g fill="none" stroke="var(--fig-nerve)" stroke-linecap="round">
    <path d="M250 162 Q254 240 254 306" stroke-width="3"/>
    <path d="M254 306 Q320 350 512 372" stroke-width="2" stroke-dasharray="5 3"/>
    <path d="M264 162 Q290 260 316 326 Q350 352 410 352" stroke-width="3"/>
    <path d="M190 146 Q226 168 262 204" stroke-width="1.4"/>
    <path d="M374 140 Q408 206 444 278" stroke-width="2"/>
    <path d="M282 118 Q252 114 222 112" stroke-width="2"/>
    <path d="M292 116 Q296 88 298 58" stroke-width="1.6"/>
    <path d="M336 116 Q340 88 342 58" stroke-width="1.6"/>
    <path d="M236 126 Q222 116 206 120 Q192 126 178 112 Q164 96 148 34" stroke-width="2"/>
    <path d="M236 126 Q220 140 206 136 Q196 132 192 124" stroke-width="2"/>
  </g>
  <!-- labels with leaders -->
  <g class="fig-label small">
    <text x="6" y="28">Auriculotemporal n.</text>
    <text x="6" y="40">and sup. temporal a.</text>
    <text x="6" y="92">Masseteric n. (to the notch)</text>
    <text x="6" y="136">Middle meningeal a.</text>
    <text x="6" y="240">Chorda tympani</text>
    <text x="6" y="200">Maxillary a.</text>
    <text x="6" y="330">External carotid a.</text>
    <text x="250" y="28">F. ovale (V3)</text>
    <text x="300" y="46">Deep temporal nn. and aa.</text>
    <text x="490" y="122">Lat. pterygoid,</text>
    <text x="490" y="134">upper head</text>
    <text x="490" y="168">PTM fissure</text>
    <text x="490" y="190">Lower head</text>
    <text x="490" y="224">Post. sup.</text>
    <text x="490" y="236">alveolar a.</text>
    <text x="490" y="266">Medial pterygoid</text>
    <text x="490" y="292">Buccal n. and a.</text>
    <text x="490" y="340">Lingual n.</text>
    <text x="300" y="432">Inferior alveolar n. and a. to the mandibular foramen</text>
  </g>
  <g stroke="var(--fig-stroke)" stroke-width=".6" fill="none">
    <line x1="100" y1="36" x2="150" y2="44"/>
    <line x1="150" y1="90" x2="228" y2="112"/>
    <line x1="106" y1="133" x2="206" y2="130"/>
    <line x1="88" y1="236" x2="226" y2="172"/>
    <line x1="66" y1="196" x2="186" y2="190"/>
    <line x1="108" y1="326" x2="160" y2="326"/>
    <line x1="268" y1="32" x2="248" y2="94"/>
    <line x1="488" y1="126" x2="330" y2="126"/>
    <line x1="488" y1="164" x2="414" y2="158"/>
    <line x1="488" y1="186" x2="350" y2="180"/>
    <line x1="488" y1="228" x2="432" y2="212"/>
    <line x1="488" y1="262" x2="340" y2="262"/>
    <line x1="488" y1="288" x2="442" y2="280"/>
    <line x1="488" y1="336" x2="406" y2="350"/>
    <line x1="298" y1="424" x2="256" y2="312"/>
  </g>
  <text x="6" y="416" class="fig-label small">Right side, anterior to the right.</text>
  <text x="6" y="428" class="fig-label small">Ramus outline dashed.</text>
</svg>`,

  maxillaryArtery: `
<svg viewBox="0 0 530 340" role="img" aria-label="Diagram of the maxillary artery in three parts defined by the lateral pterygoid, with the branches of each part">
  <!-- lateral pterygoid as the reference -->
  <rect x="190" y="118" width="140" height="44" rx="10" fill="var(--fig-muscle)" opacity=".5" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="260" y="246" text-anchor="middle" class="fig-label small">Lateral pterygoid (lower head)</text>
  <!-- the artery in three parts -->
  <path d="M30 140 L190 140" stroke="var(--fig-artery)" stroke-width="7" stroke-linecap="round"/>
  <path d="M190 140 L330 140" stroke="var(--fig-artery)" stroke-width="7" opacity=".75"/>
  <path d="M330 140 L490 140" stroke="var(--fig-artery)" stroke-width="7" stroke-linecap="round" opacity=".55"/>
  <g class="fig-label" font-weight="600">
    <text x="110" y="128" text-anchor="middle">1st · mandibular</text>
    <text x="260" y="110" text-anchor="middle">2nd · pterygoid</text>
    <text x="410" y="128" text-anchor="middle">3rd · pterygopalatine</text>
  </g>
  <g class="fig-label small">
    <text x="110" y="290" text-anchor="middle">behind lateral pterygoid,</text>
    <text x="110" y="302" text-anchor="middle">between neck of mandible</text>
    <text x="110" y="314" text-anchor="middle">and sphenomandibular lig.</text>
    <text x="260" y="290" text-anchor="middle">on (usually superficial to)</text>
    <text x="260" y="302" text-anchor="middle">the lower head</text>
    <text x="410" y="290" text-anchor="middle">in the pterygopalatine fossa,</text>
    <text x="410" y="302" text-anchor="middle">through the PTM fissure</text>
  </g>
  <!-- branches: 1st part (go through bone) -->
  <g stroke="var(--fig-artery)" stroke-width="2" fill="none">
    <path d="M50 140 L44 96"/><path d="M78 140 L76 90"/><path d="M110 140 L114 70"/><path d="M140 140 L150 84"/><path d="M168 140 L172 200"/>
    <path d="M220 140 L214 92"/><path d="M250 140 L254 86"/><path d="M290 140 L296 92"/><path d="M316 140 L322 196"/>
    <path d="M350 140 L344 92"/><path d="M380 140 L384 80"/><path d="M410 140 L414 196"/><path d="M440 140 L446 90"/><path d="M466 140 L472 196"/><path d="M488 140 L516 120"/>
  </g>
  <g class="fig-label small">
    <text x="44" y="92" text-anchor="middle" transform="rotate(-50 44 92)">Deep auricular</text>
    <text x="76" y="86" text-anchor="middle" transform="rotate(-50 76 86)">Ant. tympanic</text>
    <text x="114" y="64" text-anchor="middle" font-weight="600">Middle meningeal</text>
    <text x="150" y="80" text-anchor="start" transform="rotate(-40 150 80)">Accessory meningeal</text>
    <text x="168" y="212" text-anchor="end">Inferior alveolar</text>
    <text x="214" y="88" text-anchor="middle" transform="rotate(-50 214 88)">Deep temporal</text>
    <text x="254" y="82" text-anchor="middle" transform="rotate(-50 254 82)">Pterygoid</text>
    <text x="296" y="88" text-anchor="middle" transform="rotate(-50 296 88)">Masseteric</text>
    <text x="312" y="212" text-anchor="end">Buccal</text>
    <text x="344" y="88" text-anchor="middle" transform="rotate(-50 344 88)">Post. sup. alveolar</text>
    <text x="384" y="76" text-anchor="middle" transform="rotate(-50 384 76)">Infraorbital</text>
    <text x="414" y="212" text-anchor="end">Desc. palatine</text>
    <text x="446" y="86" text-anchor="middle" transform="rotate(-50 446 86)">Pterygoid canal</text>
    <text x="476" y="212" text-anchor="start">Pharyngeal</text>
    <text x="526" y="112" text-anchor="end" font-weight="600">Sphenopalatine</text>
  </g>
  <text x="8" y="334" class="fig-label small">From the neck of the mandible (left) towards the nose (right).</text>
</svg>`,

  pterygopalatineFossa: `
<svg viewBox="0 0 600 440" role="img" aria-label="Diagram of the pterygopalatine fossa and its seven openings, with the structures passing through each">
  <line x1="105" y1="60" x2="270" y2="160" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="105" y1="180" x2="260" y2="200" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="105" y1="300" x2="272" y2="240" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="495" y1="60" x2="320" y2="158" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="495" y1="180" x2="340" y2="200" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="495" y1="300" x2="330" y2="240" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <line x1="300" y1="390" x2="300" y2="290" stroke="var(--fig-stroke)" stroke-width="1" stroke-dasharray="4 3"/>
  <!-- the fossa: inverted pyramid -->
  <path d="M246 150 L354 150 L312 300 L288 300 Z" fill="#7fb8e6" opacity=".25" stroke="var(--fig-stroke)" stroke-width="1.2"/>
  <path d="M256 168 Q300 160 346 172" fill="none" stroke="var(--fig-nerve)" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="296" cy="190" rx="9" ry="6" fill="#e8a93a" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <line x1="292" y1="172" x2="294" y2="185" stroke="var(--fig-nerve)" stroke-width="1.5"/>
  <path d="M350 232 Q320 226 310 214 Q302 204 320 200" fill="none" stroke="var(--fig-artery)" stroke-width="3" stroke-linecap="round"/>
  <text x="300" y="148" class="fig-label small" text-anchor="middle">V2</text>
  <text x="300" y="214" class="fig-label small" text-anchor="end">Ganglion</text>
  <text x="302" y="262" class="fig-label small" text-anchor="middle">Maxillary a.</text>
  <text x="300" y="276" class="fig-label small" text-anchor="middle">(3rd part)</text>
  <rect x="16" y="30" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="24" y="48" class="fig-label" font-weight="600">Foramen rotundum</text>
  <text x="24" y="64" class="fig-label small">↔ middle cranial fossa</text>
  <text x="24" y="80" class="fig-label small">Maxillary nerve (V2)</text>
  <rect x="16" y="150" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="24" y="168" class="fig-label" font-weight="600">Pterygoid (Vidian) canal</text>
  <text x="24" y="184" class="fig-label small">↔ foramen lacerum</text>
  <text x="24" y="200" class="fig-label small">Vidian nerve and artery</text>
  <rect x="16" y="270" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="24" y="288" class="fig-label" font-weight="600">Palatovaginal canal</text>
  <text x="24" y="304" class="fig-label small">↔ nasopharynx</text>
  <text x="24" y="320" class="fig-label small">Pharyngeal nerve and artery</text>
  <rect x="406" y="30" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="414" y="48" class="fig-label" font-weight="600">Inferior orbital fissure</text>
  <text x="414" y="64" class="fig-label small">↔ orbit</text>
  <text x="414" y="80" class="fig-label small">Infraorbital and zygomatic nn.</text>
  <rect x="406" y="150" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="414" y="168" class="fig-label" font-weight="600">Sphenopalatine foramen</text>
  <text x="414" y="184" class="fig-label small">↔ nasal cavity (medial)</text>
  <text x="414" y="200" class="fig-label small">Sphenopalatine a., nasopalatine n.</text>
  <rect x="406" y="270" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="414" y="288" class="fig-label" font-weight="600">Pterygomaxillary fissure</text>
  <text x="414" y="304" class="fig-label small">↔ infratemporal fossa (lateral)</text>
  <text x="414" y="320" class="fig-label small">Maxillary a. in; PSA nn. out</text>
  <rect x="211" y="360" width="184" height="62" rx="8" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <text x="219" y="378" class="fig-label" font-weight="600">Greater palatine canal</text>
  <text x="219" y="394" class="fig-label small">↔ oral cavity (palate)</text>
  <text x="219" y="410" class="fig-label small">Greater and lesser palatine nn. and aa.</text>
  <text x="8" y="434" class="fig-label small">Schematic, right side. Posterior openings on the left, anterior, medial and lateral on the right.</text>
</svg>`,

  orbitApex: `
<svg viewBox="0 0 560 440" role="img" aria-label="Right orbital apex seen from the front: the common tendinous ring around the optic canal and the medial part of the superior orbital fissure, with the nerves and vessels passing inside and outside it">
  <!-- apex bone -->
  <path d="M70 60 Q280 20 470 70 Q520 220 450 360 Q280 420 110 360 Q30 220 70 60 Z" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- superior orbital fissure: narrow laterally (viewer's left), wide medially -->
  <path d="M96 104 Q170 132 238 186 Q258 206 256 246 Q232 252 214 232 Q160 170 92 116 Z" fill="#3b3226" opacity=".85"/>
  <!-- optic canal -->
  <circle cx="306" cy="168" r="24" fill="#3b3226" opacity=".85"/>
  <circle cx="306" cy="164" r="13" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <circle cx="296" cy="184" r="4.5" fill="var(--fig-artery)"/>
  <!-- common tendinous ring -->
  <ellipse cx="270" cy="210" rx="92" ry="78" fill="none" stroke="#c9b48a" stroke-width="9" opacity=".9"/>
  <!-- rectus origins on the ring -->
  <g fill="var(--fig-muscle)" opacity=".85" stroke="var(--fig-stroke)" stroke-width=".6">
    <rect x="248" y="122" width="44" height="14" rx="4"/>
    <rect x="354" y="190" width="14" height="40" rx="4"/>
    <rect x="248" y="282" width="44" height="14" rx="4"/>
    <rect x="172" y="196" width="14" height="40" rx="4"/>
  </g>
  <!-- levator and superior oblique outside the ring -->
  <rect x="250" y="98" width="46" height="12" rx="4" fill="var(--fig-muscle)" opacity=".55" stroke="var(--fig-stroke)" stroke-width=".6"/>
  <rect x="342" y="112" width="34" height="12" rx="4" fill="var(--fig-muscle)" opacity=".55" stroke="var(--fig-stroke)" stroke-width=".6" transform="rotate(25 359 118)"/>
  <!-- outside the ring, in the lateral fissure: lacrimal, frontal, IV, superior ophthalmic vein -->
  <circle cx="120" cy="118" r="4" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="146" cy="132" r="5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="172" cy="148" r="3.5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="186" cy="166" r="6" fill="var(--fig-vein)"/>
  <!-- inside the ring, in the medial fissure: III superior, nasociliary, III inferior, VI -->
  <circle cx="232" cy="196" r="5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="244" cy="214" r="3.5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="236" cy="234" r="5" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <circle cx="218" cy="222" r="4" fill="var(--fig-nerve)" stroke="var(--fig-stroke)" stroke-width=".5"/>
  <!-- inferior ophthalmic vein below the ring -->
  <circle cx="232" cy="318" r="5" fill="var(--fig-vein)"/>
  <!-- labels -->
  <g class="fig-label small">
    <text x="6" y="24">Lacrimal n.</text>
    <text x="6" y="38">Frontal n.</text>
    <text x="6" y="52">Trochlear n. (IV)</text>
    <text x="6" y="66">Sup. ophthalmic v.</text>
    <text x="6" y="186" font-weight="600">Outside the ring</text>
    <text x="6" y="200">(above it, in the</text>
    <text x="6" y="214">lateral fissure)</text>
    <text x="6" y="268">Sup. division of III</text>
    <text x="6" y="282">Nasociliary n.</text>
    <text x="6" y="296">Inf. division of III</text>
    <text x="6" y="310">Abducens n. (VI)</text>
    <text x="6" y="324" font-weight="600">Inside the ring</text>
    <text x="6" y="400">Inf. ophthalmic v.</text>
    <text x="350" y="160">Optic nerve (II)</text>
    <text x="350" y="174">Ophthalmic a.</text>
    <text x="350" y="188" font-weight="600">Optic canal</text>
    <text x="302" y="90">Levator</text>
    <text x="386" y="104">Sup. oblique</text>
    <text x="244" y="133" text-anchor="end">SR</text>
    <text x="374" y="246">MR</text>
    <text x="300" y="312">IR</text>
    <text x="150" y="250">LR</text>
    <text x="330" y="270">Common tendinous ring</text>
  </g>
  <g stroke="var(--fig-stroke)" stroke-width=".6" fill="none">
    <line x1="64" y1="20" x2="118" y2="114"/>
    <line x1="58" y1="34" x2="144" y2="128"/>
    <line x1="96" y1="48" x2="170" y2="144"/>
    <line x1="106" y1="62" x2="183" y2="161"/>
    <line x1="112" y1="264" x2="229" y2="198"/>
    <line x1="88" y1="278" x2="241" y2="215"/>
    <line x1="110" y1="292" x2="233" y2="236"/>
    <line x1="104" y1="306" x2="215" y2="225"/>
    <line x1="104" y1="396" x2="228" y2="321"/>
    <line x1="348" y1="157" x2="318" y2="162"/>
    <line x1="348" y1="171" x2="301" y2="184"/>
    <line x1="328" y1="266" x2="330" y2="262"/>
  </g>
  <text x="6" y="432" class="fig-label small">Right orbit seen from the front: lateral on the left, medial on the right. Not to scale.</text>
</svg>`,

  ostiomeatalUnit: `
<svg viewBox="0 0 560 470" role="img" aria-label="Coronal section through the right ostiomeatal unit: orbit, ethmoid cells, ethmoid bulla, uncinate process, infundibulum, maxillary sinus and ostium, middle and inferior turbinates, septum and the cribriform plate with the lateral lamella">
  <!-- skull base: fovea ethmoidalis, lateral lamella, cribriform plate -->
  <path d="M120 60 L260 60 L272 98 L300 98" fill="none" stroke="var(--fig-stroke)" stroke-width="4" stroke-linejoin="round"/>
  <path d="M272 98 L300 98" stroke="#d9b27a" stroke-width="4" stroke-dasharray="3 2"/>
  <!-- septum -->
  <rect x="298" y="60" width="8" height="350" fill="var(--fig-bone)" stroke="var(--fig-stroke)" stroke-width=".8"/>
  <!-- orbit with lamina papyracea -->
  <circle cx="130" cy="130" r="62" fill="#f2efe8" stroke="var(--fig-stroke)"/>
  <circle cx="170" cy="150" r="10" fill="var(--fig-muscle)" opacity=".7"/>
  <line x1="200" y1="66" x2="200" y2="186" stroke="var(--fig-stroke)" stroke-width="2"/>
  <!-- ethmoid cells -->
  <g fill="#6fcf97" opacity=".55" stroke="var(--fig-stroke)" stroke-width=".7">
    <rect x="206" y="66" width="28" height="30" rx="8"/><rect x="238" y="70" width="26" height="26" rx="8"/>
    <rect x="206" y="100" width="30" height="32" rx="8"/><rect x="240" y="102" width="26" height="30" rx="8"/>
  </g>
  <!-- ethmoid bulla -->
  <circle cx="234" cy="166" r="24" fill="#6fcf97" opacity=".75" stroke="var(--fig-stroke)"/>
  <!-- middle turbinate hanging from the skull base -->
  <path d="M286 98 L286 150 Q290 205 266 236 Q254 246 258 226 Q274 196 272 150 L272 104" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- maxillary sinus with ostium -->
  <path d="M86 196 L200 192 L204 210 L206 330 Q150 360 90 330 Q66 270 86 196 Z" fill="#f2c14e" opacity=".5" stroke="var(--fig-stroke)"/>
  <rect x="198" y="196" width="10" height="10" fill="#3b3226"/>
  <!-- uncinate process: from the lateral wall, hooking up and back -->
  <path d="M206 250 Q214 222 214 196" fill="none" stroke="var(--fig-stroke)" stroke-width="4" stroke-linecap="round"/>
  <!-- infundibulum (between uncinate and lamina/bulla) -->
  <path d="M204 206 Q208 196 212 190" fill="none" stroke="#2fb7a0" stroke-width="3"/>
  <!-- mucociliary route: sinus → ostium → infundibulum → hiatus → middle meatus -->
  <path d="M150 300 Q180 240 202 202 Q212 186 226 196 Q240 214 246 238" fill="none" stroke="#2fb7a0" stroke-width="2" stroke-dasharray="5 3"/>
  <path d="M242 232 L248 242 L252 230 Z" fill="#2fb7a0"/>
  <!-- inferior turbinate, lateral nasal wall, palate -->
  <line x1="206" y1="250" x2="206" y2="400" stroke="var(--fig-stroke)" stroke-width="2"/>
  <path d="M206 300 Q260 290 262 322 Q262 350 226 352 Q212 350 206 340" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <rect x="80" y="400" width="226" height="14" fill="var(--fig-bone)" stroke="var(--fig-stroke)"/>
  <!-- labels -->
  <g class="fig-label small">
    <text x="330" y="54">Fovea ethmoidalis (ethmoid roof)</text>
    <text x="330" y="96">Lateral lamella + cribriform plate</text>
    <text x="330" y="110">(Keros: depth of this step)</text>
    <text x="330" y="140">Ethmoid cells</text>
    <text x="330" y="172">Ethmoid bulla</text>
    <text x="330" y="200">Lamina papyracea</text>
    <text x="330" y="216">Infundibulum</text>
    <text x="330" y="232">Hiatus semilunaris → middle meatus</text>
    <text x="330" y="252">Uncinate process</text>
    <text x="330" y="268">Middle turbinate</text>
    <text x="330" y="290">Maxillary ostium</text>
    <text x="330" y="330">Inferior turbinate</text>
    <text x="330" y="372">Inferior meatus (nasolacrimal duct)</text>
    <text x="330" y="400">Septum</text>
    <text x="96" y="130">Orbit</text>
    <text x="110" y="280">Maxillary sinus</text>
  </g>
  <g stroke="var(--fig-stroke)" stroke-width=".6" fill="none">
    <line x1="328" y1="51" x2="230" y2="62"/>
    <line x1="328" y1="93" x2="286" y2="99"/>
    <line x1="328" y1="137" x2="266" y2="116"/>
    <line x1="328" y1="169" x2="258" y2="166"/>
    <line x1="328" y1="197" x2="202" y2="150"/>
    <line x1="328" y1="213" x2="210" y2="198"/>
    <line x1="328" y1="229" x2="244" y2="226"/>
    <line x1="328" y1="249" x2="214" y2="232"/>
    <line x1="328" y1="265" x2="282" y2="200"/>
    <line x1="328" y1="287" x2="206" y2="202"/>
    <line x1="328" y1="327" x2="262" y2="324"/>
    <line x1="328" y1="369" x2="222" y2="372"/>
    <line x1="328" y1="397" x2="306" y2="380"/>
  </g>
  <text x="6" y="438" class="fig-label small">Seen from the front as on coronal CT: the patient's right side, lateral on the left, septum at the midline.</text>
  <text x="6" y="454" class="fig-label small">Teal: mucociliary route from the maxillary sinus. Not to scale.</text>
</svg>`
};
