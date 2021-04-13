<?php

namespace App\Http\Controllers\Api;

use App\Models\Bookable;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookablePriceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $data = $request->validate([
            'from' => 'required| ',
            'to' => 'required| after_or_equal:from'
        ]);
        
        $bookable = Bookable::findOrFail($id);

        $price = $bookable->price;
        $days = (new Carbon($data['from']))->diffindays($data['to']) + 1;
        $totalPrice = $price * $days;

        return response()->json([
            'data' => [
                'total' => $totalPrice,
                'breakdown' => [
                    $price => $days
                ]
            ]
        ]);
    }
}
