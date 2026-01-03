<?php

namespace App\Http\Controllers;

use App\Models\Quality;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QualityController extends Controller
{
    public function index(Request $request)
    {
        if (!auth()->user()->hasPermission('manage quality')) {
            return redirect()->route('dashboard')->with('error', 'Permission denied!');
        }

        $query = Quality::where('user_id', createdBy());

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('quality_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $sortField = $request->get('sort', 'quality_name');
        $sortDirection = $request->get('direction', 'asc');

        $allowedSorts = ['quality_name', 'status', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $perPage = $request->get('per_page', 10);
        $qualities = $query->paginate($perPage)->withQueryString();

        $filters = $request->only(['search', 'sort', 'direction', 'per_page']);
        if (empty($filters)) {
            $filters = [
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'quality_name',
                'search' => ''
            ];
        } else {
            $filters = array_merge([
                'per_page' => 10,
                'page' => 1,
                'direction' => 'asc',
                'sort' => 'quality_name',
                'search' => ''
            ], array_filter($filters));
        }

        return Inertia::render('Quality/Index', [
            'qualities' => $qualities,
            'filters' => $filters
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermission('create quality')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'quality_name' => [
                'required',
                'string',
                'max:255',
                'unique:qualities,quality_name,NULL,id,user_id,' . createdBy()
            ],
            'description' => 'nullable|string',
            'status' => 'boolean',
            'cgst_percentage' => 'nullable|numeric|min:0|max:100',
            'sgst_percentage' => 'nullable|numeric|min:0|max:100',
            'igst_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        Quality::create([
            'quality_name' => $request->quality_name,
            'description' => $request->description,
            'status' => $request->status ?? true,
            'cgst_percentage' => $request->cgst_percentage,
            'sgst_percentage' => $request->sgst_percentage,
            'igst_percentage' => $request->igst_percentage,
            'user_id' => createdBy(),
        ]);

        return back()->with('success', 'Quality created successfully.');
    }

    public function update(Request $request, Quality $quality)
    {
        if ($quality->user_id != createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('edit quality')) {
            return back()->with('error', 'Permission denied!');
        }

        $request->validate([
            'quality_name' => [
                'required',
                'string',
                'max:255',
                'unique:qualities,quality_name,' . $quality->id . ',id,user_id,' . createdBy()
            ],
            'description' => 'nullable|string',
            'status' => 'boolean',
            'cgst_percentage' => 'nullable|numeric|min:0|max:100',
            'sgst_percentage' => 'nullable|numeric|min:0|max:100',
            'igst_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $quality->update([
            'quality_name' => $request->quality_name,
            'description' => $request->description,
            'status' => $request->status ?? true,
            'cgst_percentage' => $request->cgst_percentage,
            'sgst_percentage' => $request->sgst_percentage,
            'igst_percentage' => $request->igst_percentage,
        ]);

        return back()->with('success', 'Quality updated successfully.');
    }

    public function destroy(Quality $quality)
    {
        if ($quality->user_id !== createdBy()) {
            abort(403);
        }

        if (!auth()->user()->hasPermission('delete quality')) {
            return back()->with('error', 'Permission denied!');
        }

        $quality->delete();
        return back()->with('success', 'Quality deleted successfully.');
    }
}