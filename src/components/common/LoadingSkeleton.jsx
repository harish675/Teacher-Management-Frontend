import { Skeleton, Box, Card, CardContent } from '@mui/material';

export function TableSkeleton({ rows = 5 }) {
    return (
        <Box>
            {[...Array(rows)].map((_, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                    <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
                </Box>
            ))}
        </Box>
    );
}

export function CardSkeleton({ count = 1 }) {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="100%" />
                        <Skeleton variant="text" width="80%" />
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export function FormSkeleton() {
    return (
        <Box>
            <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 3, borderRadius: 1 }} />
            <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 3, borderRadius: 1 }} />
            <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={56} sx={{ mb: 3, borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={120} height={42} sx={{ borderRadius: 1 }} />
        </Box>
    );
}
