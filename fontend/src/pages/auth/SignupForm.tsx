import { imgs } from '@/assets/imgs';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signupValid } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

function SignupForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof signupValid>>({
        resolver: zodResolver(signupValid),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            validpass: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof signupValid>) => {
        console.log(values);
        navigate('/sign-in');
    };

    return (
        <div className=" py-5 px-10 ">
            <Form {...form}>
                <div className="sm:w-420 flex-center flex-col">
                    <div className=" flex-center gap-5">
                        <img
                            src={imgs.logo}
                            alt="logo"
                            className="w-[60px] h-[60px]"
                        />
                        <p className=" text-2xl">Social Media</p>
                    </div>

                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        Welcome back! Please enter your details.
                    </p>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-5 w-full mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            placeholder="Enter your name..."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="shad-input"
                                            placeholder="Enter your email..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="shad-input"
                                            placeholder="Enter your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="validpass"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">
                                        Valid password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="shad-input"
                                            placeholder="Enter your password..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="shad-button_primary">
                            {isLoading ? (
                                <div className="flex-center gap-2">
                                    <Loader /> Loading...
                                </div>
                            ) : (
                                'Register'
                            )}
                        </Button>

                        <p className=" text-center mt-2">
                            You have a account?
                            <Link to="/sign-in" className="text-white ml-1">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </Form>
        </div>
    );
}

export default SignupForm;
