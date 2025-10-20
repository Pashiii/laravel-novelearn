import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';

import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { CreateLessonDialog } from '@/MyComponents/CreateLessonDialog';
import { DeleteAlert } from '@/MyComponents/DeleteAlert';
import { LessonCard } from '@/MyComponents/LessonCard';
import { UpdatePlaylistDialog } from '@/MyComponents/UpdatePlaylistDialog';
import { Lesson, Playlists, type BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/dateFormat';
import { Head, router } from '@inertiajs/react';
import { Calendar, FolderOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/playlist',
    },
    {
        title: 'Course Details',
        href: '/playlist/id/lesson',
    },
];
interface PageProps {
    playlist: Playlists;
    lessons: {
        data: Lesson[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function ViewPlaylist({ playlist, lessons }: PageProps) {
    const handleClickPagination = (url: string | null) => {
        if (url) router.visit(url);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lesson" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <Card>
                        <div className="mx-5 flex flex-wrap items-start">
                            <div className="relative h-[18rem] flex-shrink flex-grow basis-[30rem] overflow-hidden rounded-md">
                                <span className="absolute top-4 left-4 rounded-sm bg-black/40 px-4 py-1 text-lg text-white">
                                    {playlist.lesson_count}
                                </span>
                                <img
                                    src={`${playlist.thumb ? `${import.meta.env.VITE_AWS_URL + '/' + playlist.thumb}` : '/default-playlist.jpg'}`}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-shrink flex-grow basis-[30rem]">
                                <CardHeader className="mt-5">
                                    <CardTitle className="text-xl">
                                        {playlist.title}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-2 text-base">
                                        <Calendar size={20} strokeWidth={2} />
                                        {formatDate(playlist.created_at)}
                                    </CardDescription>
                                    <CardDescription className="text-base">
                                        {playlist.description}
                                    </CardDescription>
                                    <CardDescription className="text-base">
                                        Total{' '}
                                        {playlist.hours === 1
                                            ? 'hour'
                                            : 'hours'}
                                        : {playlist.hours}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-5 space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <UpdatePlaylistDialog
                                            playlist={playlist}
                                            className="h-11 text-lg"
                                        />

                                        <DeleteAlert
                                            data={playlist}
                                            routeName="playlist.destroy"
                                            className="h-11 text-lg"
                                        />
                                    </div>
                                    <CreateLessonDialog
                                        playlist={playlist}
                                        lesson={lessons.data}
                                    />
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="m-5">
                    <h1 className="text-xl font-semibold">Lessons</h1>
                    <Separator className="my-4 border-1" />
                </div>
                <div className="m-5">
                    <div className="grid gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                        {lessons.data.map((lesson, index) => (
                            <LessonCard
                                key={index}
                                id={lesson.id}
                                playlistId={playlist.id}
                                description={lesson.description}
                                title={lesson?.title}
                                thumbnail={lesson.thumb}
                            />
                        ))}
                    </div>
                </div>

                <div className="m-5">
                    {lessons.data.length > 0 ? (
                        <Pagination>
                            <PaginationContent>
                                {lessons?.links.map((link, index) => {
                                    const label = link.label
                                        .replace(/&laquo;|&raquo;/g, '')
                                        .trim();

                                    if (label === 'Previous') {
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleClickPagination(
                                                            link.url,
                                                        );
                                                    }}
                                                    className={`hover:bg-green-900 hover:text-white ${!link.url ? 'cursor-default opacity-50' : ''}`}
                                                />
                                            </PaginationItem>
                                        );
                                    }

                                    if (label === 'Next') {
                                        return (
                                            <PaginationItem key={index}>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleClickPagination(
                                                            link.url,
                                                        );
                                                    }}
                                                    className={`hover:bg-green-900 hover:text-white ${!link.url ? 'cursor-default opacity-50' : ''}`}
                                                />
                                            </PaginationItem>
                                        );
                                    }

                                    return (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                href="#"
                                                className={cn(
                                                    link.active
                                                        ? 'bg-green-900 text-white hover:bg-green-900 hover:text-white'
                                                        : 'hover:bg-green-900 hover:text-white',
                                                )}
                                                isActive={link.active}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleClickPagination(
                                                        link.url,
                                                    );
                                                }}
                                            >
                                                {label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                            </PaginationContent>
                        </Pagination>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="rounded-full bg-gray-200/50 p-10">
                                <FolderOpen size={120} color="#bababa" />
                            </div>

                            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight text-black/50">
                                No Lessons Yet
                            </h3>
                            <p className="mt-2 max-w-md text-center text-gray-500">
                                Looks like there are no lessons for this course
                                yet. Start adding one to help your students
                                learn!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
