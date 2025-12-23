interface UpdateSectionProps {
  children: React.ReactNode;
  date?: string;
}

export default function UpdateSection({ children, date }: UpdateSectionProps) {
  return (
    <div className="relative border-l-[5px] border-[#EA580C] dark:border-[#92400E] border-b-[3px] border-[#FED7AA] dark:border-b-[#78350F] bg-[#FEF3C7] dark:bg-[#1C1917] py-6 px-6 my-12 rounded-lg">
      <div className="mb-4">
        <div className="inline-block text-xs font-semibold uppercase tracking-wide text-[#9A3412] dark:text-[#D97706] px-3 py-1 bg-[#FED7AA] dark:bg-[#292524] rounded-md">
          Update
        </div>
        {date && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#78350F] dark:text-[#A16207]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{date}</span>
          </div>
        )}
      </div>
      <div className="text-lg leading-loose text-[#292524] dark:text-[#E7E5E4] [&>p]:mb-6 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
