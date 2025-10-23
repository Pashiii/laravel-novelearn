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
import { useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface DataProps {
    id: number;
    title: string;
}

interface Props {
    data: DataProps;
    routeName: string;
    params?: Record<string, any>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

export const DeleteUserAlert: React.FC<Props> = ({
    data,
    routeName,
    params,
    open,
    setOpen,
}) => {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        destroy(route(routeName, params ?? { id: data.id }), {
            onSuccess: () => {
                toast.success('Deleted successfully!');
                setOpen(false);
            },
        });
    };

    return (
        <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to permanently delete{' '}
                        {data.title ? (
                            <>
                                the user "<strong>{data.title}</strong>"
                            </>
                        ) : (
                            'this user account'
                        )}
                        . All associated data, records, and access privileges
                        will be lost and cannot be restored. Please confirm if
                        you wish to continue.
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
