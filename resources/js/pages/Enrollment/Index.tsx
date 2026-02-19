import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Batch, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    students: {
        id: number;
        full_name: string;
        image: string;
        student_number: string;
    }[];
    batches: Batch[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Enrollment',
        href: '/enrollment',
    },
];

export default function Index({ students, batches }: Props) {
    const { data, setData, post, reset, processing } = useForm({
        student_number: '',
        student_name: '',
        batch_number: '',
        course_id: '',
        course_title: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('enrollment.store'), {
            onSuccess: () => {
                reset();
                toast.success('Student enrolled successfully');
            },
            onError: () => {
                toast.error('Failed to enroll');
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enrollment" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="m-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enrollment Student To Course</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    {' '}
                                    <div>
                                        <Label>
                                            Student Number{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>

                                        <Select
                                            defaultValue=""
                                            onValueChange={(value) => {
                                                const student = students.find(
                                                    (e) =>
                                                        e.student_number ===
                                                        value,
                                                );
                                                setData({
                                                    ...data,
                                                    student_number: value,
                                                    student_name:
                                                        student?.full_name,
                                                });
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Student Number" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {students.map(
                                                    (student, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={
                                                                student.student_number
                                                            }
                                                        >
                                                            {
                                                                student.student_number
                                                            }
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>
                                            Student Name{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            readOnly
                                            placeholder="Student Name"
                                            value={data.student_name}
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Batch Number{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>

                                        <Select
                                            defaultValue=""
                                            onValueChange={(value) => {
                                                const batch = batches.find(
                                                    (e) =>
                                                        e.batch_number ===
                                                        value,
                                                );
                                                setData({
                                                    ...data,
                                                    batch_number: value,
                                                    course_title:
                                                        batch?.course_title,
                                                    course_id: batch?.course_id,
                                                });
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Batch Number" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {batches.map((batch, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={
                                                            batch.batch_number
                                                        }
                                                    >
                                                        {batch.batch_number}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>
                                            Course Title{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            readOnly
                                            placeholder="Course Title"
                                            value={data.course_title}
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center gap-4">
                                    <Button
                                        className="w-40 bg-green-900 text-white hover:bg-green-800"
                                        type="submit"
                                    >
                                        Enroll Now
                                    </Button>
                                    <Link href={route('student.index')}>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            className="w-40 bg-amber-500 hover:bg-amber-600"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
