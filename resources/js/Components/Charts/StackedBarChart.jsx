import React, { useState } from 'react';

export default function StackedBarChart({
    data = [], // [{ label: 'Jan', income: 45000000, outcome: 18000000 }]
    height = 220,
    className = '',
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Format currency (IDR / standard)
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    // Calculate maximum value for scaling
    const maxVal = Math.max(
        ...data.map((d) => Math.max(d.income || 0, d.outcome || 0)),
        1000000
    );

    return (
        <div className={`w-full ${className}`}>
            {/* Legend */}
            <div className="flex items-center justify-end gap-5 mb-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-[#111827]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#111827]" />
                    <span>Pemasukan</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#6B7280]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF]" />
                    <span>Pengeluaran</span>
                </div>
            </div>

            {/* Chart Area */}
            <div
                className="relative flex items-end justify-between gap-2 pt-6 pb-2 border-b border-[#E5E7EB]"
                style={{ height: `${height}px` }}
            >
                {/* Horizontal Guide lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-dashed border-[#E5E7EB] w-full" />
                    <div className="border-b border-dashed border-[#E5E7EB] w-full" />
                    <div className="border-b border-dashed border-[#E5E7EB] w-full" />
                </div>

                {data.map((item, idx) => {
                    const incomeHeightPct = Math.min(100, (item.income / maxVal) * 100);
                    const outcomeHeightPct = Math.min(100, (item.outcome / maxVal) * 100);
                    const isHovered = hoveredIndex === idx;

                    return (
                        <div
                            key={idx}
                            className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Hover Tooltip */}
                            {isHovered && (
                                <div className="absolute -top-16 z-20 bg-[#111827] text-white text-[11px] py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap pointer-events-none transform -translate-y-1 transition-all">
                                    <div className="font-semibold text-gray-200 border-b border-gray-700 pb-0.5 mb-1">
                                        {item.label}
                                    </div>
                                    <div className="flex items-center justify-between gap-3 text-emerald-400">
                                        <span>Masuk:</span>
                                        <span className="font-mono">{formatCurrency(item.income)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 text-rose-300">
                                        <span>Keluar:</span>
                                        <span className="font-mono">{formatCurrency(item.outcome)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Monochromatic Bar Segments with 6px top radius */}
                            <div className="w-full flex items-end justify-center gap-1.5 h-full z-10">
                                {/* Income Bar (Tier 1: #111827) */}
                                <div
                                    className="w-3.5 sm:w-5 bg-[#111827] rounded-t-[6px] transition-all duration-200 group-hover:brightness-125"
                                    style={{ height: `${Math.max(6, incomeHeightPct)}%` }}
                                />
                                {/* Outcome Bar (Tier 3: #9CA3AF) */}
                                <div
                                    className="w-3.5 sm:w-5 bg-[#9CA3AF] rounded-t-[6px] transition-all duration-200 group-hover:bg-[#4B5563]"
                                    style={{ height: `${Math.max(6, outcomeHeightPct)}%` }}
                                />
                            </div>

                            {/* X-Axis Label */}
                            <span className="mt-2 text-[11px] font-medium text-[#6B7280] group-hover:text-[#111827] transition-colors">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

