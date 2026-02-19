import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { dateFormat } from '@/utils/dateFormat';
import { useForm } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface CertificateProps {
    settings: {
        event_date: string;
        venue: string;
        admin_name: string;
        mayor_name: string;
        background_image: File;
    };
}

const UpdateCertificatesDialog: React.FC<CertificateProps> = ({ settings }) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        event_date: settings?.event_date || '',
        venue: settings?.venue || '',
        admin_name: settings?.admin_name || '',
        mayor_name: settings?.mayor_name || '',
        background_image: null as File | null,
    });
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [date, setDate] = useState<Date>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('certificate.updateSettings'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Certificate details update successfully!');
                reset();
                closeButtonRef.current?.click();
            },
            onError: () => {
                toast.error('Failed to update!');
            },
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-900 hover:bg-green-800">
                    Update Certificate Details
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Certificate Details</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="background_image">
                            Course Thumbnail Max: 3MB
                        </Label>
                        <div className="flex w-full items-center justify-center">
                            <img
                                src={`${data?.background_image ? URL.createObjectURL(data?.background_image) : `storage/${settings?.background_image}`}`}
                                className="w-full max-w-[200px]"
                            />
                        </div>

                        <Input
                            id="background_image"
                            name="background_image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setData('background_image', file);
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Date
                            <span className="ml-1 text-red-600">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.event_date
                                        ? dateFormat(data.event_date)
                                        : 'mm / dd / yyyy'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate);
                                        if (selectedDate) {
                                            setData(
                                                'event_date',
                                                selectedDate.toLocaleDateString(),
                                            );
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Venue
                            <span className="ml-1 text-red-600">*</span>
                        </Label>

                        <Input
                            id="venue"
                            name="venue"
                            placeholder="Enter venue"
                            value={data.venue}
                            className={`${errors.venue && data.venue.length <= 0 ? 'border-red-600' : ''}`}
                            onChange={(e) => setData('venue', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            NCLC Admin
                            <span className="ml-1 text-red-600">*</span>
                        </Label>

                        <Input
                            id="admin_name"
                            name="admin_name"
                            placeholder="Enter admin name"
                            value={data.admin_name}
                            className={`${errors.admin_name && data.admin_name.length <= 0 ? 'border-red-600' : ''}`}
                            onChange={(e) =>
                                setData('admin_name', e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label>
                            Mayor
                            <span className="ml-1 text-red-600">*</span>
                        </Label>

                        <Input
                            id="mayor_name"
                            name="mayor_name"
                            placeholder="Enter mayor name"
                            value={data.mayor_name}
                            className={`${errors.mayor_name && data.mayor_name.length <= 0 ? 'border-red-600' : ''}`}
                            onChange={(e) =>
                                setData('mayor_name', e.target.value)
                            }
                        />
                    </div>
                    <DialogFooter>
                        <div className="flex w-full flex-col gap-2">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    ref={closeButtonRef}
                                    className="bg-red-500 text-white"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-green-900 text-white hover:bg-green-800"
                                disabled={processing}
                            >
                                Update Certificate Details
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCertificatesDialog;
