import AppLayout from '@/layouts/app-layout';
import { CreateSubLessonDialog } from '@/MyComponents/CreateSubLessonDialog';
import { SubLessonCard } from '@/MyComponents/SubLessonCard';
import { Lesson, Playlists, SubLesson, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    lesson: Lesson;
    playlist: Playlists;
    sublessons: SubLesson[];
}

export default function Index({ lesson, playlist, sublessons }: Props) {
    console.log(sublessons);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: '/playlist',
        },
        {
            title: 'Course Details',
            href: `/playlist/${playlist.id}/lesson`,
        },
        {
            title: 'Lesson Details',
            href: '/lesson/id/lesson',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lessons" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <div className="mr-10 mb-5 flex justify-end">
                        <CreateSubLessonDialog lesson={lesson} />
                    </div>
                    <div className="grid gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                        {sublessons.map((sublesson, ind) => (
                            <SubLessonCard
                                title={sublesson.title}
                                instruction={sublesson.instruction}
                                id={sublesson.id}
                                lessonId={sublesson.lesson_id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
