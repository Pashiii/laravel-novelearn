import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonRowProps {
    items?: number; // total skeleton items in the row
    className?: string; // extra classes
}

export const SkeletonRow = ({
    items = 3,
    className = '',
}: SkeletonRowProps) => {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {Array.from({ length: items }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-10 w-full flex-shrink flex-grow basis-[20rem]"
                />
            ))}
        </div>
    );
};
