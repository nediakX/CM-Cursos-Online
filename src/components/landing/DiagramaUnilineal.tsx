/**
 * Diagrama unilineal de una vivienda con sistema fotovoltaico. Cada componente
 * indica el módulo del curso donde se aprende. Se dibuja al cargar y luego la
 * corriente (color de acento) recorre los conductores. Con "reducir movimiento"
 * se muestra estático.
 */
const LINEA = 'rgba(255,255,255,0.55)';
const TEXTO = 'rgba(255,255,255,0.92)';
const SUAVE = 'rgba(255,255,255,0.6)';

function Etiqueta({ x, y, titulo, modulo, ancla = 'middle', d }: { x: number; y: number; titulo: string; modulo: string; ancla?: 'start' | 'middle' | 'end'; d: number }) {
  return (
    <g className="simbolo" style={{ ['--d' as string]: `${d}s` }}>
      <text x={x} y={y} textAnchor={ancla} fill={TEXTO} fontSize="13" fontWeight="650" style={{ fontVariationSettings: "'wdth' 108" }}>
        {titulo}
      </text>
      <text x={x} y={y + 15} textAnchor={ancla} fill={SUAVE} fontSize="11">
        {modulo}
      </text>
    </g>
  );
}

/** Conductor: trazo base + corriente animada encima. */
function Conductor({ d, retraso, lenta = false }: { d: string; retraso: number; lenta?: boolean }) {
  return (
    <>
      <path d={d} pathLength={1} className="trazo" style={{ ['--d' as string]: `${retraso}s` }} stroke={LINEA} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} pathLength={1} className={`corriente${lenta ? ' lenta' : ''}`} stroke="var(--color-accent)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  );
}

/** Interruptor termomagnético (símbolo simplificado) en un conductor vertical. */
function Protector({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <g className="simbolo" style={{ ['--d' as string]: `${d}s` }} stroke={TEXTO} strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx={x} cy={y} r="2.5" fill={TEXTO} />
      <path d={`M${x} ${y} L${x + 11} ${y + 16}`} />
      <circle cx={x} cy={y + 20} r="2.5" fill={TEXTO} />
    </g>
  );
}

