

export default async function MovieDetail({ params }) {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { cache: 'no-store' }
    );
    const videoRes = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { cache: 'no-store' }
    );
  
    const movie = await movieRes.json();
    const videoData = await videoRes.json();
  
    const trailer = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
  
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded mb-4 mx-4"
        />
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p className="mt-2 mb-4">{movie.overview}</p>
  
        {trailer ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        ) : (
          <p className="text-gray-500">No trailer available.</p>
        )}
      </div>
    );
  }
  