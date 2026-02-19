import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Batch, type BreadcrumbItem } from '@/types';
import { formatTime } from '@/utils/timeFormat';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Enrolled Batch',
        href: '/my-batch',
    },
];

interface PageProps {
    batches: Batch[];
}

interface AuthProps {
    user: {
        id: number;
        name: string;
        role: string;
    } | null;
    can: {
        createPlaylist: boolean;
        deletePlaylist: boolean;
        updatePlaylist: boolean;
    };
}

export default function Index({ batches }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Batch" />
            <div className="mx-auto w-full max-w-4xl p-4">
                <div className="w-full overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>Batch Number</TableHead>
                                <TableHead>Course Title</TableHead>
                                <TableHead>Start Time</TableHead>
                                <TableHead>End Time</TableHead>
                                <TableHead>Schedule</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {batches.map((details, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {details.batch_number}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {details.course_title}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {formatTime(details.start_time)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {formatTime(details.end_time)}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {Array.isArray(details.schedule)
                                            ? details.schedule.join(', ')
                                            : JSON.parse(
                                                  details.schedule || '[]',
                                              ).join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