export default function DiagramaUnilineal() {
  const BUS_Y = 286;
  const ramas = [
    { x: 92, titulo: 'Alumbrado', modulo: 'Módulo 7' },
    { x: 222, titulo: 'Enchufes', modulo: 'Módulo 7' },
    { x: 352, titulo: 'Motor', modulo: 'Módulo 8' },
    { x: 474, titulo: 'Puesta a tierra', modulo: 'Módulo 4' },
  ];

  return (
    <figure className="unilineal relative">
      <svg viewBox="0 0 560 470" className="w-full h-auto" role="img" aria-labelledby="unilineal-titulo unilineal-desc">
        <title id="unilineal-titulo">Diagrama unilineal de una instalación eléctrica con energía solar</title>
        <desc id="unilineal-desc">
          La energía llega desde la red a través del empalme y medidor (módulo 6) y desde los paneles fotovoltaicos con su inversor (módulo 9) al tablero
          general (módulo 5), que alimenta los circuitos de alumbrado y enchufes (módulo 7), un motor (módulo 8) y la puesta a tierra (módulo 4).
        </desc>

        {/* ── Conductores ───────────────────────────────────────────── */}
        <Conductor d="M88 104 L88 136" retraso={0.15} />
        <Conductor d="M113 158 L245 158 L245 196" retraso={0.3} />
        <Conductor d="M468 22 L468 50" retraso={0.15} lenta />
        <Conductor d="M468 98 L468 158 L325 158 L325 196" retraso={0.3} lenta />
        <Conductor d="M285 252 L285 286" retraso={0.55} />
        <Conductor d={`M${ramas[0].x} ${BUS_Y} L${ramas[3].x} ${BUS_Y}`} retraso={0.7} />
        {ramas.map((r, i) => (
          <Conductor key={r.x} d={`M${r.x} ${BUS_Y} L${r.x} ${i === 3 ? 386 : 372}`} retraso={0.85 + i * 0.08} lenta={i % 2 === 1} />
        ))}

        {/* Nodo de la barra */}
        <circle className="simbolo pulso" style={{ ['--d' as string]: '0.8s' }} cx="285" cy={BUS_Y} r="5" fill="var(--color-accent)" />

        {/* ── Paneles fotovoltaicos + inversor ──────────────────────── */}
        <g className="simbolo" style={{ ['--d' as string]: '0s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <rect x="34" y="40" width="108" height="64" rx="3" />
          <path d="M70 40 V104 M106 40 V104 M34 72 H142" strokeWidth="1.2" opacity=".7" />
          <path d="M150 30 l10 -10 M156 44 l14 -2 M146 18 l2 -14" stroke="var(--color-accent)" strokeLinecap="round" />
        </g>
        <g className="simbolo" style={{ ['--d' as string]: '0.25s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <rect x="63" y="136" width="50" height="44" rx="3" />
          <path d="M69 174 L107 142" strokeWidth="1.2" />
          <path d="M70 150 h12" strokeWidth="1.5" />
          <path d="M93 166 q4 -6 8 0 t8 0" strokeWidth="1.5" />
        </g>
        <Etiqueta x={152} y={74} ancla="start" titulo="Paneles FV" modulo="Módulo 9" d={0.2} />
        <Etiqueta x={20} y={208} ancla="start" titulo="Inversor" modulo="Módulo 9" d={0.4} />

        {/* ── Red y medidor ─────────────────────────────────────────── */}
        <g className="simbolo" style={{ ['--d' as string]: '0s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <path d="M452 16 h32 M458 10 h20" strokeLinecap="round" />
          <circle cx="468" cy="74" r="24" />
        </g>
        <text className="simbolo" style={{ ['--d' as string]: '0.1s' }} x="468" y="79" textAnchor="middle" fill={TEXTO} fontSize="13" fontWeight="700">
          kWh
        </text>
        <Etiqueta x={430} y={68} ancla="end" titulo="Empalme y medidor" modulo="Módulo 6" d={0.25} />

        {/* ── Tablero general ───────────────────────────────────────── */}
        <g className="simbolo" style={{ ['--d' as string]: '0.45s' }}>
          <rect x="205" y="196" width="160" height="56" rx="6" fill="rgba(255,255,255,0.06)" stroke={TEXTO} strokeWidth="2" />
          {[232, 262, 292, 322].map((x) => (
            <rect key={x} x={x} y="210" width="16" height="28" rx="2" fill="none" stroke={SUAVE} strokeWidth="1.5" />
          ))}
          <circle cx="352" cy="214" r="3" fill="var(--color-accent)" className="pulso" />
        </g>
        <Etiqueta x={377} y={222} ancla="start" titulo="Tablero general" modulo="Módulo 5" d={0.6} />

        {/* ── Circuitos ─────────────────────────────────────────────── */}
        {ramas.map((r, i) => (
          <Protector key={r.x} x={r.x} y={302} d={1 + i * 0.08} />
        ))}
        {/* Alumbrado: lámpara */}
        <g className="simbolo" style={{ ['--d' as string]: '1.15s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <circle cx={ramas[0].x} cy="388" r="16" />
          <path d={`M${ramas[0].x - 11} 377 l22 22 M${ramas[0].x + 11} 377 l-22 22`} />
        </g>
        {/* Enchufe */}
        <g className="simbolo" style={{ ['--d' as string]: '1.2s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <path d={`M${ramas[1].x - 18} 390 a18 18 0 0 1 36 0 Z`} />
          <path d={`M${ramas[1].x - 6} 380 v6 M${ramas[1].x + 6} 380 v6`} />
        </g>
        {/* Motor */}
        <g className="simbolo" style={{ ['--d' as string]: '1.25s' }} stroke={TEXTO} strokeWidth="2" fill="none">
          <circle cx={ramas[2].x} cy="388" r="16" />
        </g>
        <text className="simbolo" style={{ ['--d' as string]: '1.25s' }} x={ramas[2].x} y="394" textAnchor="middle" fill={TEXTO} fontSize="16" fontWeight="800">
          M
        </text>
        {/* Puesta a tierra */}
        <g className="simbolo" style={{ ['--d' as string]: '1.3s' }} stroke={TEXTO} strokeWidth="2.2" strokeLinecap="round">
          <path d={`M${ramas[3].x - 18} 386 h36 M${ramas[3].x - 11} 394 h22 M${ramas[3].x - 5} 402 h10`} />
        </g>
        {ramas.map((r, i) => (
          <Etiqueta key={r.x} x={r.x} y={432} titulo={r.titulo} modulo={r.modulo} d={1.3 + i * 0.06} />
        ))}
      </svg>
    </figure>
  );
}
