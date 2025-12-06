import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, icon, action }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {icon && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                            }}
                        >
                            {icon}
                        </Box>
                    )}
                    <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom={subtitle ? true : false}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body1" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>
                {action && <Box>{action}</Box>}
            </Box>
        </motion.div>
    );
}
