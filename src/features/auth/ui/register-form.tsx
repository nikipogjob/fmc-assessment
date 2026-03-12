'use client';

import { useForm } from 'react-hook-form';
import { RegisterRequest } from '../model/types';
import { useRegisterMutation } from '../api/auth-api';
import { toast } from 'react-toastify';
import { Button, Stack, TextField, Typography } from '@mui/material';

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    const [registerUser, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data: RegisterRequest) => {
        try {
            await registerUser(data).unwrap();
            toast.success('Account created successfully');
        } catch {
            toast.error('Failed to create account');
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
                Create account
            </Typography>

            <TextField
                label="First name"
                fullWidth
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...register('firstName', {
                    required: 'First name is required',
                })}
            />

            <TextField
                label="Last name"
                fullWidth
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                {...register('lastName', {
                    required: 'Last name is required',
                })}
            />

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
                {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
        </Stack>
    );
}