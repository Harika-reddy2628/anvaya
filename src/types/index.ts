export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly badge?: string;
}

export interface MetricItem {
  readonly value: string;
  readonly label: string;
  readonly highlight?: boolean;
}

export interface BentoTile {
  readonly id: string;
  readonly protocol: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly colSpan: number;
}

export interface CliTab {
  readonly id: 'spatial' | 'vector' | 'compiler';
  readonly label: string;
  readonly command: string;
  readonly logs: readonly string[];
  readonly successMessage: string;
}

export interface FaqItem {
  readonly id: string;
  readonly index: string;
  readonly question: string;
  readonly answer: string;
}

export interface TestimonialItem {
  readonly quote: string;
  readonly role: string;
  readonly company: string;
  readonly metric: string;
  readonly commitHash: string;
}
