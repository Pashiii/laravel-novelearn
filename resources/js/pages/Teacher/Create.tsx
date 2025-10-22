import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { FormBase } from '@/MyComponents/FormBase';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
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

export default function Create() {
    const [date, setDate] = useState<Date>();
    const [file, setFile] = useState<File | null>(null);

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
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('teacher.store'), {
            onSuccess: () => {
                reset();
                toast.success('Teacher added account successfully');
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            {Object.keys(errors).length > 0 && (
                <div>
                    {Object.entries(errors).map(([field, message]) => (
                        <div>{message}</div>
                    ))}
                </div>
            )}
            <div className="flex justify-center py-10">
                <Card className="w-full max-w-4xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-semibold">
                            Create Account
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <FormBase data={data} setData={setData} />
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
                                <Button className="w-40 bg-green-900 text-white hover:bg-green-800">
                                    Register Now
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
        </AppLayout>
    );
}
