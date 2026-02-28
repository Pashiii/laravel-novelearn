import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
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
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { route } from 'ziggy-js';

interface PerformanceProps {
    stats: {
        id: number;
        batch_number: string;
        course_title: string;
        total_activity: number;
        total_exam: number;
        total_passed: number;
        total_failed: number;
        total_submitted: number;
    }[];
    lessonStats: {
        topic: string;
        avg_score: number;
    }[];
    batch_number: string[];
    student_id: number;
    selected_batch: string;
}

export default function Performance({
    stats,
    batch_number,
    lessonStats,
    student_id,
    selected_batch,
}: PerformanceProps) {
    console.log(lessonStats);

    const handleSelectBatch = (value: string) => {
        router.get(
            route('student.performance', { student: student_id }),
            {
                batch_number: value,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };
    const filteredCourse = stats.filter(
        (e) => e.batch_number === selected_batch,
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Students',
            href: '/students',
        },
        {
            title: 'Profile Details',
            href: `/students/${student_id}`,
        },
        {
            title: 'Performance Overview',
            href: '/students/id/performance',
        },
    ];

    const chartConfig = {
        avg_score: {
            label: 'Average Score',
            color: '#2f5232',
        },
    } satisfies ChartConfig;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Performance Overview" />

            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <h1 className="text-2xl font-semibold">
                        Course Performance
                    </h1>
                    <Separator className="my-6" />
                    <div className="mb-5 w-1/3">
                        <Select
                            value={selected_batch || ''}
                            onValueChange={handleSelectBatch}
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
                                {filteredCourse.map((performance, index) => (
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
                                            {performance.total_submitted}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="my-10 h-64">
                        {lessonStats.length > 0 && (
                            <ChartContainer
                                config={chartConfig}
                                className="min-h-[200px] w-full rounded-xl border-1 p-5"
                            >
                                <BarChart data={lessonStats}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="topic"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) =>
                                            value.length > 10
                                                ? value.slice(0, 10) + '...'
                                                : value
                                        }
                                    />
                                    <YAxis
                                        domain={[0, 100]}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey="avg_score"
                                        fill="var(--color-avg_score)"
                                    />
                                </BarChart>
                            </ChartContainer>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
