"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/seed"

interface CardListProps {
  cards: CardData[]
  activeCardId: string
  onSelect: (id: string) => void
  frozenMap: Record<string, boolean>
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CardList({
  cards,
  activeCardId,
  onSelect,
  frozenMap,
}: CardListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => {
        const isFrozen = frozenMap[card.id] ?? false
        const isActive = card.id === activeCardId

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className={cn(
              "relative aspect-[1.586/1] w-full cursor-pointer overflow-hidden rounded-xl p-3 text-left transition-all",
              card.color,
              isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              isFrozen && "opacity-50 grayscale",
            )}
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-medium leading-tight">
                  {card.name}
                </span>
                <span className="rounded bg-background/20 px-1.5 py-0.5 text-[9px] font-mono font-medium">
                  PASSKEY
                </span>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold tabular-nums text-foreground tracking-wider">
                  {card.cardNumber}
                </p>
                <p className="mt-0.5 text-[10px] font-mono text-muted-foreground">
                  {card.monthlySpend.toLocaleString("en-US")} signals/mo
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
