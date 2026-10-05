import { redirect } from 'next/navigation';

// The studio lives with the other systems; this short path just points there.
export default function Page() { redirect('/systems/motion-studio'); }
