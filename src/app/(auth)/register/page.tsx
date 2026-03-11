import { RegisterForm } from '@/features/auth/ui/register-form';
import { Box } from '@mui/material';

export default function RegisterPage() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                px: 2,
            }}
        >
            <RegisterForm />
        </Box>
    );
}