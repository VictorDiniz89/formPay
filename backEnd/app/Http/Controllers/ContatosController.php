<?php

namespace App\Http\Controllers;

use App\Models\Contato;
use Illuminate\Http\Request;

class ContatosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contato::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nome' => 'required|string|max:225',
            'email' => 'required|string|email|max:225|unique:contatos',
            'telefone' => 'required|string|max:15',
            'cidade' => 'required|string|max:225',
            'igreja' => 'required|string|max:225',
        ]);
        $contato = Contato::create($validateData);
        return response()->json($contato,201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Contato::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $contato = Contato::findOrFail($id);
        $contato->update($request->all());
        return response()->json($contato, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Contato::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
