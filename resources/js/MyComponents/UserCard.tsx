import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export const UserCard = () => {
    return (
        <Card className="overflow-hidden shadow-md transition hover:shadow-lg">
            <CardHeader>
                <div className="h-40 w-full overflow-hidden rounded-md">
                    <img
                        src={`/default-profile.jpg`}
                        // alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <CardTitle>{/* {title} */}</CardTitle>
                <CardDescription className="truncate">
                    {/* {description} */}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                {' '}
                <Button className="w-full bg-green-900 text-white">
                    View Lesson
                </Button>
            </CardContent>
        </Card>
    );
};
