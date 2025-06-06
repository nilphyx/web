import Link from 'next/link';
import { courses as allCoursesData } from '@/lib/data/courses'; // Example: using courses for catalog
import { Course } from '@/lib/types'; // Adjust type if catalog includes more than courses
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { BookOpenIcon, TagIcon, SparklesIcon, MagnifyingGlassIcon } from '@/components/icons';
import Image from 'next/image';

export const metadata = {
  title: 'Platform Catalog - AI Platform',
  description: 'Explore our full catalog of AI courses, datasets, tools, and resources.',
};

// This page can be expanded to include datasets, tools, etc.
// For now, it will re-use the course listing structure as a placeholder for a broader catalog.

export default async function CatalogPage() {
  // Example: Fetching courses for the catalog. This could be a mix of items.
  const catalogItems: Course[] = allCoursesData; // Using Course[] as a stand-in type

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <section className="text-center mb-12">
        <SparklesIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">Platform Catalog</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover all available resources on our AI Platform. Find courses, datasets, tools, and more to fuel your AI journey.
        </p>
      </section>
      
      {/* Search and Filter Section - Placeholder */}
      <div className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Find What You Need</h2>
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <input 
            type="text" 
            placeholder="Search catalog (e.g., 'Python', 'image classification')" 
            className="md:col-span-2 w-full px-4 py-2.5 border border-neutral-300 rounded-md focus:ring-primary focus:border-primary"
            aria-label="Search catalog"
          />
          <Button variant="primary" className="h-full">
            <MagnifyingGlassIcon className="w-5 h-5 mr-2"/> Search
          </Button>
        </div>
        <div className="mt-4 flex space-x-2 text-sm">
            <span className="font-medium text-neutral-600">Popular Filters:</span>
            <button className="text-primary hover:underline">Courses</button>
            <button className="text-primary hover:underline">Datasets</button>
            <button className="text-primary hover:underline">Beginner</button>
            <button className="text-primary hover:underline">Advanced</button>
        </div>
      </div>

      {catalogItems.length > 0 ? (
        // Re-using course card structure for catalog items for now
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogItems.map((item) => ( // 'item' can be a Course, Dataset, Tool etc.
            <Card key={item.id} className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <Link href={`/academy/${item.id}`}> {/* Adjust link based on item type */}
                <div className="relative w-full h-56">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill
                    style={{objectFit: 'cover'}}
                    className="rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {item.category} {/* Adjust based on item type */}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 hover:text-primary transition-colors">
                  <Link href={`/academy/${item.id}`}>{item.title}</Link> {/* Adjust link */}
                </h3>
                <p className="text-sm text-neutral-600 mb-3 flex-grow">{item.description}</p>
                
                <div className="mt-auto">
                  <Button variant="primary" fullWidth asChild>
                    <Link href={`/academy/${item.id}`}>View Details</Link> {/* Adjust link */}
                  </Button>
                </div>
                 <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full flex items-center">
                      <TagIcon className="w-3 h-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Catalog is Empty</h2>
          <p className="text-neutral-500">No items found in the catalog. Please check back later.</p>
        </div>
      )}
      {/* Pagination placeholder */}
      <div className="mt-12 flex justify-center">
        <nav aria-label="Pagination">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a href="#" className="py-2 px-3 ml-0 leading-tight text-neutral-500 bg-white rounded-l-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700">Previous</a>
            </li>
            <li>
              <a href="#" aria-current="page" className="py-2 px-3 text-primary bg-blue-50 border border-neutral-300 hover:bg-blue-100 hover:text-primary-dark">1</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 leading-tight text-neutral-500 bg-white border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700">2</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 leading-tight text-neutral-500 bg-white rounded-r-lg border border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}