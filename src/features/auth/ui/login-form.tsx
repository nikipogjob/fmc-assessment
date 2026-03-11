'use client';

import { useForm } from 'react-hook-form';
import { LoginRequest } from '../model/types';
import { useLoginMutation } from '../api/auth-api';
import { toast } from 'react-toastify';
import { Button, Stack, TextField, Typography } from '@mui/material';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit = async (data: LoginRequest) => {
        try {
            await login(data).unwrap();
            toast.success('Successfully logged in');
        } catch {
            toast.error('Failed to log in');
        }
    };

    return (
        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', maxWidth: 420 }}
        >
            <Typography
                variant="h4"
                component="h1">
                Sign in
            </Typography>
            <TextField
                label="Email"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Enter a valid email',
                    },
                })}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 3,
                        message: 'Password must be at least 3 characters',
                    },
                })}
            />
            <Button
                type="submit"
                variant="contained"
                disabled={isLoading}>
                {isLoading ? 'Signing in ...' : 'Sign in'}
            </Button>
        </Stack>
    );
}
