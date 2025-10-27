import { CreatePlaylistDialog } from '@/MyComponents/CreatePlaylistDialog';
import PlaylistCard from '@/MyComponents/PlaylistCard';
import { SkeletonCard } from '@/MyComponents/SkeletonCard';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Playlists, type BreadcrumbItem } from '@/types';
import { Deferred, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/playlist',
    },
];

interface PageProps {
    playlists: Playlists[];
}

interface AuthProps {
    user: {
        id: number;
        name: string;
        role: string;
    } | null;
    can: {
        createPlaylist: boolean;
        deletePlaylist: boolean;
        updatePlaylist: boolean;
    };
}

export default function Index({ playlists }: PageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = usePage<{ auth: AuthProps }>().props;
    const isStudent = auth.user?.role == 'student';
    console.log(isStudent);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <CreatePlaylistDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            <Deferred
                data="playlists"
                fallback={() => <SkeletonCard isStudent={isStudent} />}
            >
                <div className="mx-auto w-full max-w-6xl">
                    <div className="m-5">
                        <div className="mr-10 mb-5 flex justify-end">
                            {auth.can.createPlaylist && (
                                <Button
                                    className="bg-green-900 px-10 py-6 text-sm text-white"
                                    onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    Add Course
                                </Button>
                            )}
                        </div>
                        <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                            {playlists?.map((playlist, index) => (
                                <PlaylistCard
                                    playlist={playlist}
                                    key={index}
                                    auth={auth}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Deferred>
        </AppLayout>
    );
}
