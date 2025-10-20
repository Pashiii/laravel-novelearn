import { Button } from '@/components/ui/button';
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
    title: string;
    instruction?: string;
    thumbnail?: string;
    files?: FileItem[];
    url?: string[];
    type: string;
}

export const SubLessonCard: React.FC<SubLessonCardProps> = ({
    id,
    title,
    lessonId,
    instruction,
    thumbnail,
    files,
    url,
    type,
}) => {
    const SubLessonActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                <UpdateSubLessonDialog
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
                <DeleteAlert
                    data={{ id, title }}
                    params={{ lesson: lessonId, id: id }}
                    routeName="sub_lesson.destroy"
                />
            </div>

            <Button className="w-full bg-green-900 text-white">View</Button>
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
