export default function SectionHeader({ title, subtitle, centered = true }) {
    return (
        <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
