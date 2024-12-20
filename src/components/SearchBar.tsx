import { z } from 'zod';
import { Button } from './ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect } from 'react';


const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required",
    }),
});

export type SearchForm = z.infer<typeof formSchema>


type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    searchQuery: string;
    onReset?: () => void;

}


const SearchBar = ({ placeHolder, onSubmit, onReset, searchQuery }: Props) => {



    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        },
    })


    const handleReset = () => {
        form.reset({
            searchQuery: '',
        });

        if (onReset) {
            onReset();
        }
    }

    useEffect(() => {
        form.reset({
            searchQuery,
        });

    }, [form, searchQuery])

    return (
        <>

            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 justify-between bg-slate-100 flex-row border-2 rounded-full p-[10px] mx-5 ${form.formState.errors.searchQuery && "border-red-500 "}`}>



                    <Search strokeWidth={2.5} size={30} className='ml-1 text-orange-500 hidden md:block' />

                    <FormField control={form.control} name='searchQuery' render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormControl>
                                <Input {...field} className='border-none shadow-none text-xl focus-visible:ring-0' placeholder={placeHolder} />
                            </FormControl>
                        </FormItem>


                    )} />


                    <Button type="button" variant="outline" className='rounded-full' onClick={handleReset} >
                        Reset
                    </Button>

                    <Button type="submit" className='bg-orange-500 rounded-3xl text-white'>
                        Search
                    </Button>
                </form>
            </Form>

        </>
    )
}

export default SearchBar;