import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { FormBase } from '@/MyComponents/FormBase';
import { Batch, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Students Create',
        href: '/students/create',
    },
];
interface Props {
    batches: Batch[];
    students: {}[];
}

export default function Create({ batches, students }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        region: '',
        province: '',
        city: '',
        barangay: '',
        street: '',
        district: '',
        email: '',
        contact_number: '',
        nationality: '',
        sex: '',
        civil_status: '',
        date_of_birth: '',
        birth_region: '',
        birth_province: '',
        birth_city: '',
        education: [] as string[],
        employment: '',
        guardian_name: '',
        guardian_address: '',
        batch_number: '',
        course_title: '',
        course_id: '',
        student_number: '',

        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('student.store'), {
            onSuccess: () => {
                reset();
                toast.success('Student created successfully');
            },
        });
    };

    const handleSelect = (value: string) => {
        setData(
            'education',
            data.education.includes(value)
                ? data.education.filter((v) => v !== value)
                : [...data.education, value],
        );
    };
    const generateStudentNumber = () => {
        const date = new Date();
        const getYear = date.getFullYear();
        const getMonth = date.getMonth() + 1;

        const student = students.length + 1;
        return `SN${getYear}${getMonth}${student}`;
    };

    useEffect(() => {
        setData('student_number', generateStudentNumber());
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="m-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-semibold">
                                Create Account
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <FormBase data={data} setData={setData} />
                                <div className="mt-6">
                                    <Label>
                                        Educational Attainment Before the
                                        Training
                                    </Label>
                                    <div className="flex flex-wrap gap-10">
                                        <div className="space-y-2">
                                            {/* No Grade Completed */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="no-grade-completed"
                                                    checked={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        if (checked) {
                                                            // Only select this and disable all others
                                                            setData(
                                                                'education',
                                                                [
                                                                    'no-grade-completed',
                                                                ],
                                                            );
                                                        } else {
                                                            // Uncheck everything
                                                            setData(
                                                                'education',
                                                                [],
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="no-grade-completed">
                                                    No grade completed
                                                </Label>
                                            </div>

                                            {/* Elementary Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="elementary-graduate"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'elementary-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'elementary-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="elementary-graduate">
                                                    Elementary Graduate
                                                </Label>
                                            </div>

                                            {/* High School Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="high-school-graduate"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'high-school-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'high-school-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="high-school-graduate">
                                                    High School Graduate
                                                </Label>
                                            </div>

                                            {/* Senior High School Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="senior-high"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'senior-high-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'senior-high-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="senior-high">
                                                    Senior High School Graduate
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            {/* Post-Secondary Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="post-secondary"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'post-secondary-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'post-secondary-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="post-secondary">
                                                    Post-Secondary Graduate
                                                    (Vocational)
                                                </Label>
                                            </div>

                                            {/* Post-Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="post-grad"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'post-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'post-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="post-grad">
                                                    Post-Graduate
                                                </Label>
                                            </div>

                                            {/* College Graduate */}
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    id="college"
                                                    disabled={data.education.includes(
                                                        'no-grade-completed',
                                                    )}
                                                    checked={data.education.includes(
                                                        'college-graduate',
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleSelect(
                                                            'college-graduate',
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="college">
                                                    College Graduate
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Employment Status{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            defaultValue=""
                                            onValueChange={(value) =>
                                                setData('employment', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="(before the training)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="employed">
                                                    Employed
                                                </SelectItem>
                                                <SelectItem value="unemployed">
                                                    Unemployed
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>
                                            Name of Guardian{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            placeholder="Guardian's Fullname"
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label>
                                            Complete Permanent Mailing Address{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            placeholder="Complete Address"
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_address',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Choose Batch{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            defaultValue=""
                                            onValueChange={(value) => {
                                                const batch = batches.find(
                                                    (e) =>
                                                        e.batch_number == value,
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
                                                <SelectValue placeholder="select batch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {batches.map((batch, index) => (
                                                    <SelectItem
                                                        value={
                                                            batch.batch_number
                                                        }
                                                        key={index}
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
                                    <div>
                                        <Label>
                                            Student Number{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            readOnly
                                            value={data.student_number}
                                        />
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="mt-6">
                                    <Label>Upload 1x1 Photo</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                'image',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="mt-8 flex justify-center gap-4">
                                    <Button className="w-40 bg-green-900 text-white hover:bg-green-800">
                                        Register Now
                                    </Button>
                                    <Link href={route('teacher.index')}>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={processing}
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
