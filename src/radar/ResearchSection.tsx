import { FileText } from 'lucide-react';
import { useTranslation } from '../i18n';
import { researchPapers } from './research-data';

export default function ResearchSection() {
  const { t } = useTranslation();

  const statusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-emerald-400 bg-emerald-400/10';
      case 'draft': return 'text-amber-400 bg-amber-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <section id="research" className="py-20 md:py-28 bg-[#020203]">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-2">
          {t.research.title}
        </h2>
        <p className="text-[#64748B] mb-10 max-w-xl">
          {t.research.description}
        </p>

        <div className="space-y-4">
          {researchPapers.map((paper) => (
            <article
              key={paper.id}
              className={`p-6 rounded-xl border ${
                paper.featured
                  ? 'border-[#F59E0B]/30 bg-[#F59E0B]/5'
                  : 'border-[#1a1a2e] bg-[#040408]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 ${
                  paper.featured ? 'bg-[#F59E0B]/10' : 'bg-[#1a1a2e]/50'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    paper.featured ? 'text-[#F59E0B]' : 'text-[#64748B]'
                  }`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-[#F1F5F9] mb-1">
                    {paper.title}
                  </h3>
                  <p className="text-[#64748B] text-sm mb-3 leading-relaxed">
                    {paper.abstract.en}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded ${statusColor(paper.status)}`}>
                      {paper.status}
                    </span>
                    <span className="text-[#64748B]">{paper.date}</span>
                    {paper.tags.map((tag) => (
                      <span key={tag} className="text-[#64748B]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
