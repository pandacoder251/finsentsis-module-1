import { useEffect, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import countryTopology from "world-atlas/countries-110m.json";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import type { CountryRisk, RiskLevel } from "../types/dashboard.types";
import styles from "./dashboardComponents.module.css";

interface RiskHeatmapProps { countries: CountryRisk[] }
const fills: Record<RiskLevel, string> = { low: "#246657", medium: "#8c7835", high: "#a95838", critical: "#923d49" };
const riskLabel: Record<RiskLevel, string> = { low: "Low risk", medium: "Medium risk", high: "High risk", critical: "Critical risk" };
const formatMoney = (value: number): string => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(value);
const worldFeatures = feature(countryTopology as unknown as Topology, "countries");

export function RiskHeatmap({ countries }: RiskHeatmapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 8]);
  const [hovered, setHovered] = useState<CountryRisk | null>(null);
  const [selected, setSelected] = useState<CountryRisk | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = (): void => setFullscreen(document.fullscreenElement === mapContainer.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const getCountryRisk = (name: string): CountryRisk | undefined => countries.find((country) => country.country === name);
  const resetView = (): void => { setZoom(1); setCenter([0, 8]); setSelected(null); };
  const toggleFullscreen = async (): Promise<void> => {
    if (document.fullscreenElement === mapContainer.current) await document.exitFullscreen();
    else await mapContainer.current?.requestFullscreen();
  };

  return (
    <section className={`${styles.panel} ${styles.mapPanel} ${fullscreen ? styles.mapFullscreen : ""}`} aria-labelledby="risk-map-title">
      <div className={styles.sectionHeader}><h2 id="risk-map-title">Global Risk Heatmap</h2><button type="button" className={styles.mapHeaderAction} aria-label="Reset map view" title="Reset map view" onClick={resetView}><RotateCcw size={14} /></button></div>
      <div className={styles.mapCanvas} ref={mapContainer}>
        <div className={styles.mapControls} aria-label="Map controls">
          <button type="button" aria-label="Reset map view" title="Reset view" onClick={resetView}><RotateCcw size={15} /></button>
          <button type="button" aria-label="Zoom in" title="Zoom in" disabled={zoom >= 4} onClick={() => setZoom((value) => Math.min(4, value + 0.5))}><Plus size={17} /></button>
          <button type="button" aria-label="Zoom out" title="Zoom out" disabled={zoom <= 1} onClick={() => setZoom((value) => Math.max(1, value - 0.5))}><Minus size={17} /></button>
          <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"} title={fullscreen ? "Exit fullscreen" : "View fullscreen"} onClick={() => void toggleFullscreen()}>{fullscreen ? <X size={14} /> : <Maximize2 size={14} />}</button>
          <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
        </div>
        <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 145 }} width={800} height={360} className={styles.worldMap}>
          <ZoomableGroup zoom={zoom} center={center} onMoveEnd={(position) => { setZoom(position.zoom ?? 1); if (position.coordinates) setCenter([position.coordinates[0], position.coordinates[1]]); }}>
            <Geographies geography={worldFeatures}>
              {({ geographies }) => geographies.map((geography) => {
                const name = String(geography.properties?.name ?? "");
                const country = getCountryRisk(name);
                return <Geography key={geography.rsmKey} geography={geography} role={country ? "button" : undefined} tabIndex={country ? 0 : -1} aria-label={country ? `${name}, ${riskLabel[country.riskLevel]}` : undefined} onClick={() => { if (country) setSelected(country); }} onKeyDown={(event) => { if (country && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setSelected(country); } }} onMouseEnter={() => setHovered(country ?? null)} onMouseLeave={() => setHovered(null)} fill={hovered?.id === country?.id && country ? "#d5e4ee" : country ? fills[country.riskLevel] : "#262a2d"} stroke="#17191b" strokeWidth={0.55} style={{ outline: "none", transition: "fill .15s ease", cursor: country ? "pointer" : "default" }} />;
              })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {hovered && <div className={styles.mapTooltip}><strong>{hovered.country}</strong><span>{riskLabel[hovered.riskLevel]} · {hovered.obligations} obligations</span><span>{formatMoney(hovered.exposure)} estimated exposure</span></div>}
        {selected && <div className={styles.countryDetail}><button type="button" aria-label="Close country details" onClick={() => setSelected(null)}><X size={14} /></button><strong>{selected.country}</strong><span className={`${styles.riskPill} ${styles[`risk_${selected.riskLevel}`]}`}>{riskLabel[selected.riskLevel]}</span><small>{selected.obligations} active obligations</small><b>{formatMoney(selected.exposure)}<small> exposure</small></b></div>}
      </div>
      <div className={styles.mapFooter}><div className={styles.mapLegend}>{(["low", "medium", "high", "critical"] as const).map((level) => <span key={level}><i className={styles[`legend_${level}`]} />{riskLabel[level]}</span>)}</div><span className={styles.mapDataNote}>{countries.length} jurisdictions with risk data</span></div>
    </section>
  );
}