import MyLinksRow from "@/Components/MyLinksRow.jsx";

export default function MyLinks({links, appUrl}) {
    return (
        <div
            className="flex flex-col overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="flex-1 p-6 text-gray-900 dark:text-gray-100">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead
                        className="border-b-2 border-gray-500 bg-gray-50 text-xs uppercase text-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                        <th className="px-3 py-4">Url</th>
                        <th className="px-3 py-4">
                            Visits
                        </th>
                        <th className="px-3 py-4">Slug</th>

                        <th className="px-3 py-4">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {(links).map((link) => (
                        <MyLinksRow key={link.id} link={link} appUrl={appUrl}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
