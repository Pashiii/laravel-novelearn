import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { UserSkeletonCard } from '@/MyComponents/UserSkeletonCard';
import { type BreadcrumbItem } from '@/types';
import { Deferred, Head, Link, useForm } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

interface Props {
    filters: {
        search: string;
    };
    students: {
        data: {
            id: number;
            full_name: string;
            image: string;
            student_number: string;
        }[];
    };
}

export default function Index({ filters, students }: Props) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(route('student.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <Deferred data="students" fallback={() => <UserSkeletonCard />}>
                <div className="mx-auto w-full max-w-6xl">
                    <div className="m-5">
                        <div className="mr-10 mb-5 flex justify-end">
                            <Link href={route('student.create')}>
                                <Button className="bg-green-900 px-10 py-6 text-sm text-white">
                                    Add Student Account
                                </Button>
                            </Link>
                        </div>
                        <form action="" onSubmit={handleSubmitSearch}>
                            <div className="relative my-5 mr-auto flex h-12 w-full max-w-xl gap-2">
                                <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    type="search"
                                    placeholder="Search student..."
                                    className="h-full pl-10"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData('search', e.target.value)
                                    }
                                />
                                <Button
                                    className="h-full w-30 bg-green-900"
                                    type="submit"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                        <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                            {students?.data?.map((student, index) => (
                                <Card
                                    className="overflow-hidden shadow-md transition hover:shadow-lg"
                                    key={index}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 overflow-hidden rounded-full">
                                                <img
                                                    src={`${student.image ? `${import.meta.env.VITE_AWS_URL + '/' + student.image}` : '/default-profile.png'}`}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">
                                                    {student.full_name}
                                                </CardTitle>
                                                <CardDescription>
                                                    {student.student_number}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="mt-auto space-y-2">
                                        <Link
                                            href={route('student.show', {
                                                student: student.id,
                                            })}
                                        >
                                            <Button className="w-full bg-green-900 text-white">
                                                View
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </Deferred>
        </AppLayout>
    );
}
