import {useState} from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function MyLinksRow({link, appUrl}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${appUrl}/${link.slug}`);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <td className="px-3 py-2 max-w-xs truncate">
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    {link.url}
                </a>
            </td>
            <td className="px-3 py-2 text-center">
                {link.visits}
            </td>
            <td className="px-3 py-2">
                {link.slug}
            </td>
            <td className="px-3 py-2 ">
                <PrimaryButton
                    type="button"
                    onClick={handleCopy}
                    className="text-xs inline-flex items-center justify-center w-[80px]"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </PrimaryButton>
            </td>
        </tr>
    );
}
