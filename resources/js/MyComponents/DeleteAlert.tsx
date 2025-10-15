import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Playlists } from '@/types';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    data: Playlists;
    routeName: string;
    params?: Record<string, any>;
    className?: string;
}

export const DeleteAlert: React.FC<Props> = ({
    data,
    routeName,
    className,
}) => {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        destroy(route(routeName, { id: data.id }), {
            onSuccess: () => {
                toast.success('Deleted successfully!');
            },
        });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className={cn(
                        'w-full bg-red-500 text-white hover:bg-red-600',
                        className,
                    )}
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete{' '}
                        {data.title ? (
                            <>
                                the item "<strong>{data.title}</strong>"
                            </>
                        ) : (
                            'this item'
                        )}{' '}
                        and all its contents. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-500 text-white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete(data.id)}
                        className="bg-green-900 text-white"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
