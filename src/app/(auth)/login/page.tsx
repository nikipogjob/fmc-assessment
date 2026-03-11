import { LoginForm } from '@/features/auth/ui/login-form';
import { Box } from '@mui/material';

export default function LoginPage() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                px: 2,
            }}
        >
            <LoginForm />
        </Box>
    );
}