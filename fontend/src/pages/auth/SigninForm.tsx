import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signinValid } from '@/lib/validations';
import { Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { imgs } from '@/assets/imgs';
import { useState } from 'react';
import { signin } from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useDispatch } from 'react-redux';
import { loginFailed, loginSuccess } from '@/redux/AuthSlice';

function SigninForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signinValid>>({
        resolver: zodResolver(signinValid),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof signinValid>) => {
        try {
            setIsLoading(true);
            const result = await signin(values.username, values.password);
            setIsLoading(false);

            if (!result) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: 'Login FAILED!.',
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
                return;
            }
            dispatch(loginSuccess(result));
            navigate('/');
            console.log(result);
        } catch (error) {
            dispatch(loginFailed());
            console.log('error of onSubmit: ', error);
        }
    };

    return (
        <div className="form_bg">
            <Form {...form}>
                <div className="sm:w-420 flex-center flex-col text-white">
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
                        className="flex flex-col gap-5 w-full mt-4 text-white"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="shad-input text-black"
                                            placeholder="Enter your username..."
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
                                            className="shad-input text-black"
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
                                'Log in'
                            )}
                        </Button>

                        <p className=" text-center mt-2">
                            Don&apos;t have an account?
                            <Link to="/sign-up" className="text-blue-500 ml-1">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </Form>
        </div>
    );
}

export default SigninForm;
