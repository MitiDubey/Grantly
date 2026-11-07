import React from 'react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      value: '₹15.8L+',
      label: 'SCHOLARSHIP POOL LISTED',
      colorClass: 'text-[#3985FF]',
    },
    {
      id: 'stat-2',
      value: '100%',
      label: 'VERIFIED DEMONSTRATION DATA',
      colorClass: 'text-[#168253]',
    },
    {
      id: 'stat-3',
      value: '4-Stage',
      label: 'APPLICATION LIFECYCLE',
      colorClass: 'text-[#A76B13]',
    },
    {
      id: 'stat-4',
      value: 'Instant',
      label: 'RULE ENGINE MATCHING',
      colorClass: 'text-[#3985FF]',
    },
  ];

  return (
    <section className="stats-section relative z-20 max-w-6xl mx-auto px-6 py-6">
      <div className="stats-container py-10 px-6 sm:px-10 rounded-[22px] bg-[#101B2D] border border-[#304058] text-white shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#304058]/50">
          {stats.map((item, idx) => (
            <div key={item.id} className={`stat-item stat-item-${idx} pt-4 md:pt-0`}>
              <p className={`stat-value text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display ${item.colorClass} tracking-tight`}>
                {item.value}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 uppercase font-semibold tracking-wider mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

