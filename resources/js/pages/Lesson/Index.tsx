import AppLayout from '@/layouts/app-layout';
import { CreateSubLessonDialog } from '@/MyComponents/CreateSubLessonDialog';
import { SubLessonCard } from '@/MyComponents/SubLessonCard';
import { Lesson, Playlists, SubLesson, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    lesson: Lesson;
    playlist: Playlists;
    sublessons: {
        data: SubLesson[];
        total: number;
    };
}

export default function Index({ lesson, playlist, sublessons }: Props) {
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
            <Head title="Sub Lessons" />
            <div className="mx-auto w-full max-w-6xl">
                <div className="m-5">
                    <div className="mr-10 mb-5 flex justify-end">
                        <CreateSubLessonDialog
                            lesson={lesson}
                            total={sublessons.total}
                        />
                    </div>
                    <div className="grid gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                        {sublessons.data.map((sublesson, ind) => (
                            <SubLessonCard
                                key={ind}
                                title={sublesson.title}
                                instruction={sublesson.instruction}
                                id={sublesson.id}
                                files={sublesson.files}
                                lessonId={sublesson.lesson_id}
                                type={sublesson.type}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
