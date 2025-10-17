import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DeleteAlert } from './DeleteAlert';
import ReusableCard from './ReusableCard';
import { UpdateLessonDialog } from './UpdateLessonDialog';
interface LessonCardProps {
    id: number;
    playlistId: number;
    title: string;
    description?: string;
    thumbnail?: string;
}
export const LessonCard: React.FC<LessonCardProps> = ({
    id,
    playlistId,
    title,
    description,
    thumbnail,
}) => {
    const LessonActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                <UpdateLessonDialog
                    lesson={{
                        id: id,
                        playlist_id: playlistId,
                        title: title,
                        description: description,
                    }}
                />
                <DeleteAlert
                    data={{ id, title }}
                    routeName="lesson.destroy"
                    params={{ playlist: playlistId, id: id }}
                />
            </div>
            <Link href={route('sub_lesson.index', { id: id })}>
                <Button className="w-full bg-green-900 text-white">
                    View Lesson
                </Button>
            </Link>
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
