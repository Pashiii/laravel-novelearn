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
import UpdateCertificatesDialog from '@/MyComponents/UpdateCertificatesDialog';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Certificates',
        href: dashboard().url,
    },
];

interface Props {
    settings: {
        event_date: string;
        venue: string;
        admin_name: string;
        mayor_name: string;
        background_image: File;
    };
    batches: {
        batch_number: string;
        id: number;
        playlist: {
            course_id: string;
            hours: string;
            title: string;
        };
    }[];
}

interface Student {
    id: number;
    full_name: string;
    student_number: string;
}

export default function Index({ settings, batches }: Props) {
    const [students, setStudents] = useState<Student[]>([]);
    const [batchId, setBatchId] = useState<number | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);
    const [courseTitle, setCourseTitle] = useState('');
    const [hours, setHours] = useState('');

    const fetchBatch = async (id: number) => {
        setBatchId(id);
        const res = await fetch(`/certificates/batch/${id}`);
        const data = await res.json();
        setStudents(data.students);
    };

    const download = () => {
        window.open(
            route('certificate.download', {
                batch_id: batchId,
                student_id: studentId,
            }),
            '_blank',
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mx-auto w-full max-w-2xl">
                <div className="m-5">
                    <div className="mb-5 flex justify-end">
                        <UpdateCertificatesDialog settings={settings} />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-semibold">
                                Create Certificate
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form>
                                <div className="mt-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label>
                                                Batch{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    const batch = batches.find(
                                                        (e) =>
                                                            e.batch_number ===
                                                            value,
                                                    );
                                                    setCourseTitle(
                                                        batch?.playlist
                                                            ?.title ?? '',
                                                    );
                                                    setHours(
                                                        batch?.playlist.hours ??
                                                            '',
                                                    );
                                                    fetchBatch(
                                                        Number(batch?.id),
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Batch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {batches.map((b) => (
                                                        <SelectItem
                                                            key={b.id}
                                                            value={
                                                                b.batch_number
                                                            }
                                                        >
                                                            {b.batch_number}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>{' '}
                                        <div>
                                            <Label>
                                                Student List{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    const student =
                                                        students.find(
                                                            (e) =>
                                                                e.student_number ===
                                                                value,
                                                        );
                                                    setStudentId(
                                                        Number(student?.id),
                                                    );
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Batch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {students.map((s) => (
                                                        <SelectItem
                                                            key={s.id}
                                                            value={
                                                                s.student_number
                                                            }
                                                        >
                                                            {s.full_name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>
                                                Course{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                placeholder="Enter Course"
                                                value={courseTitle}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                Hours{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                placeholder="Enter Hours"
                                                value={hours}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                Date{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                value={settings?.event_date}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                Venue{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                value={settings?.venue}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                Name of NCLC Admin{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                value={settings?.admin_name}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label>
                                                Name of Mayor{' '}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                value={settings?.mayor_name}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <Button
                                        className="w-full bg-green-900 hover:bg-green-800"
                                        onClick={() => download()}
                                    >
                                        Generate Certificates
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
