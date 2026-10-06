import { useEffect, useRef, useState, type FC } from 'react';
import type { MapOverlaySettings } from '../types';

interface BioMeshMapCanvasProps {
  overlays: MapOverlaySettings;
}

export const BioMeshMapCanvas: FC<BioMeshMapCanvasProps> = ({ overlays }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{
    id: string;
    label: string;
    aqi: number;
    elevation: string;
    details: string;
    x: number;
    y: number;
  } | null>(null);

  // Mesh nodes positioned over an urban corridor
  const nodes = [
    { id: 'n1', label: 'River Valley West', x: 0.22, y: 0.35, aqi: 42, elevation: '120m', details: 'Riparian buffer, dense oak canopy' },
    { id: 'n2', label: 'Transit Artery Junction', x: 0.48, y: 0.45, aqi: 94, elevation: '145m', details: 'Highway corridor, diesel soot accumulation' },
    { id: 'n3', label: 'East Industrial District', x: 0.72, y: 0.28, aqi: 112, elevation: '110m', details: 'Low-income zone, heavy warehouse freight' },
    { id: 'n4', label: 'Midtown School Zone', x: 0.42, y: 0.65, aqi: 82, elevation: '150m', details: 'Elementary campus, urban thermal canyon' },
    { id: 'n5', label: 'North Hill Hospital Cluster', x: 0.62, y: 0.75, aqi: 56, elevation: '185m', details: 'Elevated ridge, continuous wind ventilation' },
    { id: 'n6', label: 'South Housing Sector', x: 0.30, y: 0.82, aqi: 98, elevation: '130m', details: 'Sensor desert: 8.5 km to nearest gov station' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 500);

      // Dark serene background
      ctx.fillStyle = '#07100b';
      ctx.fillRect(0, 0, w, h);

      // Draw Topographic Contour Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
      for (let r = 80; r < Math.max(w, h) * 1.2; r += 70) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const wobble = Math.sin(a * 5 + r) * 12 + Math.cos(a * 3) * 10;
          const px = w * 0.5 + Math.cos(a) * (r + wobble);
          const py = h * 0.5 + Math.sin(a) * (r * 0.6 + wobble);
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // 1. Overlay: Income Disparity Layer (Low-Income elevated bio-stress corridor)
      if (overlays.showIncome) {
        const grad = ctx.createRadialGradient(w * 0.65, h * 0.35, 20, w * 0.65, h * 0.35, w * 0.32);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
        grad.addColorStop(0.7, 'rgba(249, 115, 22, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(248, 113, 113, 0.8)';
        ctx.font = '10px monospace';
        ctx.fillText('DISPARITY CORRIDOR: LOW-INCOME RESIDENTIAL (AQI +38% OVER BASIN)', w * 0.52, h * 0.22);
      }

      // 2. Overlay: Traffic Arteries
      if (overlays.showTraffic) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
        ctx.setLineDash([8, 6]);
        ctx.lineDashOffset = -time * 15;
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h * 0.25);
        ctx.bezierCurveTo(w * 0.35, h * 0.4, w * 0.55, h * 0.5, w * 0.9, h * 0.35);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Overlay: Government Station Coverage Deserts
      if (overlays.showGovDeserts) {
        const gx = w * 0.25;
        const gy = h * 0.7;
        ctx.beginPath();
        ctx.arc(gx, gy, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(gx, gy, w * 0.24, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#bae6fd';
        ctx.font = '10px monospace';
        ctx.fillText('Lone Regional Gov Sensor (10 km radius average)', gx + 20, gy + 4);

        ctx.fillStyle = '#fca5a5';
        ctx.fillText('SENSOR DESERT: UNMONITORED BY MUNICIPAL NETWORKS (380K RESIDENTS)', w * 0.45, h * 0.88);
      }

      // 4. Smooth Breathing Heatmap
      nodes.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;
        const pulse = Math.sin(time * 2 + node.aqi) * 6;
        const radius = 35 + (node.aqi / 150) * 45 + pulse;

        const grad = ctx.createRadialGradient(nx, ny, 4, nx, ny, radius);
        if (node.aqi > 90) {
          grad.addColorStop(0, 'rgba(249, 115, 22, 0.35)');
          grad.addColorStop(0.6, 'rgba(239, 68, 68, 0.12)');
          grad.addColorStop(1, 'transparent');
        } else {
          grad.addColorStop(0, 'rgba(16, 185, 129, 0.32)');
          grad.addColorStop(0.6, 'rgba(52, 211, 153, 0.10)');
          grad.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Organic Lichen-Shaped Markers
      nodes.forEach((node) => {
        const nx = node.x * w;
        const ny = node.y * h;

        ctx.save();
        ctx.translate(nx, ny);

        ctx.beginPath();
        const lobes = 6;
        for (let i = 0; i < lobes; i++) {
          const angle = (i / lobes) * Math.PI * 2;
          const rBase = 8;
          const rLobe = 14 + Math.sin(time * 3 + i * 2) * 2;
          const cpAngle1 = angle - 0.25;

          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * rLobe, Math.sin(angle) * rLobe);
          } else {
            ctx.quadraticCurveTo(
              Math.cos(cpAngle1) * rBase,
              Math.sin(cpAngle1) * rBase,
              Math.cos(angle) * rLobe,
              Math.sin(angle) * rLobe
            );
          }
        }
        ctx.closePath();

        const isUnhealthy = node.aqi > 90;
        ctx.fillStyle = isUnhealthy ? 'rgba(249, 115, 22, 0.85)' : 'rgba(52, 211, 153, 0.9)';
        ctx.fill();
        ctx.strokeStyle = isUnhealthy ? '#ef4444' : '#10b981';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px monospace';
        ctx.fillText(`Bio-AQI ${node.aqi}`, 18, 4);

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const w = canvas.width;
      const h = canvas.height;

      let found = false;
      for (const node of nodes) {
        const nx = node.x * w;
        const ny = node.y * h;
        const dist = Math.hypot(clientX - nx, clientY - ny);
        if (dist < 22) {
          setHoveredNode({
            id: node.id,
            label: node.label,
            aqi: node.aqi,
            elevation: node.elevation,
            details: node.details,
            x: nx,
            y: ny,
          });
          found = true;
          break;
        }
      }
      if (!found) setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
    };
  }, [overlays]);

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden glass-panel">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none p-3 rounded-xl bg-[#060b08]/95 border border-emerald-500/30 text-xs shadow-2xl backdrop-blur-md space-y-1 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{ left: hoveredNode.x, top: hoveredNode.y - 12 }}
        >
          <div className="font-semibold text-slate-100">{hoveredNode.label}</div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-emerald-400">Bio-AQI: {hoveredNode.aqi}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Alt: {hoveredNode.elevation}</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-[200px] leading-tight">
            {hoveredNode.details}
          </p>
        </div>
      )}

      <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Lichen Bio-Mesh Nodes
          </span>
          <span className="flex items-center gap-1.5 text-orange-400">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
            Elevated Bio-Stress
          </span>
        </div>
        <div>Scale: 1:25,000 • Continuous 40-sec Biological Sweep</div>
      </div>
    </div>
  );
};

