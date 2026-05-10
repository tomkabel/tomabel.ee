import AxisSection from './AxisSection';
import { capabilityAxes } from './capability-data';

export default function CapabilitySections() {
  return (
    <>
      {capabilityAxes.map((axis, index) => (
        <AxisSection key={axis.id} axis={axis} index={index} />
      ))}
    </>
  );
}
