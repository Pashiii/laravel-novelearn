import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePlaylistDialog: React.FC<Props> = ({
    isOpen,
    setIsOpen,
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        course_id: '',
        tutor_id: '1',
        title: '',
        description: '',
        thumb: null as File | null,
        hours: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('playlist.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setIsOpen(false);
                toast.success('Course created successfully!');
            },
        });
    };

    useEffect(() => {
        const id = crypto.randomUUID();
        const short = id.replace(/-/g, '').slice(0, 14);
        const courseID = 'CRS-' + short;
        setData('course_id', courseID);
    }, [isOpen]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Course</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new course. Make
                        sure all required fields are completed before
                        submitting.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Input
                            id="tutorId"
                            name="tutorId"
                            value={data.tutor_id}
                            onChange={(e) => setData('tutor_id', '1')}
                            hidden
                            readOnly
                        />
                        <Label htmlFor="courseId">
                            Course ID
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        <Input
                            id="courseId"
                            name="courseId"
                            readOnly
                            value={data.course_id}
                            onChange={(e) =>
                                setData('course_id', e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="title">
                            Course Title
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
                            placeholder="Enter playlist title"
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
                    <div className="grid gap-3">
                        <Label htmlFor="hours">
                            Total Hours
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.hours && data.hours.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.hours}
                            </p>
                        )}
                        <Input
                            id="hours"
                            name="hours"
                            type="number"
                            placeholder="Enter playlist title"
                            className={`${errors.hours && data.hours.length <= 0 ? 'border-red-600' : ''}`}
                            value={data.hours}
                            onChange={(e) => setData('hours', e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-red-500 text-white"
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
