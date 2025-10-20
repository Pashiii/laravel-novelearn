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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Lesson, Playlists } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    playlist: Playlists;
    lesson: Lesson[];
    className?: string;
}

export const CreateLessonDialog: React.FC<Props> = ({
    playlist,
    lesson,
    className,
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        thumb: null as File | null,
    });

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('lesson.store', { playlist: playlist.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                closeButtonRef.current?.click();
                toast.success('Lesson created successfully!');
            },
            onError: () => {
                toast.error('Failed to created!');
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
                    Add New Lesson
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
                        <Label htmlFor="course_title">Lesson Number</Label>
                        <Input
                            id="course_title"
                            name="course_title"
                            readOnly
                            value={lesson.length ? lesson.length + 1 : 1}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="course_title">Course Title</Label>

                        <Input
                            id="course_title"
                            name="course_title"
                            value={playlist.title}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="title">
                            Lesson Title
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
                        <Label htmlFor="description">
                            Course Description
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.description && data.description.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Write description"
                            className={`${errors.description && data.description.length <= 0 ? 'border-red-600' : ''}`}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
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
                            Create Lesson
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
