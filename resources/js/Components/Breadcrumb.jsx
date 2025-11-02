import { Link } from '@inertiajs/react';

export default function Breadcrumb({ items }) {
    return (
        <div className="text-sm text-gray-500 mb-4 lg:mb-6">
            {items.map((item, index) => (
                <span key={index}>
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-bold text-text">{item.label}</span>
                    )}
                    {index < items.length - 1 && <span className="mx-2">&gt;</span>}
                </span>
            ))}
        </div>
    );
}
