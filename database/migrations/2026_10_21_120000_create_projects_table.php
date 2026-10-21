<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->string('name');
            $table->string('type')->default('development'); // development, maintenance, retainer, warranty
            $table->string('status')->default('in_progress'); // in_progress, active_maintenance, warranty, renewal_due, completed, on_hold
            $table->unsignedTinyInteger('progress')->default(0); // 0 - 100%
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->date('maintenance_until')->nullable();
            $table->decimal('contract_value', 15, 2)->default(0);
            $table->decimal('monthly_retainer_fee', 15, 2)->default(0);
            $table->text('sla_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

