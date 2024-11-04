<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Http\Requests\StoreLinkRequest;
use Inertia\Inertia;

class LinkController extends Controller
{
    /**
     * Show users links
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'links' => auth()->user()->links()->latest()->get(),
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLinkRequest $request)
    {
        $link = new Link();
        $link->url = $request->url;

        $link->slug = $request->filled('slug')
            ? $request->slug
            : Link::generateUniqueSlug();

        if (auth()->check()) {
            $link->user_id = auth()->id();
        }

        $link->save();

        return back()->with('success', [
            'slug' => url("/{$link->slug}"),
            'url' => $link->url
        ]);
    }

    /**
     * Redirect to the specified link.
     */
    public function redirect($slug)
    {
        $link = Link::where('slug', $slug)->firstOrFail();

        $link->visit();

        return redirect($link->url);
    }
}
