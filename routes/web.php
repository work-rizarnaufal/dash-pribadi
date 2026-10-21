<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->name('dashboard');

// Freelance Module Routes
Route::get('/clients', function () {
    return Inertia::render('Freelance/Clients/Index');
})->name('clients.index');

Route::get('/projects', function () {
    return Inertia::render('Freelance/Projects/Index');
})->name('projects.index');

Route::get('/tasks', function () {
    return Inertia::render('Freelance/Tasks/Index');
})->name('tasks.index');

Route::get('/invoices', function () {
    return Inertia::render('Freelance/Invoices/Index');
})->name('invoices.index');

// Budgeting Module Routes
Route::get('/budgeting/income', function () {
    return Inertia::render('Budgeting/Income');
})->name('budgeting.income');

Route::get('/budgeting/outcome', function () {
    return Inertia::render('Budgeting/Outcome');
})->name('budgeting.outcome');

// Settings Route
Route::get('/settings', function () {
    return Inertia::render('Settings/Index');
})->name('settings.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
