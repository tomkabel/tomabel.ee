import AxisSection from './AxisSection';
import { capabilityAxes } from './capability-data';

export default function CapabilitySections() {
  return (
    <>
      {capabilityAxes.map((axis, index) => {
        const variant = index % 2 === 0 ? 'featured' : 'grid';
        return (
          <AxisSection key={axis.id} axis={axis} index={index} variant={variant} />
        );
      })}
    </>
  );
}
