import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    isBatch?: boolean;
    noButton?: boolean;
    isStudent?: boolean;
}

export const SkeletonCard = ({ isBatch, noButton, isStudent }: Props) => {
    const placeholders = Array.from({ length: 6 });

    return (
        <div className="mx-auto w-full max-w-6xl">
            <div className="m-5">
                {!noButton && !isStudent && (
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
