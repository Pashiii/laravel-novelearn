import AppLayout from '@/layouts/app-layout';
import { CreateSubLessonDialog } from '@/MyComponents/CreateSubLessonDialog';
import { SkeletonCard } from '@/MyComponents/SkeletonCard';
import { SubLessonCard } from '@/MyComponents/SubLessonCard';
import { Lesson, Playlists, SubLesson, type BreadcrumbItem } from '@/types';
import { Deferred, Head, usePage } from '@inertiajs/react';

interface Props {
    lesson: Lesson;
    playlist: Playlists;
    sublessons: {
        data: SubLesson[];
        total: number;
    };
    batchId: number;
}

interface AuthProps {
    user: {
        id: number;
        name: string;
        role: string;
    } | null;
    can: {
        createPlaylist: boolean;
        deletePlaylist: boolean;
        updatePlaylist: boolean;
    };
}

export default function Index({
    lesson,
    playlist,
    sublessons,
    batchId,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: '/playlist',
        },
        {
            title: 'Course Details',
            href: `/playlist/${playlist.id}/lesson/${batchId ? `b${batchId}` : 'b'}`,
        },
        {
            title: 'Lesson Details',
            href: '/playlist/lesson/id/lesson',
        },
    ];
    console.log(batchId);
    const { auth } = usePage<{ auth: AuthProps }>().props;
    const isStudent = auth.user?.role == 'student';
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sub Lessons" />
            <Deferred
                data="sublessons"
                fallback={() => <SkeletonCard isStudent={isStudent} />}
            >
                <div className="mx-auto w-full max-w-6xl">
                    <div className="m-5">
                        <div className="mr-10 mb-5 flex justify-end">
                            {auth.can.createPlaylist && (
                                <CreateSubLessonDialog
                                    playlist_id={playlist.id}
                                    lesson={lesson}
                                    total={sublessons?.total}
                                />
                            )}
                        </div>
                        <div className="grid gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                            {sublessons?.data.map((sublesson, ind) => (
                                <SubLessonCard
                                    key={ind}
                                    title={sublesson.title}
                                    instruction={sublesson.instruction}
                                    id={sublesson.id}
                                    files={sublesson.files}
                                    lessonId={sublesson.lesson_id}
                                    playlistId={playlist?.id}
                                    type={sublesson.type}
                                    auth={auth}
                                    batchId={batchId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Deferred>
        </AppLayout>
    );
}
