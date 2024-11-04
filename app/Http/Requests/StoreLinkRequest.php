<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $appUrl = config('app.url');

        $rules = [
            'url' => [
                'required',
                'min:1',
                'max:2048',
                'url',
                function ($attribute, $value, $fail) use ($appUrl) {
                    if (str_starts_with(strtolower($value), strtolower($appUrl))) {
                        $fail('You cannot create a short link to this application.');
                    }
                },
            ],
        ];


        if ($this->filled('slug')) {
            $rules['slug'] = [
                'string',
                'min:4',
                'alpha_dash',
                Rule::unique('links', 'slug'),
            ];
        }

        return $rules;
    }
}
