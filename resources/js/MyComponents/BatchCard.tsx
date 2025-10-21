import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Batch, Playlists } from '@/types';
import { formatTime } from '@/utils/timeFormat';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DeleteAlert } from './DeleteAlert';
import { UpdateBatchDialog } from './UpdateBatchDialog';

interface LessonCardProps {
    batch: Batch;
    playlists: Playlists[];
    tutors: {
        id: number;
        user: {
            name: string;
        };
    }[];
}

export default function BatchCard({
    batch,
    playlists,
    tutors,
}: LessonCardProps) {
    const scheduleArray = Array.isArray(batch.schedule)
        ? batch.schedule
        : JSON.parse(batch.schedule);
    const batchSched = scheduleArray.join(', ');
    console.log(batch);
    return (
        <Card className="relative overflow-hidden shadow-md transition hover:shadow-lg">
            <CardHeader>
                <div
                    className={`absolute right-5 h-2 w-2 rounded-full ${batch.status == false ? 'bg-red-500' : 'bg-green-700'}`}
                ></div>
                <CardTitle>{batch.batch_number}</CardTitle>
                <CardDescription className="truncate">
                    {batch.course_title}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex flex-col space-y-2">
                    <Label>Schedule: {batchSched}</Label>
                    <Label>
                        Time:{' '}
                        {`${formatTime(batch.start_time)} - ${formatTime(batch.end_time)}`}
                    </Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <UpdateBatchDialog
                        batch={batch}
                        playlists={playlists}
                        tutors={tutors}
                    />
                    <DeleteAlert
                        data={{ id: batch.id, title: batch.batch_number }}
                        params={{ id: batch.id }}
                        routeName="batch.destroy"
                    />
                </div>
                <Link href={route('batch.show', { id: batch.id })}>
                    <Button className="w-full bg-green-900 text-white">
                        View
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
