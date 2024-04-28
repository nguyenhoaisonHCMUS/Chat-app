import * as z from 'zod';

export const signupValid = z.object({
    fullname: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters.' })
        .max(60, { message: 'Name maximum 60 characters.' }),
    username: z.string().min(6, {message: 'Username must be at least 6 characters.'}),
    gender: z.enum(["male", "female",], {
        required_error: "You need to select a notification type.",
      }),
    password: z.string().min(6, { message: 'Password must be at least 8 characters.' }),
    validpass: z.string(),
}).refine((data) => data.password === data.validpass, {
    message: "Passwords don't match", path: ['validpass'],
});

export const signinValid = z.object({
    username: z.string(),
    password: z.string(),
});
