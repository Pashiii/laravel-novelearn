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
import { type BreadcrumbItem } from '@/types';
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
    student: {
        id: number;
        first_name: string;
        middle_name: string;
        last_name: string;
        email: string;
        contact_number: string;
        nationality: string;
        sex: string;
        civil_status: string;
        date_of_birth: string;
        address: {
            street: string;
            barangay: string;
            city: string;
            province: string;
            region: string;
            district: string;
            birth_city: string;
            birth_province: string;
            birth_region: string;
        };
        education: string[];
        employment: string;
        guardian_name: string;
        guardian_address: string;
    };
}

export default function Update({ student }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
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

        image: null as File | null,
    });

    useEffect(() => {
        if (student) {
            setData({
                first_name: student.first_name || '',
                middle_name: student.middle_name || '',
                last_name: student.last_name || '',
                region: student.address.region || '',
                province: student.address.province || '',
                city: student.address.city || '',
                barangay: student.address.barangay || '',
                street: student.address.street || '',
                district: student.address.district || '',
                email: student.email || '',
                contact_number: student.contact_number || '',
                nationality: student.nationality || '',
                sex: student.sex || '',
                civil_status: student.civil_status || '',
                date_of_birth: student.date_of_birth || '',
                birth_region: student.address.birth_region || '',
                birth_province: student.address.birth_province || '',
                birth_city: student.address.birth_city || '',
                education: Array.isArray(student.education)
                    ? student.education
                    : JSON.parse(student.education),
                employment: student.employment || '',
                guardian_name: student.guardian_name || '',
                guardian_address: student.guardian_address || '',
            });
        }
    }, [setData, student]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('student.update', { student: student.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast.success('Student updated successfully');
            },
        });
    };

    const handleSelect = (value: string) => {
        const current = data.education || [];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];

        setData('education', updated);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="m-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-semibold">
                                Update Profile
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
                                            key={data.employment}
                                            defaultValue={data.employment}
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
                                            value={data.guardian_name}
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
                                            value={data.guardian_address}
                                            onChange={(e) =>
                                                setData(
                                                    'guardian_address',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="mt-6">
                                    <Label>Upload 1x1 Photo</Label>
                                    <Input
                                        type="file"
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
                                    <Button
                                        className="w-40 bg-green-900 text-white hover:bg-green-800"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Update Now
                                    </Button>
                                    <Link href={route('teacher.index')}>
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
