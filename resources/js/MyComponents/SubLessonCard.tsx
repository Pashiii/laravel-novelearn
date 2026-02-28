import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { DeleteAlert } from './DeleteAlert';
import ReusableCard from './ReusableCard';
import { UpdateSubLessonDialog } from './UpdateSubLessonDialog';

interface FileItem {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
}

interface SubLessonCardProps {
    id: number;
    lessonId: number;
    playlistId: number;
    title: string;
    instruction?: string;
    thumbnail?: string;
    files?: FileItem[];
    url?: string[];
    type: string;
    batchId: number;
    auth: {
        can: {
            createPlaylist: boolean;
            deletePlaylist: boolean;
            updatePlaylist: boolean;
        };
        user: {
            id: number;
            name: string;
            role: string;
        } | null;
    };
}

export const SubLessonCard: React.FC<SubLessonCardProps> = ({
    id,
    title,
    lessonId,
    playlistId,
    instruction,
    thumbnail,
    files,
    url,
    type,
    auth,
    batchId,
}) => {
    const isAdmin = auth.user?.role === 'admin';

    const SubLessonActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                {auth.can.updatePlaylist && (
                    <UpdateSubLessonDialog
                        playlist_id={playlistId}
                        subLesson={{
                            id: id,
                            lesson_id: lessonId,
                            instruction: instruction,
                            title: title,
                            files: files,
                            url: url,
                            type: type,
                        }}
                    />
                )}
                {auth.can.deletePlaylist && (
                    <DeleteAlert
                        data={{ id, title }}
                        params={{ lesson: lessonId, id: id }}
                        routeName="sub_lesson.destroy"
                    />
                )}
            </div>
            {batchId && !isAdmin ? (
                <Link
                    href={route('sub_lesson.show', {
                        playlist: playlistId,
                        lesson: lessonId,
                        subLesson: id,
                        batchId: batchId,
                    })}
                >
                    <Button className="w-full bg-green-900 text-white">
                        View
                    </Button>
                </Link>
            ) : (
                <Link
                    href={route('sub_lesson.show', {
                        playlist: playlistId,
                        lesson: lessonId,
                        subLesson: id,
                        batchId: undefined,
                    })}
                >
                    <Button className="w-full bg-green-900 text-white">
                        View
                    </Button>
                </Link>
            )}
        </>
    );
    return (
        <ReusableCard
            actions={SubLessonActions}
            title={title}
            description={instruction}
            thumbnail={thumbnail}
        />
    );
};
