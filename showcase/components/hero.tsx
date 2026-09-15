"use client"

import { useRef } from "react"

import Iridescence from "@/components/Iridescence"
import GlassSurface from "@/components/GlassSurface"
import MaskedHeading from "@/components/MaskedHeading"
import ScrollExpand from "@/components/ScrollExpand"
import VariableProximity from "@/components/VariableProximity"
import { useIsDark } from "@/hooks/use-is-dark"

export function Hero() {
  const isDark = useIsDark()
  const wordmarkRef = useRef<HTMLSpanElement>(null)

  return (
    <section className="relative">
      <header className="absolute inset-x-0 top-0 z-20 flex justify-center pt-8">
        <GlassSurface
          width={224}
          height={58}
          borderRadius={29}
          backgroundOpacity={0.08}
          saturation={1.2}
          blur={10}
          displace={1}
        >
          <span
            ref={wordmarkRef}
            className="relative inline-block text-[1.2rem] tracking-tight"
          >
            <VariableProximity
              label="galvanise"
              containerRef={wordmarkRef}
              fromFontVariationSettings="'wght' 450"
              toFontVariationSettings="'wght' 800"
              radius={45}
              falloff="gaussian"
            />
          </span>
        </GlassSurface>
      </header>

      <ScrollExpand
        media={
          <Iridescence
            color={isDark ? [0.34, 0.37, 0.56] : [0.78, 0.82, 1]}
            speed={0.6}
            amplitude={0.06}
          />
        }
        startWidth={74}
        startHeight={64}
        startRadius={32}
        mediaZoom={1.25}
        scrollDistance={1.2}
        holdDistance={0.45}
        overlayScrim={0}
        useWindowScroll
        title={
          <div className="pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-12 [text-shadow:none]">
            <MaskedHeading
              tag="h1"
              text="migrate your codebase at the speed of light"
              src={isDark ? "/heading-mask.svg" : "/heading-mask-light.svg"}
              fillScale={1.3}
              parallax={34}
              reveal="wipe"
              trigger="view"
              weight={600}
              tracking={-0.035}
              textScale={0.095}
            />

            <span className="text-[0.8125rem] font-normal tracking-[0.02em] text-foreground/70">
              scroll
            </span>
          </div>
        }
      >
        <p className="mx-auto max-w-2xl text-balance px-6 text-xl leading-relaxed tracking-tight text-foreground md:text-2xl">
          keep your website relevant. galvanise sits in your codebase and keeps
          your tech stack up to date.
        </p>
      </ScrollExpand>
    </section>
  )
}
