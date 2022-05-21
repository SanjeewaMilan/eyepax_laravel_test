<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
//Request Controller
use App\Http\Requests\Finance\Voucher\VoucherRequest;

//Repository
use App\Repositories\Finance\Voucher\VoucherRepo;
use App\Repositories\CommonRepo;

//Models
use App\Models\CnfgUsersTransac;
use App\Models\FncmChrtOfAccAcc;


class EmployeeController extends Controller
{
    public function create(Request $request)
    {

        try {
            return view('create');
        } catch (QueryException $e) {
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
