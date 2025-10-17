import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Lesson } from '@/types';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import AttachmentUploader from './AttachmentUploader';

interface Props {
    lesson: Lesson;
    className?: string;
}
interface Attachment {
    type: 'file' | 'image' | 'video' | 'link' | 'pdf';
    name: string;
    url: string;
}

export const CreateSubLessonDialog: React.FC<Props> = ({
    className,
    lesson,
}) => {
    const { data, setData, post, errors, processing, reset } = useForm<{
        title: string;
        type: string;
        instruction: string;
        thumb: File | null;
        files: File[];
        url: string;
    }>({
        title: '',
        type: '',
        instruction: '',
        thumb: null,
        files: [],
        url: '',
    });

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    console.log(data);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('sub_lesson.store', { lesson: lesson.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                closeButtonRef.current?.click();
                toast.success('New material added!');
            },
            onError: () => {
                toast.error('Failed to create!');
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        'h-11 w-full bg-green-900 text-lg text-white',
                        className,
                    )}
                >
                    Add New Lesson Material
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Lesson</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new course. Make
                        sure all required fields are completed before
                        submitting.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="lesson_number">Lesson Number</Label>
                        <Input
                            id="lesson_number"
                            name="lesson_number"
                            readOnly
                            // value={lesson.length ? lesson.length + 1 : 1}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="lesson_title">Lesson Title</Label>

                        <Input
                            id="lesson_title"
                            name="lesson_title"
                            value={lesson.title}
                            readOnly
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="title">
                            Material Title
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.title && data.title.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter lesson title"
                            value={data.title}
                            className={`${errors.title && data.title.length <= 0 ? 'border-red-600' : ''}`}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="lesson_title">Lesson Title</Label>
                        <Select
                            defaultValue=""
                            onValueChange={(value) => setData('type', value)}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select Assessment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="material">
                                    Material
                                </SelectItem>
                                <SelectItem value="activity">
                                    Activity
                                </SelectItem>
                                <SelectItem value="exam">Exam</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">
                            Material Instructions
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.instruction && data.instruction.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.instruction}
                            </p>
                        )}
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Write description"
                            className={`${errors.instruction && data.instruction.length <= 0 ? 'border-red-600' : ''}`}
                            value={data.instruction}
                            onChange={(e) =>
                                setData('instruction', e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="thumb">Course Thumbnail Max: 3MB</Label>
                        <Input
                            id="thumb"
                            name="thumb"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setData('thumb', file);
                            }}
                        />
                    </div>

                    <AttachmentUploader setData={setData} data={data} />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-red-500 text-white"
                                ref={closeButtonRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-green-900 text-white"
                            disabled={processing}
                        >
                            Create Course
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
