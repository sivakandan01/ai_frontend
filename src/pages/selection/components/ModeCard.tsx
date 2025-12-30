interface ModeCardProps {
  mode: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient: string;
    bgGradient: string;
    hoverGradient: string;
  };
  index: number;
  onClick: (id: string) => void;
}

export default function ModeCard({ mode, index, onClick }: ModeCardProps) {
  return (
    <button
      onClick={() => onClick(mode.id)}
      className={`group relative overflow-hidden bg-gradient-to-br ${mode.bgGradient} backdrop-blur-sm border border-[rgb(var(--border-color))] rounded-xl md:rounded-2xl p-6 md:p-8 transition-all duration-300 transform hover:scale-105 active:scale-95 ${mode.hoverGradient} hover:border-[rgb(var(--button-primary))] hover:shadow-2xl text-left`}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: `fadeInUp 0.6s ease-out forwards`,
        opacity: 0,
      }}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl md:rounded-2xl`}></div>

      {/* Icon with Gradient */}
      <div className={`mb-4 md:mb-6 bg-gradient-to-br ${mode.gradient} bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300 [&>svg]:w-10 [&>svg]:h-10 [&>svg]:md:w-12 [&>svg]:md:h-12`}>
        {mode.icon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-[rgb(var(--primary-text))] mb-2 md:mb-3 transition-all duration-300">
          {mode.title}
        </h2>
        <p className="text-[rgb(var(--secondary-text))] text-xs md:text-sm leading-relaxed group-hover:text-[rgb(var(--primary-text))] transition-colors duration-300 pr-8">
          {mode.description}
        </p>
      </div>

      {/* Animated Arrow */}
      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 text-[rgb(var(--secondary-text))] group-hover:text-[rgb(var(--primary-text))] transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:animate-shine"></div>
      </div>
    </button>
  );
}
