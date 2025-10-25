import { CreatePlaylistDialog } from '@/MyComponents/CreatePlaylistDialog';
import PlaylistCard from '@/MyComponents/PlaylistCard';
import { SkeletonCard } from '@/MyComponents/SkeletonCard';
import AppLayout from '@/layouts/app-layout';
import { Playlists, type BreadcrumbItem } from '@/types';
import { Deferred, Head } from '@inertiajs/react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <Deferred data="playlists" fallback={() => <SkeletonCard />}>
                <div className="mx-auto w-full max-w-6xl">
                    <div className="m-5">
                        <div className="mr-10 mb-5 flex justify-end">
                            <CreatePlaylistDialog />
                        </div>
                        <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                            {playlists?.map((playlist, index) => (
                                <PlaylistCard playlist={playlist} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </Deferred>
        </AppLayout>
    );
}
