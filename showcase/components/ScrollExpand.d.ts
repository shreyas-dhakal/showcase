import type { CSSProperties, ReactNode } from "react"

export interface ScrollExpandProps {
  src?: string
  mediaType?: "image" | "video"
  poster?: string
  alt?: string
  /** Held over the frame, lifts away as the media takes over. */
  title?: ReactNode
  scrollHint?: ReactNode
  startWidth?: number
  startHeight?: number
  startRadius?: number
  endRadius?: number
  mediaZoom?: number
  scrollDistance?: number
  holdDistance?: number
  smoothing?: number
  overlayScrim?: number
  useWindowScroll?: boolean
  enabled?: boolean
  /** Live node rendered as the media layer, in place of src/mediaType. */
  media?: ReactNode
  /** Fades in over the media once it reaches full bleed. */
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

declare function ScrollExpand(props: ScrollExpandProps): React.JSX.Element

export default ScrollExpand
