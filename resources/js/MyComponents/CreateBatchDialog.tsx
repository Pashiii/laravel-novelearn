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
    batches: Batch[];
    playlists: Playlists[];
    tutors: {
        id: number;
        user: {
            name: string;
        };
    }[];
}

export const CreateBatchDialog = ({ batches, playlists, tutors }: Props) => {
    const { data, setData, post, processing, reset, errors } = useForm<{
        course_id: string;
        batch_number: string;
        course_title?: string;
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

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(route('batch.store'), {
            onSuccess: () => {
                reset();
                closeButtonRef.current?.click();
                toast.success('Batch created successfully!');
            },
        });
    };

    const generateBatchNumber = () => {
        const year = new Date();
        const numberBatch = batches.length + 1;
        const batchNumber = year.getFullYear() + '-' + numberBatch;
        setData('batch_number', batchNumber);
    };
    useEffect(() => {
        generateBatchNumber();
    }, []);

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
                <Button className="bg-green-900 px-10 py-6 text-sm text-white">
                    Create Batch
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Batch</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new course. Make
                        sure all required fields are completed before
                        submitting.
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
                            defaultValue=""
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
                            defaultValue=""
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
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData('schedule', [
                                                    ...data.schedule,
                                                    day,
                                                ]);
                                            } else {
                                                setData(
                                                    'schedule',
                                                    data.schedule.filter(
                                                        (d) => d !== day,
                                                    ),
                                                );
                                            }
                                        }}
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
                            defaultValue=""
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
                            Create Batch
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
