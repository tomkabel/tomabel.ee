import React from 'react';
import { Shield, Target, Fingerprint } from 'lucide-react';

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
}

export const serviceIcons: Service[] = [
  { icon: Target },
  { icon: Shield },
  { icon: Fingerprint },
];
