import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Progress',
        href: dashboard().url,
    },
];

interface StudentProgressProps {
    stats: {
        recent_activity_count: number;
        unfinished_count: number;
        total_course_count: number;
    };
    coursePerformance: {
        id: number;
        batch_number: string;
        course_title: string;
        total_activity: number;
        total_exam: number;
        total_passed: number;
        total_failed: number;
        total_submitted: number;
    }[];
    batch_number: string[];
}

export default function Index({
    stats,
    coursePerformance,
    batch_number,
}: StudentProgressProps) {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const filteredCourse = coursePerformance.filter(
        (e) => e.batch_number === selectedCourse,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Progress" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <div className="flex items-center gap-10">
                        <Card className="w-full p-5">
                            <div className="flex flex-col gap-2">
                                <h1>Recent Activity: </h1>
                                <p className="text-gray-500">
                                    Activities submitted:{' '}
                                    <span className="semi-bold text-black">
                                        {stats.recent_activity_count}
                                    </span>
                                </p>
                                <Button className="w-full bg-green-900 hover:bg-green-800">
                                    View Activities
                                </Button>
                            </div>
                        </Card>
                        <Card className="w-full p-5">
                            <div className="flex flex-col gap-2">
                                <h1>To do: </h1>
                                <p className="text-gray-500">
                                    Unfinished Activity:{' '}
                                    <span className="semi-bold text-black">
                                        {stats.unfinished_count}
                                    </span>
                                </p>
                                <Button className="w-full bg-green-900 hover:bg-green-800">
                                    View Lesson
                                </Button>
                            </div>
                        </Card>
                        <Card className="w-full p-5">
                            <div className="flex flex-col gap-2">
                                <h1>Enrolled:</h1>
                                <p className="text-gray-500">
                                    Total course:{' '}
                                    <span className="semi-bold text-black">
                                        {stats.total_course_count}
                                    </span>
                                </p>
                                <Button className="w-full bg-green-900 hover:bg-green-800">
                                    View Course
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-20">
                        <h1 className="text-2xl font-semibold">
                            Course Performance
                        </h1>
                        <Separator className="my-6" />
                        <div className="mb-5 w-1/3">
                            <Select
                                defaultValue=""
                                onValueChange={(value) =>
                                    setSelectedCourse(value)
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {batch_number.map((batch, index) => (
                                        <SelectItem value={batch} key={index}>
                                            {batch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full overflow-hidden rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead>Course</TableHead>
                                        <TableHead>Total Activity</TableHead>
                                        <TableHead>Total Exam</TableHead>
                                        <TableHead>Total Passed</TableHead>
                                        <TableHead>Total Failed</TableHead>
                                        <TableHead>Submitted</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCourse.map(
                                        (performance, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {performance.course_title}
                                                </TableCell>
                                                <TableCell>
                                                    {performance.total_activity}
                                                </TableCell>
                                                <TableCell>
                                                    {performance.total_exam}
                                                </TableCell>
                                                <TableCell>
                                                    {performance.total_passed}
                                                </TableCell>
                                                <TableCell>
                                                    {performance.total_failed}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        performance.total_submitted
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
