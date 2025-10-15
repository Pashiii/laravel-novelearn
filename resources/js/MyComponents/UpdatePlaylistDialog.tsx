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
import { Playlists } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    isEditing: boolean;
    setIsEditing: (open: boolean) => void;
    playlist: Playlists | null;
}

export const UpdatePlaylistDialog: React.FC<Props> = ({
    isEditing,
    setIsEditing,
    playlist,
}) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        _method: 'PUT',
        title: '',
        description: '',
        thumb: null as File | null,
        hours: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!playlist) return;

        post(route('playlist.update', { playlist: playlist.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setIsEditing(false);
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
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
