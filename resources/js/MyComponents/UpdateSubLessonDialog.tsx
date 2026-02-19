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
import { SubLesson } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import AttachmentUploader from './AttachmentUploader';

interface Props {
    playlist_id: number;
    subLesson: SubLesson;
}
interface FileItem {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
}

export const UpdateSubLessonDialog: React.FC<Props> = ({
    playlist_id,
    subLesson,
}) => {
    const { data, setData, post, errors, processing, reset } = useForm<{
        _method: 'PUT';
        title: string;
        type: string;
        instruction: string;
        thumb: File | null;
        files: File[];
        url: string[];
        deleted_files: number[];
    }>({
        _method: 'PUT',
        title: '',
        type: '',
        instruction: '',
        thumb: null,
        files: [],
        url: [],
        deleted_files: [],
    });
    const [existingFiles, setExistingFiles] = useState<FileItem[]>([]);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(
            route('sub_lesson.update', {
                playlist: playlist_id,
                lesson: subLesson.lesson_id,
                subLesson: subLesson.id,
            }),
            {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    closeButtonRef.current?.click();
                    toast.success('New material added!');
                },
                onError: () => {
                    toast.error('Failed to create!');
                },
            },
        );
    };

    useEffect(() => {
        if (subLesson) {
            setData({
                title: subLesson.title,
                instruction: subLesson.instruction,
                type: subLesson.type,
                thumb: null,
                files: [],
                url: subLesson.url,
                deleted_files: [],
            });
            setExistingFiles(subLesson.files || []);
        }
    }, [subLesson, setData]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 text-white">Update</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] w-full overflow-y-auto p-4 sm:w-auto sm:max-w-lg sm:rounded-lg sm:p-6">
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
                            defaultValue={data.type}
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

                    <AttachmentUploader
                        setData={setData}
                        data={data}
                        existingFiles={existingFiles}
                    />

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
                            Update Material
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
