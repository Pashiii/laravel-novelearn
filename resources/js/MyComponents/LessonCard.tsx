import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface LessonCardProps {
    title: string;
    description?: string;
    thumbnail?: string;
}

export default function LessonCard({
    title,
    description,
    thumbnail,
}: LessonCardProps) {
    return (
        <Card className="w-full max-w-sm overflow-hidden shadow-md transition hover:shadow-lg">
            <CardHeader>
                <div className="h-40 w-full overflow-hidden rounded-md">
                    <img
                        src={`${thumbnail ? `/storage/${thumbnail}` : '/default-lesson.jpg'}`}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <Button className="bg-orange-400 text-white">Update</Button>
                    <Button className="bg-red-500 text-white hover:bg-red-600">
                        Delete
                    </Button>
                </div>

                <Button className="w-full bg-green-900 text-white">
                    View Lesson
                </Button>
            </CardContent>
        </Card>
    );
}
