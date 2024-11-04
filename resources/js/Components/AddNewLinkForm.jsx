import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useForm} from "@inertiajs/react";
import {useState} from "react";

export default function AddNewLinkForm({appUrl}) {
    const {data, setData, post, errors, reset} = useForm({
        slug: '',
        url: '',
    });

    const [copied, setCopied] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('links.store'), {
            errorBag: 'createLink',
            preserveScroll: true,
            onSuccess: (response) => {
                reset();
                setGeneratedUrl(response?.props?.flash?.success?.slug);
                setShowSuccess(true);
                setCopied(false);
            },
        });
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <form
                        className="space-y-6"
                        onSubmit={onSubmit}
                    >
                        <div className="space-y-2">
                            <InputLabel
                                value="URL"
                                htmlFor="url"
                                className="flex items-center gap-1"
                            >
                                URL <span className="text-red-500">*</span>
                            </InputLabel>
                            <TextInput
                                id="url"
                                className="mt-1 block w-full"
                                type="url"
                                value={data.url}
                                placeholder="https://example.com"
                                onChange={(e) => setData('url', e.target.value)}
                            />
                            <InputError
                                message={errors.url}
                                className="mt-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <InputLabel
                                value="Custom Slug (Optional)"
                                htmlFor="slug"
                            />
                            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-2 w-full">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
                                            {appUrl}/
                                        </span>
                                        <TextInput
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="custom-slug"
                                            onChange={(e) => setData('slug', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <InputError
                                message={errors.slug}
                                className="mt-2"
                            />
                            <div>
                                <PrimaryButton type="submit" className="w-full justify-center mt-2">
                                    Create
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>

                    {showSuccess && (
                        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/50 rounded-lg">
                            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">

                                <span className="font-medium">Link created successfully!</span>
                            </div>
                            <div className="mt-3 flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 min-w-0">
                                    <TextInput
                                        readOnly
                                        value={generatedUrl}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <PrimaryButton
                                    onClick={copyToClipboard} className="justify-center"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
