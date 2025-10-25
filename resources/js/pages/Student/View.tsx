import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AppLayout from '@/layouts/app-layout';
import { DeleteUserAlert } from '@/MyComponents/DeleteUserAlert';
import { UserProfileSkeleton } from '@/MyComponents/UserProfileSkeleton';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/dateFormat';
import { Deferred, Head, Link } from '@inertiajs/react';
import { MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Profile Details',
        href: '/students/edit',
    },
];

interface Props {
    student: {
        id: number;
        student_number: string;
        image: string;
        full_name: string;
        email: string;
        contact_number: string;
        sex: string;
        date_of_birth: string;
        nationality: string;
        civil_status: string;
        education: string[];
        guardian_name: string;
        guardian_address: string;
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

export default function View({ student }: Props) {
    const [open, setOpen] = useState(false);

    const educationArray =
        student && student.education
            ? Array.isArray(student.education)
                ? student.education
                : JSON.parse(student.education)
            : [];

    const educationDetails = educationArray
        .map((item: string) => item.replace(/-/g, ' '))
        .join(' • ');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile Details" />

            <Deferred
                data="student"
                fallback={() => <UserProfileSkeleton student={true} />}
            >
                <DeleteUserAlert
                    data={{
                        id: student?.id || 0,
                        title: student?.full_name,
                    }}
                    routeName="student.destroy"
                    setOpen={setOpen}
                    open={open}
                />
                <div className="mx-auto w-full max-w-6xl">
                    <div className="m-5">
                        <Card className="relative">
                            <div className="absolute right-5">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            aria-label="Open menu"
                                            size="icon-sm"
                                        >
                                            <MoreHorizontalIcon />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-40"
                                        align="end"
                                    >
                                        <DropdownMenuLabel>
                                            Account Actions
                                        </DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Link
                                                    href={route(
                                                        'student.edit',
                                                        {
                                                            student: student?.id
                                                                ? student.id
                                                                : 0,
                                                        },
                                                    )}
                                                >
                                                    Update Information
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Reset Password
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                onClick={() =>
                                                    setOpen((prev) => !prev)
                                                }
                                            >
                                                Remove User
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardHeader className="flex flex-col items-center justify-center text-center">
                                <div className="h-25 w-25 overflow-hidden rounded-full">
                                    <img
                                        src={
                                            student?.image
                                                ? `${import.meta.env.VITE_AWS_URL}/${student?.image}`
                                                : '/default-profile.png'
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <CardTitle className="text-2xl">
                                    {student?.full_name}
                                </CardTitle>
                                <CardDescription className="text-xl">
                                    {student?.student_number}
                                </CardDescription>
                                <CardDescription className="text-xl">
                                    Student
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Information */}
                                <CardTitle className="my-5 text-xl">
                                    Personal Information
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Email:{' '}
                                            <span className="font-normal">
                                                {student?.email}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Contact:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.contact_number}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Sex:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.sex}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Date of Birth:{' '}
                                            <span className="font-normal capitalize">
                                                {formatDate(
                                                    student?.date_of_birth,
                                                )}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Nationality:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.nationality}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Civil Status:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.civil_status}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                {/* Address Details */}
                                <CardTitle className="my-5 text-xl">
                                    Address
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Street:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.street}
                                            </span>{' '}
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Barangay:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.barangay}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            City:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.city}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Province:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.province}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Region:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.region}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            District:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.district}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                {/* Birth Place */}
                                <CardTitle className="my-5 text-xl">
                                    Birth Place
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            City:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.birth_city}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Province:{' '}
                                            <span className="font-normal capitalize">
                                                {
                                                    student?.address
                                                        .birth_province
                                                }
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Region:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.address.birth_region}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                                {/* Education Details */}
                                <CardTitle className="my-5 text-xl">
                                    Educational Attainment
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <span className="font-normal capitalize">
                                            {educationDetails}
                                        </span>
                                    </div>
                                </div>
                                {/* Guardian Details */}
                                <CardTitle className="my-5 text-xl">
                                    Guardian Information
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Guardian Name:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.guardian_name}
                                            </span>
                                        </h1>
                                    </div>
                                    <div className="flex-shrink flex-grow basis-[20rem] rounded-lg bg-gray-100 p-3 text-center dark:bg-neutral-800">
                                        <h1 className="font-bold">
                                            Guardian Address:{' '}
                                            <span className="font-normal capitalize">
                                                {student?.guardian_address}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Deferred>
        </AppLayout>
    );
}
