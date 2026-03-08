<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Asigna la primera empresa a los usuarios que tienen empresa_id NULL.
     */
    public function up(): void
    {
        $firstEmpresaId = DB::table('empresas')->value('id');
        if ($firstEmpresaId) {
            DB::table('users')->whereNull('empresa_id')->update(['empresa_id' => $firstEmpresaId]);
        }
    }

    public function down(): void
    {
        // No revertir para no perder la relación
    }
};
