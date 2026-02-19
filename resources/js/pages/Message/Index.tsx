import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Messages',
        href: '/messages',
    },
];

interface Props {
    messages: {
        id: number;
        name: string;
        number: string;
        message: string;
        read_message: number;
    }[];
}

interface Message {
    id: number;
    name: string;
    number: string;
    message: string;
    read_message: number;
}

export default function Index({ messages }: Props) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(
        null,
    );

    const handleDelete = (id: number) => {
        router.delete(
            route('messages.destroy', {
                message: id,
            }),
            {
                onSuccess: () => {
                    toast.success('Deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete!');
                },
            },
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="mx-auto w-full max-w-4xl">
                <div className="m-5">
                    <Card>
                        {messages.map((message, index) => (
                            <Card key={index} className="relative mx-5">
                                {message.read_message === 0 && (
                                    <div className="absolute top-0 left-0 h-full w-2 rounded-l-full bg-red-500"></div>
                                )}
                                <CardContent className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-lg font-bold">
                                            {message.name}
                                        </h1>
                                        <p className="text-sm">
                                            Contact: {message.number}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            className="bg-green-900 hover:bg-green-800"
                                            onClick={() => {
                                                setSelectedMessage(message);
                                                setOpen(true);
                                                router.put(
                                                    route('messages.update', {
                                                        message: message.id,
                                                    }),
                                                    {},
                                                );
                                            }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            className="bg-red-500 text-white hover:bg-red-600"
                                            onClick={() => {
                                                setAlert(true);
                                                setSelectedMessage(message);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </Card>
                </div>
            </div>

            {/* View Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <div className="space-y-2">
                        <h1 className="text-lg font-semibold">
                            Message Details
                        </h1>

                        {selectedMessage && (
                            <>
                                <p>
                                    <strong>Name:</strong>{' '}
                                    {selectedMessage.name}
                                </p>
                                <p>
                                    <strong>Contact:</strong>{' '}
                                    {selectedMessage.number}
                                </p>
                                <p className="whitespace-pre-wrap">
                                    <strong>Message:</strong>{' '}
                                    {selectedMessage.message}
                                </p>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Alert */}
            <AlertDialog open={alert} onOpenChange={setAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete. This action cannot be
                            undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-500 text-white">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                handleDelete(selectedMessage?.id ?? 0)
                            }
                            className="bg-green-900 text-white"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
