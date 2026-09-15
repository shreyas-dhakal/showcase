import type { CSSProperties, MouseEventHandler, RefObject } from "react"

export interface VariableProximityProps {
  label: string
  /** Element the cursor distance is measured against. */
  containerRef?: RefObject<HTMLElement | null>
  /** Variation settings while the cursor is outside the radius. */
  fromFontVariationSettings?: string
  /** Variation settings reached at the cursor. */
  toFontVariationSettings?: string
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
  className?: string
  onClick?: MouseEventHandler<HTMLSpanElement>
  style?: CSSProperties
}

declare function VariableProximity(
  props: VariableProximityProps
): React.JSX.Element

export default VariableProximity
