import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { CreatePlaylistDialog } from '@/MyComponents/CreatePlaylistDialog';
import { DeleteAlert } from '@/MyComponents/DeleteAlert';
import { UpdatePlaylistDialog } from '@/MyComponents/UpdatePlaylistDialog';
import AppLayout from '@/layouts/app-layout';
import { Playlists, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/playlist',
    },
];

interface PageProps {
    playlists: Playlists[];
}

export default function Index({ playlists }: PageProps) {
    const { reset, delete: destroy } = useForm({
        tutor_id: '1',
        course_id: '',
        title: '',
        description: '',
        thumb: null as File | null,
        hours: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPlaylist, setEditingPlaylist] = useState<Playlists | null>(
        null,
    );

    const handleEdit = (playlist: Playlists) => {
        setEditingPlaylist(playlist);
        setIsEditing(true);
    };
    const handleCreate = () => {
        reset();
        setEditingPlaylist(null);
        setIsEditing(false);
        setIsOpen(true);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <CreatePlaylistDialog setIsOpen={setIsOpen} isOpen={isOpen} />
            <UpdatePlaylistDialog
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                playlist={editingPlaylist}
            />
            <div className="m-5">
                <div className="mr-10 mb-5 flex justify-end">
                    <Button
                        onClick={handleCreate}
                        className="bg-green-900 px-10 py-6 text-sm text-white"
                    >
                        Add Course
                    </Button>
                </div>
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 lg:grid-cols-3">
                    {playlists.map((playlist, index) => (
                        <Card
                            className="w-full max-w-sm overflow-hidden shadow-md transition hover:shadow-lg"
                            key={index}
                        >
                            <CardHeader>
                                <div className="h-40 w-full overflow-hidden rounded-md">
                                    <img
                                        src={`${playlist.thumb ? `/storage/${playlist.thumb}` : 'default-playlist.jpg'}`}
                                        className="h-full w-full object-cover"
                                        alt=""
                                    />
                                </div>

                                <CardTitle>{playlist.title}</CardTitle>
                                <CardDescription>
                                    {playlist.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        className="w-full bg-orange-400 text-white"
                                        onClick={() => handleEdit(playlist)}
                                    >
                                        Update
                                    </Button>

                                    <DeleteAlert
                                        data={playlist}
                                        routeName="playlist.destroy"
                                    />
                                </div>
                                <Link
                                    href={route('lesson.index', {
                                        id: playlist.id,
                                    })}
                                >
                                    <Button className="w-full bg-green-900 text-white">
                                        View
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
