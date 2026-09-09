import { ReferenceApply } from '@/components/studio/FinalReferencePages';
import { pageMetadata } from '@/lib/seo';
export const metadata=pageMetadata({title:'Talk to BYBO',description:'Bring one recurring problem or a website project. Prepare your enquiry and start a conversation with BYBO by email or WhatsApp.',path:'/apply'});
export default async function Apply({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const params=await searchParams;const get=(key:string)=>typeof params[key]==='string'?params[key] as string:'';return <ReferenceApply initialSystem={get('system')} initialIndustry={get('industry')} initialInterest={get('interest')} initialMessage={get('message').slice(0,2000)}/>}
