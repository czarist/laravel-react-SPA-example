<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\V1\PostCollection;
use App\Http\Resources\V1\PostResource;
use App\Models\Posts;

class PostController  extends Controller
{
    public function index()
    {
        return new PostCollection(Posts::all());
    }

    public function show(Posts $post)
    {
        return new PostResource($post);
    }

    public function store(StorePostRequest $request)
    {

        Posts::create($request->validated());
        return response()->json("Post Created");
    }

    public function update(StorePostRequest $request, Posts $post)
    {

        $post->update($request->validated());
        return response()->json("Post Updated");
    }

    public function destroy(Posts $post)
    {
        $post->delete();
        return response()->json("Post Deleted");
    }
}
