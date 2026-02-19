import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@radix-ui/react-select';

interface Props {
    isBatch?: boolean;
    noButton?: boolean;
    isStudent?: boolean;
    isHeader?: boolean;
}

export const SkeletonCard = ({
    isBatch,
    noButton,
    isStudent,
    isHeader,
}: Props) => {
    const placeholders = Array.from({ length: 6 });

    return (
        <div className="mx-auto w-full max-w-6xl">
            {isHeader && (
                <>
                    <div className="m-5">
                        <Card>
                            <div className="mx-5 flex flex-wrap items-start">
                                <div className="relative h-[18rem] flex-shrink flex-grow basis-[30rem] overflow-hidden rounded-md">
                                    {/* <span className="absolute top-4 left-4 rounded-sm bg-black/40 px-4 py-1 text-lg text-white">
                                {playlist.lesson_count}
                            </span>
                            <img
                                src={`${playlist.thumb ? `${import.meta.env.VITE_AWS_URL + '/' + playlist.thumb}` : '/default-playlist.jpg'}`}
                                alt=""
                                className="h-full w-full object-cover"
                            /> */}
                                    <Skeleton className="h-full w-full" />
                                </div>
                                <div className="flex-shrink flex-grow basis-[30rem]">
                                    <CardHeader className="mt-5 gap-5">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-3 w-1/3" />
                                        <Skeleton className="h-3 w-2/3" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </CardHeader>
                                    <CardContent className="mt-5 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Skeleton className="h-11" />
                                            <Skeleton className="h-11" />
                                        </div>
                                        <Skeleton className="h-11" />
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="m-5">
                        <Skeleton className="h-4 w-25" />
                        <Separator className="my-4 border-1" />
                    </div>
                </>
            )}
            <div className="m-5">
                {!isHeader && !noButton && !isStudent && (
                    <div className="mr-10 mb-5 flex justify-end">
                        <Skeleton className="h-12 w-40" />
                    </div>
                )}

                {/* <div className="relative my-5 mr-auto flex h-12 w-full max-w-xl gap-2">
                    <Skeleton    className="h-full w-full border-1 bg-white pl-10" />
                    <Skeleton className="h-full w-40" />
                </div> */}
                <div className="grid auto-rows-fr gap-5 min-[490px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                    {placeholders.map((_, index) => (
                        <Card
                            className="overflow-hidden shadow-md transition hover:shadow-lg"
                            key={index}
                        >
                            <CardHeader>
                                {isBatch ? (
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="h-40 w-full overflow-hidden">
                                            <Skeleton
                                                className="h-full"
                                                key={index}
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-3 w-2/3" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {isBatch && (
                                    <div className="flex flex-col space-y-2">
                                        <Skeleton className="h-3 w-2/3" />
                                        <Skeleton className="h-3 w-2/4" />
                                    </div>
                                )}
                                {!isStudent && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Skeleton className="h-9 w-full" />
                                        <Skeleton className="h-9 w-full" />
                                    </div>
                                )}

                                <Skeleton className="h-9 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
