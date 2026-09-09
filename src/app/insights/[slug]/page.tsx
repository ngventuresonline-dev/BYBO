import { notFound } from 'next/navigation';
import { articles } from '@/lib/redesign';
import { pageMetadata } from '@/lib/seo';
import { getInsightArticle } from '@/lib/insight-articles';
import { ReferenceArticle } from '@/components/studio/FinalReferencePages';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:Props){const {slug}=await params;const a=articles.find(a=>a.slug===slug);const original=getInsightArticle(slug);return a?pageMetadata({title:a.title,description:a.excerpt,path:`/insights/${slug}`,ogType:'article',ogImage:original?.image,ogImageAlt:original?.imageAlt,publishedTime:a.date}):{}}
export default async function Article({params}:Props){const {slug}=await params;if(!articles.some(a=>a.slug===slug))notFound();return <ReferenceArticle slug={slug}/>}
