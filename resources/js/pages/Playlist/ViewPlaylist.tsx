import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import AppLayout from '@/layouts/app-layout';
import { CreateLessonDialog } from '@/MyComponents/CreateLessonDialog';
import { DeleteAlert } from '@/MyComponents/DeleteAlert';
import LessonCard from '@/MyComponents/LessonCard';
import { UpdatePlaylistDialog } from '@/MyComponents/UpdatePlaylistDialog';
import { Lesson, Playlists, type BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/dateFormat';
import { Head, usePage } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/playlist',
    },
    {
        title: 'Course Details',
        href: '/playlist/id',
    },
];
interface PageProps {
    playlist: Playlists;
    lessons: Lesson[];
}

export default function ViewPlaylist({ playlist, lessons }: PageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { flash } = usePage().props as {
        flash?: { success?: string; error?: string };
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lesson" />
            <UpdatePlaylistDialog
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                playlist={playlist}
            />
            <CreateLessonDialog
                playlist={playlist}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                lesson={lessons}
            />
            <div className="m-5">
                <Card className="mx-auto w-full max-w-6xl">
                    <div className="mx-5 flex flex-wrap items-start">
                        <div className="relative h-[18rem] flex-shrink flex-grow basis-[30rem] overflow-hidden rounded-md">
                            <img
                                src={`${playlist.thumb ? `/storage/${playlist.thumb}` : 'default-playlist.jpg'}`}
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
                                    {playlist.hours === 1 ? 'hour' : 'hours'}:{' '}
                                    {playlist.hours}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-5 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        className="h-11 w-full bg-orange-400 text-lg text-white"
                                        onClick={() =>
                                            setIsEditing((prev) => !prev)
                                        }
                                    >
                                        Update Course
                                    </Button>
                                    <DeleteAlert
                                        data={playlist}
                                        routeName="playlist.destroy"
                                        className="h-11 text-lg"
                                    />
                                </div>
                                <Button
                                    className="h-11 w-full bg-green-900 text-lg text-white"
                                    onClick={(e) => setIsOpen((prev) => !prev)}
                                >
                                    Add New Lesson
                                </Button>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="m-5">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-3">
                    {lessons.map((lesson, index) => (
                        <LessonCard
                            key={index}
                            description={lesson.description}
                            title={lesson?.title}
                            thumbnail={lesson.thumb}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
