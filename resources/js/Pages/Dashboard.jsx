import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import AddNewLinkForm from "@/Components/AddNewLinkForm.jsx";
import MyLinks from "@/Components/MyLinks.jsx";

export default function Dashboard({appUrl, links}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="mx-auto max-w-7xl flex min-h-screen flex-col max-lg:flex-col-reverse lg:flex-row pb-5">
                <div className="top-0 mt-6 flex-1 text-white">
                    <div className="mx-auto sm:px-6 lg:px-8">
                        <MyLinks links={links} appUrl={appUrl}/>
                    </div>
                </div>
                <div className="flex-1 sticky top-0 z-50 mt-6 lg:block">
                    <div className="sticky mr-8 top-6 flex-col gap-y-4 lg:min-h-[calc(100vh-150px)]">
                        <AddNewLinkForm appUrl={appUrl}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
