import React, { useState } from 'react';

export default function HeatmapMatrix({
    weeks = 18,
    data = [], // Array of { date: 'YYYY-MM-DD', count: number }
    className = '',
}) {
    const [hoveredCell, setHoveredCell] = useState(null);

    // Days of week (Mon, Wed, Fri labels)
    const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // If data is not provided, generate realistic sample data for 18 weeks (18 * 7 = 126 days)
    const matrixDays = React.useMemo(() => {
        if (data && data.length > 0) return data;

        const generated = [];
        const today = new Date();
        const totalDays = weeks * 7;

        for (let i = totalDays - 1; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            // Random realistic density (weekdays have higher activity)
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const seed = Math.sin(i * 1.5) * 10000;
            const rand = seed - Math.floor(seed);
            let count = 0;
            if (!isWeekend) {
                if (rand > 0.7) count = Math.floor(rand * 8) + 1;
                else if (rand > 0.4) count = Math.floor(rand * 4) + 1;
            } else if (rand > 0.8) {
                count = Math.floor(rand * 3) + 1;
            }

            generated.push({
                date: dateStr,
                count: count,
                dayOfWeek: d.getDay(),
            });
        }
        return generated;
    }, [data, weeks]);

    // Color ramp based on activity count
    // Inactive: #F3F4F6 -> Low: #D1D5DB -> Medium: #6B7280 -> High: #111827
    const getColor = (count) => {
        if (!count || count === 0) return 'bg-[#F3F4F6] hover:ring-1 hover:ring-gray-300';
        if (count <= 2) return 'bg-[#D1D5DB] hover:ring-1 hover:ring-gray-400';
        if (count <= 4) return 'bg-[#6B7280] hover:ring-1 hover:ring-gray-600';
        return 'bg-[#111827] hover:ring-1 hover:ring-black';
    };

    // Group into columns of weeks
    const weekColumns = [];
    for (let w = 0; w < weeks; w++) {
        weekColumns.push(matrixDays.slice(w * 7, (w + 1) * 7));
    }

    return (
        <div className={`w-full overflow-x-auto select-none ${className}`}>
            <div className="flex items-start gap-2.5 min-w-max pb-2">
                {/* Day labels (Sen, Rab, Jum) */}
                <div className="flex flex-col justify-between text-[10px] text-[#9CA3AF] h-[104px] pt-1">
                    <span>Sen</span>
                    <span>Rab</span>
                    <span>Jum</span>
                </div>

                {/* Heatmap Grid */}
                <div className="flex items-center gap-[4px]">
                    {weekColumns.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[4px]">
                            {week.map((day, dIdx) => {
                                const isHovered = hoveredCell && hoveredCell.date === day.date;
                                return (
                                    <div
                                        key={dIdx}
                                        className="relative group"
                                        onMouseEnter={() => setHoveredCell(day)}
                                        onMouseLeave={() => setHoveredCell(null)}
                                    >
                                        <div
                                            className={`w-[12px] h-[12px] rounded-[3px] transition-all cursor-pointer ${getColor(day.count)}`}
                                        />

                                        {/* Tooltip */}
                                        {isHovered && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 bg-[#111827] text-white text-[10px] py-1 px-2 rounded-md shadow-md whitespace-nowrap pointer-events-none">
                                                <span className="font-semibold text-emerald-400">
                                                    {day.count} tugas selesai
                                                </span>{' '}
                                                pada {day.date}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#F3F4F6] mt-2">
                <span>Aktivitas harian penyelesaian tugas</span>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#9CA3AF]">Sedikit</span>
                    <div className="flex items-center gap-[3px]">
                        <span className="w-[10px] h-[10px] rounded-[2px] bg-[#F3F4F6]" />
                        <span className="w-[10px] h-[10px] rounded-[2px] bg-[#D1D5DB]" />
                        <span className="w-[10px] h-[10px] rounded-[2px] bg-[#6B7280]" />
                        <span className="w-[10px] h-[10px] rounded-[2px] bg-[#111827]" />
                    </div>
                    <span className="text-[10px] text-[#9CA3AF]">Banyak</span>
                </div>
            </div>
        </div>
    );
}

