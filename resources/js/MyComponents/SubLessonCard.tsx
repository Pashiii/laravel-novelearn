import { Button } from '@/components/ui/button';
import { DeleteAlert } from './DeleteAlert';
import ReusableCard from './ReusableCard';

interface SubLessonCardProps {
    id: number;
    lessonId: number;
    title: string;
    instruction?: string;
    thumbnail?: string;
}

export const SubLessonCard: React.FC<SubLessonCardProps> = ({
    id,
    title,
    instruction,
    thumbnail,
}) => {
    const SubLessonActions = (
        <>
            <div className="grid grid-cols-2 gap-2">
                <Button className={'bg-orange-400 text-white'}>Update</Button>
                <DeleteAlert
                    data={{ id, title }}
                    params={{ id: id }}
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
