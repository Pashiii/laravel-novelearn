import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { FormBase } from '@/MyComponents/FormBase';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
    {
        title: 'Teacher Create',
        href: '/teachers/create',
    },
];
interface Props {
    teacher: {
        id: number;
        image: string;
        full_name: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        email: string;
        contact_number: string;
        sex: string;
        date_of_birth: string;
        nationality: string;
        civil_status: string;
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
    };
}
export default function UpdateTutor({ teacher }: Props) {
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
        image: null as File | null,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('teacher.update', { tutor: teacher.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast.success('Teacher update successfully');
            },
        });
    };

    useEffect(() => {
        if (teacher) {
            setData({
                first_name: teacher.first_name || '',
                middle_name: teacher.middle_name || '',
                last_name: teacher.last_name || '',
                region: teacher.address.region || '',
                province: teacher.address.province || '',
                city: teacher.address.city || '',
                barangay: teacher.address.barangay || '',
                street: teacher.address.street || '',
                district: teacher.address.district || '',
                email: teacher.email || '',
                contact_number: teacher.contact_number || '',
                nationality: teacher.nationality || '',
                sex: teacher.sex?.toLowerCase() ?? '',
                civil_status: teacher.civil_status?.toLowerCase() ?? '',
                date_of_birth: teacher.date_of_birth || '',
                birth_region: teacher.address.birth_region || '',
                birth_province: teacher.address.birth_province || '',
                birth_city: teacher.address.birth_city || '',
            });
        }
    }, [setData, teacher]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            {Object.keys(errors).length > 0 &&
                Object.entries(errors).map(([message, field]) => (
                    <div>{field}</div>
                ))}
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
                                <FormBase
                                    data={data}
                                    setData={setData}
                                    edit={true}
                                />
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
                                    >
                                        Update Now
                                    </Button>
                                    <Link
                                        href={route('teacher.show', {
                                            tutor: teacher.id,
                                        })}
                                    >
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
