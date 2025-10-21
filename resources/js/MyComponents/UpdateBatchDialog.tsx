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
import { Batch, Playlists } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    playlists: Playlists[];
    tutors: {
        id: number;
        user: {
            name: string;
        };
    }[];
    batch: Batch;
}

export const UpdateBatchDialog = ({ batch, playlists, tutors }: Props) => {
    const scheduleArray = Array.isArray(batch.schedule)
        ? batch.schedule
        : JSON.parse(batch.schedule || '[]');
    const { data, setData, put, processing, reset, errors } = useForm<{
        course_id: string;
        batch_number: string;
        course_title: string;
        tutor_id: string;
        schedule: string[];
        start_time: string;
        end_time: string;
        status: string;
    }>({
        course_id: '',
        batch_number: '',
        course_title: '',
        tutor_id: '',
        schedule: [],
        start_time: '',
        end_time: '',
        status: '',
    });

    useEffect(() => {
        if (batch) {
            setData({
                course_id: batch.course_id?.toString() || '',
                batch_number: batch.batch_number || '',
                course_title: batch.course_title || '',
                tutor_id: batch.tutor_id?.toString() || '',
                schedule: scheduleArray || [],
                start_time: batch.start_time || '',
                end_time: batch.end_time || '',
                status: batch.status ? 'active' : 'deactive',
            });
        }
    }, [batch, setData]);

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        put(
            route('batch.update', {
                batch: batch.id,
            }),
            {
                onSuccess: () => {
                    reset();
                    closeButtonRef.current?.click();
                    toast.success('Batch updated successfully!');
                },
            },
        );
    };

    const handleScheduleChange = (day: string, checked: boolean) => {
        setData(
            'schedule',
            checked
                ? [...data.schedule, day]
                : data.schedule.filter((d: string) => d !== day),
        );
    };

    function errorClass(field: any) {
        return errors[field] && !(data as any)[field] ? 'border-red-600' : '';
    }

    function errorMessage(field: any) {
        return (
            errors[field] &&
            !(data as any)[field] && (
                <p className="text-sm text-red-600">{errors[field]}</p>
            )
        );
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-400 text-white">Update</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Batch</DialogTitle>
                    <DialogDescription>
                        Modify the details of the selected course below. Ensure
                        all required fields are correctly filled out before
                        saving your changes.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="status">
                            Status <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.status && data.status?.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.status}
                            </p>
                        )}
                        <Select
                            defaultValue={data.status}
                            onValueChange={(value) => setData('status', value)}
                        >
                            <SelectTrigger
                                id="status"
                                className={`${errors.status && data.status?.length == 0 ? 'border-red-600' : ''}`}
                            >
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="deactive">
                                    Deactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="batch_number">Batch Number</Label>

                        <Input
                            id="batch_number"
                            name="batch_number"
                            value={data.batch_number}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="course_title">
                            Course Title
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.course_title &&
                            data.course_title?.length == 0 && (
                                <p className="text-sm text-red-600">
                                    {errors.course_title}
                                </p>
                            )}
                        <Select
                            defaultValue={data.course_id}
                            onValueChange={(value) => {
                                const selectedCourse = playlists.find(
                                    (e) => e.course_id == value,
                                );
                                setData({
                                    ...data,
                                    course_id: value,
                                    course_title: selectedCourse?.title,
                                });
                            }}
                        >
                            <SelectTrigger
                                id="status"
                                className={`${errors.course_title && data.course_title?.length == 0 ? 'border-red-600' : ''}`}
                            >
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                                {playlists.map((playlist, index) => (
                                    <SelectItem
                                        value={playlist.course_id}
                                        key={index}
                                    >
                                        {playlist.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label>
                            Schedule
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errors.schedule && data.schedule?.length == 0 && (
                            <p className="text-sm text-red-600">
                                {errors.schedule}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-3">
                            {[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday',
                            ].map((day) => (
                                <label
                                    key={day}
                                    className="flex items-center gap-2 text-sm text-gray-700"
                                >
                                    <input
                                        type="checkbox"
                                        value={day}
                                        className="h-4 w-4 accent-green-900"
                                        checked={data.schedule.includes(day)}
                                        onChange={(e) =>
                                            handleScheduleChange(
                                                day,
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label>
                            Start Time
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errorMessage('start_time')}
                        <Input
                            type="time"
                            id="start_time"
                            step="1"
                            className={`appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${errorClass('start_time')}`}
                            value={data.start_time}
                            onChange={(e) =>
                                setData('start_time', e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>
                            End Time
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        {errorMessage('end_time')}
                        <Input
                            type="time"
                            id="end_time"
                            step="1"
                            className={`appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${errorClass('end_time')}`}
                            value={data.end_time}
                            onChange={(e) =>
                                setData('end_time', e.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="tutor_id">
                            Course Title
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        <Select
                            defaultValue={data.tutor_id}
                            onValueChange={(value) =>
                                setData('tutor_id', value)
                            }
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select Course" />
                            </SelectTrigger>

                            {tutors.length == 0 ? (
                                <SelectContent aria-readonly>
                                    <SelectItem value="no value" disabled>
                                        No tutors available
                                    </SelectItem>
                                </SelectContent>
                            ) : (
                                <SelectContent>
                                    {tutors.map((tutor, index) => (
                                        <SelectItem
                                            value={tutor.id.toString()}
                                            key={index}
                                        >
                                            {tutor.user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            )}
                        </Select>
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
                            Update Batch
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
