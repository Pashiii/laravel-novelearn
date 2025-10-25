import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonRow } from './SkeletonRow';

interface Props {
    student?: boolean;
}

export const UserProfileSkeleton = ({ student }: Props) => {
    const placeholders = [{ column: 3, row: 2 }];
    return (
        <div className="mx-auto w-full max-w-6xl">
            <div className="m-5">
                <Card className="relative">
                    <div className="absolute right-5">
                        <Skeleton className="h-8 w-8" />
                    </div>
                    <CardHeader className="flex flex-col items-center justify-center text-center">
                        <div className="h-25 w-25 overflow-hidden rounded-full">
                            <Skeleton className="h-full w-full" />
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-30" />
                            {student && <Skeleton className="h-4 w-25" />}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-8 pt-15">
                        <CardTitle>
                            <Skeleton className="h-5 w-50" />
                        </CardTitle>
                        <SkeletonRow items={6} />
                        <CardTitle>
                            <Skeleton className="h-5 w-50" />
                        </CardTitle>
                        <SkeletonRow items={6} />
                        <CardTitle>
                            <Skeleton className="h-5 w-50" />
                        </CardTitle>
                        <SkeletonRow items={3} />
                        {student && (
                            <>
                                <CardTitle>
                                    <Skeleton className="h-5 w-50" />
                                </CardTitle>
                                <SkeletonRow items={1} />
                                <CardTitle>
                                    <Skeleton className="h-5 w-50" />
                                </CardTitle>
                                <SkeletonRow items={2} />
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
