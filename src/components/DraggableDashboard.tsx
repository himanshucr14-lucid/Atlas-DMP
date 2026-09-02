'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Layers, Sparkles, Activity } from 'lucide-react';
import BentoCard from './BentoCard';
import AuctionCandlestick from './AuctionCandlestick';
import SignalHeatmap from './SignalHeatmap';
import IdentityCard3D from './IdentityCard3D';

interface WidgetItemProps {
  id: string;
  children: React.ReactNode;
  title: string;
}

function SortableWidget({ id, children, title }: WidgetItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Widget Header with Drag Handle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</span>
        <button
          {...attributes}
          {...listeners}
          style={{ background: 'none', border: 'none', color: 'var(--text-4)', cursor: 'grab', display: 'flex', alignItems: 'center', padding: '4px' }}
          title="Drag to rearrange widget"
        >
          <GripVertical style={{ width: '14px', height: '14px' }} />
        </button>
      </div>

      {children}
    </div>
  );
}

export default function DraggableDashboard({ app }: { app: any }) {
  const [items, setItems] = useState(['w-kpis', 'w-auction', 'w-heatmap', 'w-oem-cards']);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const renderWidgetContent = (id: string) => {
    switch (id) {
      case 'w-kpis':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '8px' }}>
            {[
              { l: 'Profiles Unified', v: '85.4M', change: '+12.4%', tag: 'Live Graph' },
              { l: 'Audience Segments', v: '1,420', change: '+8.2%', tag: 'Active' },
              { l: 'OEM Devices', v: '28.4M', change: '+15.1%', tag: 'Knox / HyperOS' },
              { l: 'Traffic Fraud Rate', v: '1.6%', change: '-0.4%', tag: 'Protected', isGreen: true },
              { l: 'Live Requests/Sec', v: '14,820/s', change: '+6.5%', tag: 'Realtime' },
            ].map((kpi, idx) => (
              <BentoCard key={idx} style={{ padding: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-3)', fontWeight: '600', display: 'block', marginBottom: '8px' }}>{kpi.l}</span>
                <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: '8px' }}>{kpi.v}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="tag tag-success">{kpi.change}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-4)', fontWeight: '600' }}>{kpi.tag}</span>
                </div>
              </BentoCard>
            ))}
          </div>
        );

      case 'w-auction':
        return <AuctionCandlestick />;

      case 'w-heatmap':
        return <SignalHeatmap />;

      case 'w-oem-cards':
        return (
          <BentoCard style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>3D OEM Passkey Cards & On-Device Credentials</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>Flip 3D cards to inspect encrypted hardware tokens and identity signatures</span>
              </div>
              <span className="tag tag-accent">Hardware Protected</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <IdentityCard3D
                brand="Samsung"
                cardName="Knox Enterprise Profile"
                tokenId="SK-8849-2049-1029"
                hashKey="sha256:e940f82a1b94c3d82e104f9b2c8a4f9b2c"
                confidence={99.4}
                gradient="linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)"
              />
              <IdentityCard3D
                brand="Xiaomi"
                cardName="HyperOS Security Passkey"
                tokenId="XM-4492-1082-9930"
                hashKey="sha256:c8a4f9b2c8a4f9b2ce940f82a1b94c3d82e"
                confidence={98.1}
                gradient="linear-gradient(135deg, #065F46 0%, #10B981 100%)"
              />
              <IdentityCard3D
                brand="OnePlus"
                cardName="OxygenOS Token Signature"
                tokenId="OP-9920-1482-3021"
                hashKey="sha256:1b94c3d82e104f9b2c8a4f9b2ce940f82a"
                confidence={99.8}
                gradient="linear-gradient(135deg, #5B21B6 0%, #8B5CF6 100%)"
              />
            </div>
          </BentoCard>
        );

      default:
        return null;
    }
  };

  const getWidgetTitle = (id: string) => {
    switch (id) {
      case 'w-kpis': return 'Widget: Realtime DMP KPIs Strip';
      case 'w-auction': return 'Widget: DSP Real-Time Candlestick Auction Depth';
      case 'w-heatmap': return 'Widget: 365-Day Processing Heatmap Calendar';
      case 'w-oem-cards': return 'Widget: 3D Interactive OEM Credentials';
      default: return 'Widget';
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {items.map((id) => (
            <SortableWidget key={id} id={id} title={getWidgetTitle(id)}>
              {renderWidgetContent(id)}
            </SortableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
