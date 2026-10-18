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
  <text x="14" y="16" class="fig-label small">R</text><text x="440" y="16" class="fig-label small">L</text>
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
</svg>`
};
