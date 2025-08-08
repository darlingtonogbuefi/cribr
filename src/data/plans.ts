export interface Plan {
  name: string;
  price: string;
  description: string;
  enhancedDescription?: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  isFeatured: boolean;
  highlight: boolean;
  discount?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Free",
    price: "£STRIPE_FREE / month",
    description: "Try it out, no commitment.",
    enhancedDescription:
      "Get started with basic features to explore the service without any cost.",
    features: [
      "Extract 2 transcripts/day",
      "Export in TXT, SRT, MD and CSV formats",
      "No transcript history",
    ],
    buttonText: "Current Plan",
    buttonStyle: "bg-gray-200 text-gray-700",
    isFeatured: false,
    highlight: false,
  },
  {
    name: "Basic Plan",
    price: "£STRIPE_BASIC / week",
    description: "Perfect for creators and students.",
    enhancedDescription:
      "Weekly access for consistent content creation with upgraded export formats.",
    features: [
      "1000 Transcribed videos/Month",
      "Bulk/Channel transcript downloads",
      "Export in TXT, SRT, MD and CSV formats",
      "AI engine for accurate transcripts",
      "View & manage last 30 days of transcripts",
      "Standard email support",
    ],
    buttonText: "Start Weekly Plan",
    buttonStyle: "bg-purple-600 text-white",
    isFeatured: true,
    highlight: true,
    discount: true,
  },
  {
    name: "Pro Plan",
    price: "£STRIPE_PRO / month",
    description: "Perfect for professionals.",
    enhancedDescription:
      "Unlimited transcript history, advanced exports, and priority access for busy pros.",
    features: [
      "5000 Transcribed videos/Month",
      "Bulk/Channel transcript downloads",
      "Export in TXT, PDF, CSV, JSON, and SRT",
      "View & manage last 90 days of transcripts",
      "Custom timestamp segmentation",
      "Phone and Email Priority support",
    ],
    buttonText: "Start Monthly Plan",
    buttonStyle: "bg-purple-700 text-white",
    isFeatured: false,
    highlight: true,
    discount: true,
  },
];
