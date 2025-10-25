import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BatchSkeleton } from '@/MyComponents/BatchSkeleton';
import { Batch, type BreadcrumbItem } from '@/types';
import { formatTime } from '@/utils/timeFormat';
import { Deferred, Head } from '@inertiajs/react';
import { Printer } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Batch',
        href: '/batch',
    },
    {
        title: 'Batch Details',
        href: '/batch/',
    },
];

interface Props {
    batch: Batch;
    enrolled: {
        student_number: string;
        first_name: string;
        last_name: string;
    }[];
}

export default function ViewBatch({ batch, enrolled }: Props) {
    const scheduleArray =
        batch && batch.schedule
            ? Array.isArray(batch.schedule)
                ? batch.schedule
                : JSON.parse(batch.schedule)
            : [];

    const batchSchedule = scheduleArray.join(', ');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Batch Details" />
            <Deferred data="batch" fallback={() => <BatchSkeleton />}>
                <div className="mx-auto w-full max-w-4xl p-4">
                    <Card>
                        <CardHeader className="mt-5">
                            <div className="relative flex items-center justify-between">
                                <CardTitle className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-2xl">
                                    Batch Details
                                </CardTitle>

                                <div className="ml-auto flex w-13 items-center justify-center rounded-md bg-green-900 p-2 duration-300 hover:scale-110">
                                    <Printer
                                        color="white"
                                        strokeWidth={2}
                                        size={25}
                                    />
                                </div>
                            </div>

                            <Separator className="mt-2 border-1" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <CardTitle>
                                Batch Number:{' '}
                                <span className="font-thin">
                                    {batch?.batch_number}
                                </span>
                            </CardTitle>
                            <div className="mt-3 space-y-2 text-center text-base">
                                <CardTitle>
                                    Batch Title:{' '}
                                    <span className="font-thin">
                                        {batch?.course_title}
                                    </span>
                                </CardTitle>
                                <CardTitle>
                                    Schedule:{' '}
                                    <span className="font-thin">
                                        {batchSchedule}
                                    </span>
                                </CardTitle>
                                <CardTitle>
                                    Time:{' '}
                                    <span className="font-thin">
                                        {`${formatTime(batch?.start_time)} - ${formatTime(batch?.end_time)}`}
                                    </span>
                                </CardTitle>
                                <CardTitle>
                                    Tutor:{' '}
                                    <span className="font-thin">
                                        {`${batch?.tutor?.first_name} ${batch?.tutor?.middle_name ? batch.tutor?.middle_name : ''} ${batch?.tutor?.last_name}`}
                                    </span>
                                </CardTitle>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <CardTitle className="text-xl sm:text-2xl">
                                Enrolled Students
                            </CardTitle>
                            <Separator className="mt-2 border-1" />

                            {enrolled.length ? (
                                <div className="w-full overflow-hidden rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-100">
                                                <TableHead>
                                                    Student Number
                                                </TableHead>
                                                <TableHead>
                                                    First Name
                                                </TableHead>
                                                <TableHead>Last Name</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {enrolled.map((details, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">
                                                        {details.student_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {details.first_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {details.last_name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <CardTitle className="my-5 font-thin text-gray-600">
                                    No students enrolled in this batch.
                                </CardTitle>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </Deferred>
        </AppLayout>
    );
}
