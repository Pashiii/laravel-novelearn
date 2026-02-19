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
import { cn } from '@/lib/utils';
import { Playlists } from '@/types';
import { useForm } from '@inertiajs/react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    playlist: Playlists | null;
    className?: string;
}

export const UpdatePlaylistDialog: React.FC<Props> = ({
    playlist,
    className,
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        _method: 'PUT',
        title: '',
        description: '',
        thumb: null as File | null,
        hours: '',
    });

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!playlist) return;

        post(route('playlist.update', { playlist: playlist.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                closeButtonRef.current?.click();
                toast.success('Course updated successfully!');
            },
        });
    };
    useEffect(() => {
        if (playlist) {
            setData({
                title: playlist.title,
                description: playlist.description,
                hours: playlist.hours.toString(),
                thumb: null,
            });
        }
    }, [playlist, setData]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn('bg-orange-400 text-white', className)}>
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Course</DialogTitle>
                    <DialogDescription>
                        Modify the details of the selected course below. Ensure
                        all required fields are correctly filled out before
                        saving your changes.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleSubmit}>
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
                            required
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
                            required
                            className={`${errors.description && data.description.length <= 0 ? 'border-red-600' : ''}`}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="thumb">Course Thumbnail Max: 3MB</Label>
                        {errors.thumb && data.thumb == null && (
                            <p className="text-sm text-red-600">
                                {errors.hours}
                            </p>
                        )}
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
                            required
                            placeholder="Enter total hours"
                            className={`${errors.hours && data.hours.length <= 0 ? 'border-red-600' : ''}`}
                            value={data.hours}
                            onChange={(e) => setData('hours', e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                ref={closeButtonRef}
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
                            Update Course
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
