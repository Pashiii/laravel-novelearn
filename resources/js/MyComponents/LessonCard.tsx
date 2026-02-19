import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DeleteAlert } from './DeleteAlert';
import ReusableCard from './ReusableCard';
import { UpdateLessonDialog } from './UpdateLessonDialog';
interface LessonCardProps {
    id: number;
    batchId?: number;
    playlistId: number;
    title: string;
    description?: string;
    thumbnail?: string;
    auth: {
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
        can: {
            updateLesson: boolean;
            deleteLesson: boolean;
        };
    };
}
export const LessonCard: React.FC<LessonCardProps> = ({
    id,
    batchId,
    playlistId,
    title,
    description,
    thumbnail,
    auth,
}) => {
    const isStudent = auth.user?.role === 'student';

    const LessonActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                {auth.can.updateLesson && (
                    <UpdateLessonDialog
                        lesson={{
                            id: id,
                            playlist_id: playlistId,
                            title: title,
                            description: description,
                        }}
                    />
                )}
                {auth.can.deleteLesson && (
                    <DeleteAlert
                        data={{ id, title }}
                        routeName="lesson.destroy"
                        params={{ playlist: playlistId, lesson: id }}
                    />
                )}
            </div>
            {batchId && isStudent ? (
                <Link
                    href={route('sub_lesson.index', {
                        playlist: playlistId,
                        lesson: id,
                        batchId: batchId,
                    })}
                >
                    <Button className="w-full bg-green-900 text-white">
                        View Lesson
                    </Button>
                </Link>
            ) : (
                <Link
                    href={route('sub_lesson.index', {
                        playlist: playlistId,
                        lesson: id,
                    })}
                >
                    <Button className="w-full bg-green-900 text-white">
                        View Lesson
                    </Button>
                </Link>
            )}
        </>
    );
    return (
        <ReusableCard
            title={title}
            description={description}
            thumbnail={thumbnail}
            actions={LessonActions}
        />
    );
};
