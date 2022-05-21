<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->increments('employee_id');

            $table->string('name', 250);
            $table->string('email', 50);
            $table->string('tpno', 20);
            $table->date('join_date');

            $table->smallInteger('route_id')->unsigned();
            $table->foreign('route_id')->references('route_id')->on('routes')->onDelete('Restrict')->onUpdate('Cascade');

            $table->text('comments')->nullable();
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
        Schema::dropIfExists('employees');
    }
}
