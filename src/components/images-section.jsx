const images = [
  {
    image: "./account.png",
  },
  {
    image: "./home.png",
  },
  {
    image: "./settings.png",
  },
];


export default function ImagesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="w-full max-w-5xl mx-auto bg-base-100 rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-base-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-56 object-contain rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

