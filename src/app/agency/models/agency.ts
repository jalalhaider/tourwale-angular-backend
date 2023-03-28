import { AgencyDescription } from "./agency-description";
import { AgencySocialMedia } from "./agency-socialmedia";

export class Agency {
  agencyId?: number;
  slug?: string;
  isBlacklisted?: boolean;
  isActive?: boolean;
  description?: Description;
  socialMedia?: AgencySocialMedia[];
}

class Description {
  en?: AgencyDescription;
  ar?: AgencyDescription;
}
