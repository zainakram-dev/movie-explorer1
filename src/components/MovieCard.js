// src/components/MovieCard.js
import Link from 'next/link';

export default function MovieCard({ send }) {
  return (
    <Link href={`/movie/${send.id}`}>
      <div className="bg-black shadow rounded overflow-hidden hover:scale-105 transition-transform">
        <img
          src={`https://image.tmdb.org/t/p/w500${send.poster_path}`}
          alt={send.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-2">
          <h3 className="text-lg font-semibold">{send.title}</h3>
        </div>
      </div>
    </Link>
  );
}
