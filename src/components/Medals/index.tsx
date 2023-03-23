import { ReactComponent as Goblet } from '@assets/img/medals/awards_other.svg'
import './index.css'

export const getMedals = (size = 16, padding = '3'): Record<string, React.SVGProps<SVGSVGElement>> => {
  const style = { width: size, height: size, padding: padding }

  return {
    'otkrytie_participant': <Goblet className="medals__medal" style={style} />,
    'otkrytie_winner': <Goblet className="medals__medal" style={style} />,
  }
}
