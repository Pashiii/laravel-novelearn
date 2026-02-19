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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import FileViewer from '@/MyComponents/FileViewer';
import { SubLesson, Submission, type BreadcrumbItem } from '@/types';

import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Separator } from '@radix-ui/react-select';
import {
    Album,
    FileText,
    Image,
    LinkIcon,
    Loader2,
    Plus,
    SquareChartGantt,
    Video,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface Props {
    subLesson: SubLesson;
    submission: Submission | null;
    submissions: Submission[];
    playlist_id: number;
    lesson_id: number;
    batchId: number;
}

interface AuthProps {
    user: {
        id: number;
        name: string;
        role: string;
    } | null;
}

interface FileItemType {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string;
}

export default function Index({
    subLesson,
    submission,
    submissions,
    playlist_id,
    lesson_id,
    batchId,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Courses',
            href: '/playlist',
        },
        {
            title: 'Course Details',
            href: `/playlist/${playlist_id}/lesson/${batchId ? `b${batchId}` : 'b'}`,
        },
        {
            title: 'Lesson Details',
            href: `/playlist/${playlist_id}/lesson/${lesson_id}/sub_lesson/${batchId ? `b${batchId}` : 'b'}`,
        },
        {
            title: 'View Content',
            href: `/playlist/lesson/${lesson_id}/sub_lesson`,
        },
    ];
    const { auth } = usePage<{ auth: AuthProps }>().props;
    const [submittedFiles, setSubmittedFiles] = useState<FileItemType[]>([]);
    const [popup, setPopup] = useState<{
        id: number;
        action: 'passed' | 'failed';
    } | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const { data, setData, post, errors, processing, reset } = useForm<{
        sub_lesson_id: number;
        batch_id: number;
        assessment: string;
        status: string;
        files: File[];
    }>({
        sub_lesson_id: subLesson.id,
        batch_id: batchId,
        assessment: subLesson.type,
        status: 'pending',
        files: [],
    });
    useEffect(() => {
        if (submission) {
            setSubmittedFiles(submission?.files || []);
            setSubmitted(true);
        }
    }, [submission]);
    const getFileIcon = (type: string) => {
        const ext = type?.split('.').pop()?.toLowerCase() ?? '';

        if (ext.includes('pdf'))
            return <FileText className="h-4 w-4 text-red-600" />;
        if (['mp4', 'webm', 'ogg', 'mov'].includes(ext))
            return <Image className="h-4 w-4 text-yellow-500" />;
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext))
            return <Video className="h-4 w-4 text-blue-600" />;
        if (type === 'link')
            return <LinkIcon className="h-4 w-4 text-gray-500" />;
        return <FileText className="h-4 w-4 text-gray-500" />;
    };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        setFiles((prev) => [...prev, ...files]);
        setData('files', [...data.files, ...files]);
        setUploading(false);
    };

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        setData('files', updated);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('submission.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast.success('Submit successful');
                setFiles([]);
            },
            onError: () => {
                toast.error('Failed to submit');
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Content" />
            <div className="mx-auto w-full max-w-6xl p-4">
                <div className="flex flex-wrap items-start gap-2 lg:p-4">
                    <Card className="flex-shrink flex-grow basis-[40rem]">
                        <CardHeader className="mt-5">
                            <div className="flex items-center gap-2">
                                {subLesson.type == 'Module' ? (
                                    <Album
                                        size={40}
                                        color="white"
                                        className="rounded-full bg-gray-500 p-2"
                                    />
                                ) : (
                                    <SquareChartGantt
                                        size={40}
                                        color="white"
                                        className="rounded-full bg-gray-500 p-2"
                                    />
                                )}

                                <CardTitle className="text-xl sm:text-3xl">
                                    {subLesson.title}
                                </CardTitle>
                            </div>

                            <CardDescription className="whitespace-pre-wrap sm:text-lg">
                                {subLesson.instruction}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-5 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                {subLesson.files?.map((file, index) => (
                                    <div
                                        className="flex items-center gap-2 rounded-lg border-1 p-2 shadow-border hover:shadow-md"
                                        key={index}
                                    >
                                        {getFileIcon(file.file_name)}
                                        <button
                                            className="w-full cursor-pointer truncate text-left"
                                            type="button"
                                            onClick={() =>
                                                setSelectedFile(
                                                    import.meta.env
                                                        .VITE_AWS_URL +
                                                        '/' +
                                                        file.file_path,
                                                )
                                            }
                                        >
                                            {file.file_name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    {auth?.user?.role === 'student' &&
                        subLesson.type !== 'material' && (
                            <Card className="flex-shrink flex-grow basis-[10rem]">
                                <CardHeader>
                                    <CardTitle>Submit Your Activity:</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 pb-5">
                                        {submittedFiles.length > 0 && (
                                            <div className="space-y-2">
                                                {submittedFiles.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="flex items-center justify-between rounded-md border bg-white p-2 shadow-sm"
                                                    >
                                                        <button
                                                            className="flex max-w-50 items-center gap-2"
                                                            onClick={() =>
                                                                setSelectedFile(
                                                                    import.meta
                                                                        .env
                                                                        .VITE_AWS_URL +
                                                                        '/' +
                                                                        file.file_path,
                                                                )
                                                            }
                                                        >
                                                            {getFileIcon(
                                                                file.file_name,
                                                            )}
                                                            <span className="w-full truncate">
                                                                {file.file_name}
                                                            </span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {files.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-md border bg-white p-2 shadow-sm"
                                            >
                                                <div className="flex max-w-50 items-center gap-2">
                                                    {getFileIcon(item.type)}
                                                    <span className="w-full truncate text-sm font-medium">
                                                        {item.name.length > 50
                                                            ? item.name.slice(
                                                                  0,
                                                                  50,
                                                              ) + '...'
                                                            : item.name}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFile(index)
                                                    }
                                                    className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {/* {existingFiles
                                        ?.filter(
                                            (f) =>
                                                !(
                                                    data.deleted_files || []
                                                ).includes(f.id),
                                        )
                                        .map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-md border bg-white p-2 shadow-sm"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {getFileIcon(
                                                        file?.file_path,
                                                    )}
                                                    <a
                                                        href={
                                                            awsURL +
                                                            '/' +
                                                            file.file_path
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="truncate text-sm font-medium text-blue-700 hover:underline"
                                                    >
                                                        {file.file_name.length >
                                                        50
                                                            ? file.file_name.slice(
                                                                  0,
                                                                  50,
                                                              ) + '...'
                                                            : file.file_name}
                                                    </a>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeExistingFile(
                                                            file.id,
                                                        )
                                                    }
                                                    className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}

                                    {attachments.length === 0 &&
                                        existingFiles?.length === 0 && (
                                            <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-10 text-gray-500">
                                                <p className="text-sm">
                                                    No attachments yet
                                                </p>
                                            </div>
                                        )} */}
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,video/*,.pdf"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />{' '}
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="h-4 w-4 text-center" />{' '}
                                                    Add File
                                                </>
                                            )}
                                        </label>
                                        {submitted ? (
                                            <Button
                                                disabled
                                                className="my-2 w-full bg-green-900 text-sm"
                                                type="button"
                                            >
                                                Submitted
                                            </Button>
                                        ) : (
                                            <Button
                                                className="my-2 w-full bg-green-900 text-sm"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        )}
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                </div>
                <div className="lg:px-4">
                    {auth?.user?.role !== 'student' && (
                        <Card className="flex-shrink flex-grow basis-[40rem]">
                            <CardHeader className="mt-5">
                                <CardTitle className="text-2xl">
                                    Submitted Activities
                                </CardTitle>
                                <Separator className="border-1" />
                            </CardHeader>
                            <CardContent>
                                <div className="w-full overflow-hidden rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Student Number
                                                </TableHead>
                                                <TableHead>
                                                    Student Name
                                                </TableHead>
                                                <TableHead>
                                                    Submitted File
                                                </TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {submissions.map(
                                                (details, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                details.student_number
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                details.student
                                                                    .formatted_name
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            <div className="flex flex-col gap-1">
                                                                {details.files?.map(
                                                                    (file) => (
                                                                        <a
                                                                            key={
                                                                                file.id
                                                                            }
                                                                            href={
                                                                                import.meta
                                                                                    .env
                                                                                    .VITE_AWS_URL +
                                                                                '/' +
                                                                                file.file_path
                                                                            }
                                                                            target="_blank"
                                                                            className="text-sm text-blue-600 underline"
                                                                        >
                                                                            {
                                                                                file.file_name
                                                                            }
                                                                        </a>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="capitalize">
                                                            {details.status}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-green-700 text-white"
                                                                    onClick={() =>
                                                                        setPopup(
                                                                            {
                                                                                id: details.id,
                                                                                action: 'passed',
                                                                            },
                                                                        )
                                                                    }
                                                                >
                                                                    Pass
                                                                </Button>

                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() =>
                                                                        setPopup(
                                                                            {
                                                                                id: details.id,
                                                                                action: 'failed',
                                                                            },
                                                                        )
                                                                    }
                                                                >
                                                                    Fail
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            {popup && (
                <AlertDialog
                    onOpenChange={(open) => {
                        if (!open) setPopup(null);
                    }}
                    open={!!popup}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle> Confirm Action</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to mark this submission as{' '}
                                <strong>
                                    {popup.action === 'passed'
                                        ? 'PASSED'
                                        : 'FAILED'}
                                </strong>
                                ?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-red-500 text-white">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-green-900 text-white"
                                onClick={() => {
                                    router.put(
                                        route('submission.update', {
                                            submission: popup.id,
                                        }),
                                        { status: popup.action },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    'Successfully update status',
                                                );
                                                setPopup(null);
                                            },
                                            onError: () =>
                                                toast.error(
                                                    'Failed to update status',
                                                ),
                                        },
                                    );
                                }}
                            >
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            {selectedFile && (
                <FileViewer
                    file_path={selectedFile}
                    onClose={() => setSelectedFile(null)}
                />
            )}
        </AppLayout>
    );
}
