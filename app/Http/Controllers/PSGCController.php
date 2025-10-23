<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\City;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Http\Request;

class PSGCController extends Controller
{
    public function regions()
    {
        return Region::select('code', 'name')->orderBy('name')->get();
    }

    public function provinces($regionCode)
    {
        return Province::where('region_code', $regionCode)
            ->select('code', 'name')
            ->orderBy('name')
            ->get();
    }

    public function cities($provinceCode)
    {
        if ($provinceCode === '1300000000') {
            return City::where('region_code', $provinceCode)
                ->select('code', 'name')
                ->orderBy('name')
                ->get();
        }
        return City::where('province_code', $provinceCode)
            ->select('code', 'name')
            ->orderBy('name')
            ->get();
    }

    public function barangays($cityCode)
    {
        return Barangay::where('city_code', $cityCode)
            ->select('code', 'name')
            ->orderBy('name')
            ->get();
    }

    public function fullAddress($barangayCode)
    {
        $b = Barangay::with('city.province.region')->find($barangayCode);
        if (!$b) {
            return response()->json(['error' => 'Address not found'], 404);
        }

        return response()->json([
            'barangay' => $b->name,
            'city' => $b->city->name ?? null,
            'province' => $b->city->province->name ?? null,
            'region' => $b->city->province->region->name ?? null,
        ]);
    }
}
