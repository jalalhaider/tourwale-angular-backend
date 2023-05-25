import { AgencyDescription } from "./agency-description"
import { AgencySocialMedia } from "./agency-social-media"

export class Agency {
  agencyId?: number
  slug?: string
  name?: string
  description?: string
  image?: string
  coverImage?: string
  isBlacklisted?: boolean
  isActive?: boolean
}
