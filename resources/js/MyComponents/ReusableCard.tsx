import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface LessonCardProps {
    title: string;
    description?: string;
    thumbnail?: string;
    actions: ReactNode;
}

export default function ReusableCard({
    title,
    description,
    thumbnail,
    actions,
}: LessonCardProps) {
    return (
        <Card className="overflow-hidden shadow-md transition hover:shadow-lg">
            <CardHeader>
                <div className="h-40 w-full overflow-hidden rounded-md">
                    <img
                        src={`${thumbnail ? `${thumbnail}` : '/default-lesson.jpg'}`}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">{actions}</CardContent>
        </Card>
    );
}
