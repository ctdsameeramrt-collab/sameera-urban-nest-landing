export interface USP {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime?: string;
  whatsappOptIn: boolean;
  timestamp: string;
  leadSource?: string;
  trigger?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  sizeRange: string;
  priceStart: string;
  label: string;
  bestFor: string;
  highlights: string[];
}
