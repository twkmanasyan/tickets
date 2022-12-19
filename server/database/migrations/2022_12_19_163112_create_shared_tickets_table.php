<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSharedTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shared_tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shared_from_id');
            $table->unsignedBigInteger("shared_to_id");
            $table->unsignedBigInteger("ticket_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shared_tickets');
    }
}
