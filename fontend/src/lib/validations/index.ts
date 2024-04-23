import * as z from 'zod';

export const signupValid = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters.' })
        .max(60, { message: 'Name maximum 60 characters.' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    validpass: z.string(),
}).refine((data) => data.password === data.validpass, {
    message: "Passwords don't match", path: ['validpass'],
});

export const signinValid = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});
