@extends('layout')

@section('content')


<form class="form-horizontal" name="mfrm" id="mfrm" method="post" autocomplete="off">
    <div class="row">
        <div class="col-12 col-xl-5">
            <!-- Name -->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="name">Name</label>
                <div class="col-12 col-sm-6 col-lg-6 ">
                    <input class="form-control form-control-sm" type="text" id="name" name="name" value="{{old('name')}}">
                </div>
            </div>

            <!-- Email -->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="email">Email</label>
                <div class="col-12 col-sm-6 col-lg-6 ">
                    <input class="form-control form-control-sm" type="text" id="email" name="email" value="{{old('email')}}">
                </div>
            </div>

            <!-- Telephone No -->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="tpno">Telephone No</label>
                <div class="col-12 col-sm-6 col-lg-6 ">
                    <input class="form-control form-control-sm" type="text" id="tpno" name="tpno" value="{{old('tpno')}}">
                </div>
            </div>

            <!-- Join Date -->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="joinDate">Join Date</label>
                <div class="col-12 col-sm-6 col-lg-6 ">
                    <input class="form-control form-control-sm" type="date" id="joinDate" name="joinDate" value="{{old('joinDate')}}">
                </div>
            </div>

            <!-- Route-->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="route">Route</label>
                <div class="col-12 col-sm-6 col-lg-6 ">

                    <select class="form-control form-control-sm form-select" id="route" name="route">
                        <option value=""></option>
                        @if (!empty($routes))
                        @foreach ($routes as $item)
                        <option value="{{$item['route_id']}}">
                            {{$item['route']}}
                        </option>
                        @endforeach
                        @endif
                    </select>

                </div>
            </div>

            <!-- comments -->
            <div class="row mb-1">
                <label class="col-12 col-sm-4 col-lg-3 col-form-label-md" for="comment">comments</label>
                <div class="col-12 col-sm-6 col-lg-6 ">
                    <textarea class="form-control form-control-sm text-area" type="text" id="comment" name="comment" value="{{old('comment')}}" rows="3"> </textarea>
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <a class="btn btn-success" href="{{route('employee_create')}}" id="save">Save</a>
                <a class="btn btn-danger" href="/">Cancel</a>
            </div>
        </div>


    </div>


</form>

@endsection