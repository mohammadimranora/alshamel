<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface ProductRepositoryInterface
{
    /**
     * get all products
     * @return Illuminate\Http\Response
     */
    public function all();

    /**
     * create a product
     * @param Illuminate\Http\Request
     * @return Illuminate\Http\Response 
     */
    public function store(Request $request);

    /**
     * details a product
     * @param integer $id
     * @return Illuminate\Http\Response 
     */
    public function show($id);

    /**
     * update a product
     * @param Illuminate\Http\Request
     * @param integer $id
     * @return Illuminate\Http\Response 
     */
    public function update(Request $request, $id);

    /**
     * destroy a product
     * @param integer $id
     * @return Illuminate\Http\Response 
     */
    public function destroy($id);

    /**
     * raise product view count
     * @param integer $id
     * @return Illuminate\Http\Response 
     */
    public function productView($id);
}
